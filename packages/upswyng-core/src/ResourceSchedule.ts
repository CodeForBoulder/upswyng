import { RRule, RRuleSet } from "rrule";
import {
  TResourceScheduleData,
  TScheduleItemOpenClose,
  TTimezoneName,
} from "@upswyng/upswyng-types";

import Time from "./Time";
import moment from "moment";
import momentTimezone from "moment-timezone";

const { tz } = momentTimezone;

export interface TScheduleItem {
  comment: string;
  fromTime: Time;
  recurrenceRule: RRule;
  toTime: Time;
}

function validateScheduleItem(item: TScheduleItem) {
  if (item.fromTime.value === item.toTime.value) {
    throw new Error(
      `Encountered an invalid schedule item; the item's 'from' and 'to' times are the same.\nItem: ${JSON.stringify(
        item,
        null,
        2
      )}`
    );
  }
  try {
    Time.duration(item.fromTime, item.toTime);
  } catch (_e) {
    throw new Error(
      `Encountered an invalid schedule item; the item's 'from' time is later than the item's 'to' time.\nItem: ${JSON.stringify(
        item,
        null,
        2
      )}`
    );
  }
}

function validateTimezone(timezone: string): TTimezoneName {
  if (timezone && !tz.zone(timezone)) {
    throw new Error(
      `Error setting timezone: ${timezone} is not a valid timezone.
      The timezone must be a valid TZ database name 
      (see: \`https://en.wikipedia.org/wiki/List_of_tz_database_time_zones\`). ex: "America/Denver"`
    );
  }
  return timezone as TTimezoneName;
}

function makeSchedulePeriodDate(dt: Date, timeValue: string): Date {
  const dateFormat = "YYYY MM DD";
  const itemDate = moment(dt).format(dateFormat);

  const dateTimeFormat = `${dateFormat} H:mm A`;
  return moment(`${itemDate.toString()} ${timeValue}`, dateTimeFormat).toDate();
}

export function getScheduleItemPeriod(
  item: TScheduleItem,
  dt = new Date()
): TScheduleItemOpenClose {
  const nextOccurenceDate = item.recurrenceRule.all((_, i) => i < 1)[0];

  const openTime = item.fromTime.value;
  const closeTime = item.toTime.value;

  const nextCloseDateTime = makeSchedulePeriodDate(
    nextOccurenceDate,
    closeTime
  );
  if (nextCloseDateTime.getTime() > dt.getTime()) {
    const openDateTime = makeSchedulePeriodDate(nextOccurenceDate, openTime);
    return {
      open: openDateTime,
      close: nextCloseDateTime,
    };
  }

  const afterOccurenceDate = item.recurrenceRule.after(dt);
  const afterCloseDateTime = makeSchedulePeriodDate(
    afterOccurenceDate,
    closeTime
  );
  const afterOpenDateTime = makeSchedulePeriodDate(
    afterOccurenceDate,
    closeTime
  );
  return {
    open: afterOpenDateTime,
    close: afterCloseDateTime,
  };
}

/**
 * Represents the reoccuring schedule of a resource (ex: Mon, Wed, Fri from 8am - 10pm)
 * Based on the iCalendar standard (https://icalendar.org/iCalendar-RFC-5545)
 * Wraps the rrule library (https://github.com/jakubroztocil/rrule) in order to add
 * comments for schedule rules (ex: Mon 8am-12pm for residents, 1pm-4pm for non-residents)
 */
export default class ResourceSchedule {
  private _items: TScheduleItem[];
  /**
   * Whether the Resource is always open.
   */
  alwaysOpen: boolean;
  /**
   * The TZ database name for the resource's location, ex: "America/Detroit"
   */
  private _timezone?: TTimezoneName;

  constructor(
    items: TScheduleItem[] = [],
    timezone?: TTimezoneName,
    alwaysOpen = false
  ) {
    this._items = items;
    this.alwaysOpen = alwaysOpen;
    this.timezone = timezone ? validateTimezone(timezone) : null;
  }

  getItems(): TScheduleItem[] {
    return this._items;
  }

  set timezone(timezone: TTimezoneName | null | undefined) {
    this._timezone = timezone ? validateTimezone(timezone) : null;
  }

  get timezone(): TTimezoneName | null {
    return this._timezone || null;
  }

  addItem(item: TScheduleItem, ...items: TScheduleItem[]) {
    [item, ...items].forEach(item => {
      validateScheduleItem(item);
      this._items.push(item);
    });
  }

  removeItemAtIndex(i: number): TScheduleItem {
    if (i < 0 || i >= this._items.length) {
      throw new Error(
        `Error removing schedule item: index ${i} does not exist in the resource's items array`
      );
    }
    return this._items.splice(i, 1)[0];
  }

  removeItem(item: TScheduleItem): TScheduleItem {
    const i = this._items.findIndex(
      x =>
        item.comment === x.comment &&
        item.recurrenceRule.toString() === x.recurrenceRule.toString() &&
        item.fromTime.value === x.fromTime.value &&
        item.toTime.value === x.toTime.value
    );
    if (i < 0) {
      throw new Error(
        `Error removing schedule item: item ${JSON.stringify(
          item,
          null,
          2
        )} does not exist in the resource's items array`
      );
    }
    return this.removeItemAtIndex(i);
  }

  /**
   * Returns the current/next open/close period of the ScheduleItems
   *
   * @param date The date we're comparing our schedule items to.
   */
  getNextScheduleItemPeriod(date = new Date()): TScheduleItemOpenClose | null {
    return this._items.reduce(
      (
        period: TScheduleItemOpenClose | null,
        currentItem: TScheduleItem
      ): TScheduleItemOpenClose => {
        const currentPeriod = getScheduleItemPeriod(currentItem, date);
        if (!period) {
          return currentPeriod;
        }

        const currentItemIsSooner =
          currentPeriod.open.getTime() < period.open.getTime();

        return currentItemIsSooner ? currentPeriod : period;
      },
      null
    );
  }

  /**
   * Converts data in the form of `TResourceScheduleData` (the format a resource schedule is sent over
   * the wire and stored in the database) into a full-fledged `ResourceSchedule` instance.
   *
   * @param s The serialized ResourceSchedule
   */
  static parse(s: TResourceScheduleData): ResourceSchedule {
    if (!Array.isArray(s._items)) {
      throw new Error(
        `Error parsing serialized resource schedule:\n${s}\n\nParsed items is not an array.`
      );
    }
    if (
      !s._items.every(r => {
        if (!r.recurrenceRule || typeof r.recurrenceRule !== "string") {
          return false;
        }
        if (!r.fromTime || typeof r.fromTime !== "string") {
          return false;
        }
        if (!r.toTime || typeof r.toTime !== "string") {
          return false;
        }
        if (r.comment && typeof r.comment !== "string") {
          return false;
        }
        return true;
      })
    ) {
      throw new Error(
        `Error parsing serialized resource schedule:\n
        ${s}\n\nEvery object in the serialized schedule items must have a \`rule\` and \`comment\` field.`
      );
    }
    return new ResourceSchedule(
      s._items.map(r => ({
        comment: r.comment || "",
        fromTime: Time.fromValue(r.fromTime),
        recurrenceRule: RRule.fromString(r.recurrenceRule),
        toTime: Time.fromValue(r.toTime),
      })),
      s.timezone ? validateTimezone(s.timezone) : null,
      s.alwaysOpen
    );
  }

  /**
   * Used with `JSON.stringify` to serialize this schedule to send over the wire or
   * to store in a database. See:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#toJSON_behavior
   * for more information.
   *
   * ex:
   * const schedule = new ResourceSchedule().addItem(....);
   * const serializedSchedule = JSON.stringify(schedule);
   */
  toJSON(): TResourceScheduleData {
    return {
      alwaysOpen: this.alwaysOpen,
      timezone: this._timezone,
      _items: this._items.map(r => ({
        ...r,
        fromTime: r.fromTime.value,
        recurrenceRule: r.recurrenceRule.toString(),
        toTime: r.toTime.value,
      })),
    };
  }

  toData(): TResourceScheduleData {
    return this.toJSON();
  }

  /**
   * Transform the schedule into an RRuleSet
   */
  toRuleSet(): RRuleSet {
    const result = new RRuleSet();
    this._items.forEach(r => result.rrule(r.recurrenceRule));
    return result;
  }
}
