import { ResourceSchedule, TScheduleItem } from "@upswyng/upswyng-core";
import Cache from "../../../utility/cache";
import { ObjectId } from "bson";
import Resource from "../../../models/Resource";
import moment from "moment";

interface TSchedulePeriod {
  open: Date;
  close: Date;
}

const cache = new Cache<TSchedulePeriod>();

const scheduleItemToPeriod = (
  item: TScheduleItem,
  dt: Date
): TSchedulePeriod => {
  const dateFormat = "YYYY MM DD";
  const dateTimeFormat = `${dateFormat} HH:mm`;
  const itemDateString = moment(item.recurrenceRule.after(dt, true)).format(
    dateFormat
  );
  const periodOpen = moment(
    `${itemDateString} ${item.fromTime.value}`,
    dateTimeFormat
  );
  const periodClose = moment(
    `${itemDateString} ${item.toTime.value}`,
    dateTimeFormat
  );

  return {
    open: periodOpen.toDate(),
    close: periodClose.toDate(),
  };
};

const getNextSchedulePeriod = async (
  id: string,
  dt: Date
): Promise<Record<string, TSchedulePeriod>> => {
  const { schedule } = await Resource.getByResourceId(
    ObjectId.createFromHexString(id)
  );
  const scheduleItems = ResourceSchedule.parse(schedule).getItems();

  const nextSchedulePeriod = scheduleItems.reduce(
    (nextSchedule: TSchedulePeriod | null, currentSchedule: TScheduleItem) => {
      const currentPeriod = scheduleItemToPeriod(currentSchedule, dt);
      if (!nextSchedule) {
        return currentPeriod;
      }

      const currentPeriodIsSooner =
        currentPeriod.open.getTime() < nextSchedule.open.getTime();

      return currentPeriodIsSooner ? currentPeriod : nextSchedule;
    },
    null
  );

  cache.setValue(id, nextSchedulePeriod);

  return { [id]: nextSchedulePeriod };
};

const getNextSchedulePeriods = (
  resourceIds: string[],
  timeStamp?: string
): Promise<Record<string, TSchedulePeriod>>[] => {
  const compareDateTime = timeStamp
    ? new Date(parseInt(timeStamp))
    : new Date();

  const nextSchedulePeriods = resourceIds.map(id => {
    const cachedResourceSchedule = cache.getValue(id);
    if (
      cachedResourceSchedule &&
      cachedResourceSchedule.close.getTime() > compareDateTime.getTime()
    ) {
      return Promise.resolve({ [id]: cachedResourceSchedule });
    }

    return getNextSchedulePeriod(id, compareDateTime);
  });

  return nextSchedulePeriods;
};

export const get = async (req, res, _next) => {
  const { resourceIds } = req.body;
  const { date } = req.query;

  if (!resourceIds || !resourceIds.length) {
    res.writeHead(400, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: "Please provide resource ID(s)",
      })
    );
    return;
  }

  try {
    const schedulePeriods = await Promise.all(
      getNextSchedulePeriods(resourceIds, date)
    );

    const combinedSchedulePeriods = schedulePeriods.reduce((acc, period) => ({
      ...acc,
      ...period,
    }));

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify(combinedSchedulePeriods));
  } catch (err) {
    console.error(err);

    res.writeHead(500, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: "Failed to retrieve next schedules",
      })
    );
  }
};
