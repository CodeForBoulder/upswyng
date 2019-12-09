import { TLegacySchedule, TDay, TTimezoneName } from "@upswyng/upswyng-types";
import { ResourceSchedule, Time } from "@upswyng/upswyng-core";
import RRule from "rrule";

const dayToCode = {
  sunday: "SU",
  monday: "MO",
  tuesday: "TU",
  wednesday: "WE",
  thursday: "TH",
  friday: "FR",
  saturday: "SA",
};

/**
 * Attempts to convert a legacy schedule from strappd into a `ResourceSchedule`.
 * Currently handles always open and weekly schedule items.
 */
export default function convertLegacyScheduleToResourceScheduleJson(
  legacySchedule: TLegacySchedule[],
  timezone?: TTimezoneName
): InstanceType<typeof ResourceSchedule> {
  if (!Array.isArray(legacySchedule) || !legacySchedule.length) {
    return new ResourceSchedule();
  }
  const types = legacySchedule.map(s => s.type);

  // check for schedules we can't handle now: non-weekly schedules or schedules with a special period or date
  if (
    types.some(
      t => !(t.toLowerCase() === "weekly" || t.toLowerCase() === "open 24/7")
    ) ||
    legacySchedule.map(s => s.period).some(Boolean) ||
    legacySchedule.map(s => s.date).some(Boolean)
  ) {
    throw new Error(`Could not convert legacy schedule to \`ResourceSchedule\` due to unparseable type. Legacy schedule:
        ${JSON.stringify(legacySchedule, null, 2)}`);
  }

  // Go through the schedule and map the items to an object where the key is the pair of
  // 'from' and 'to' times and the values are an array of days the resource is open at those times.
  //
  // ex:
  // [{ type: "Weekly", fromstring: "8:00 AM", tostring: "12:00 PM", day: "Monday"},
  //  { type: "Weekly", fromstring: "8:00 AM", tostring: "12:00 PM", day: "Tuesday"},
  //  { type: "Weekly", fromstring: "2:00 PM", tostring: "5:00 PM", day: "Friday"}]
  //
  // will map to:
  //
  // {
  //   "8:00 AM|12:00 PM": ["Monday", "Tuesday"],
  //   "2:00 PM|5:00 PM": ["Friday"],
  // }

  const scheduleMap = legacySchedule
    .filter(i => i.type.toLowerCase() !== "open 24/7")
    .reduce((sm, s) => {
      const k = `${s.fromstring}|${s.tostring}`;
      sm[k] = [...(sm[k] || []), s.day];
      return sm;
    }, {});

  const items = Object.entries(scheduleMap).map(([k, v]) => {
    const [fromTimeLabel, toTimeLabel] = k.split("|");
    const rrule = new RRule({
      freq: RRule.WEEKLY,
      interval: 1,
      byweekday: (v as Array<TDay>).map(d => RRule[dayToCode[d.toLowerCase()]]),
    });
    return {
      recurrenceRule: rrule,
      comment: "",
      fromTime: Time.fromLabel(fromTimeLabel),
      toTime: Time.fromLabel(toTimeLabel),
    };
  });

  return new ResourceSchedule(
    items,
    timezone,
    /* alwaysOpen */ types.some(t => t.toLowerCase() === "open 24/7")
  );
}
