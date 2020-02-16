import { ResourceSchedule, TScheduleItem } from "@upswyng/upswyng-core";
import nextScheduleCache, {
  TSchedulePeriod,
} from "../../../utility/nextScheduleCache";
import { ObjectId } from "bson";
import Resource from "../../../models/Resource";
import moment from "moment";

const cache = nextScheduleCache();

const scheduleItemToPeriod = (item: TScheduleItem): TSchedulePeriod => {
  const dateFormat = "YYYY MM DD";
  const dateTimeFormat = `${dateFormat} HH:mm`;
  const itemDateString = moment(item.recurrenceRule.all()[0]).format(
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

const getNextSchedulePeriod = async (id: string) => {
  const { schedule } = await Resource.getByResourceId(
    ObjectId.createFromHexString(id)
  );
  const scheduleItems = ResourceSchedule.parse(schedule).getItems();

  return scheduleItems.reduce(
    (nextSchedule: TSchedulePeriod | null, currentSchedule: TScheduleItem) => {
      const currentPeriod = scheduleItemToPeriod(currentSchedule);
      if (!nextSchedule) {
        return currentPeriod;
      }

      const currentPeriodIsSooner =
        currentPeriod.open.getTime() < nextSchedule.open.getTime();

      return currentPeriodIsSooner ? currentPeriod : nextSchedule;
    },
    null
  );
};

const getNextSchedulePeriods = async (resourceIds: string[]) => {
  const now = Date.now();
  const nextSchedules = {} as Record<string, TSchedulePeriod>;

  for (const id of resourceIds) {
    const cachedResourceSchedule = cache.get(id);
    if (
      cachedResourceSchedule &&
      cachedResourceSchedule.close.getTime() > now
    ) {
      nextSchedules[id] = cachedResourceSchedule;
      continue;
    }

    try {
      const nextSchedulePeriod = await getNextSchedulePeriod(id);

      if (nextSchedulePeriod) {
        cache.set(id, nextSchedulePeriod);
        nextSchedules[id] = nextSchedulePeriod;
      }
    } catch (e) {
      console.error(e);
    }
  }
  return nextSchedules;
};

export const get = async (req, res, _next) => {
  const { resourceIds } = req.body;

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

  const schedulePeriods = await getNextSchedulePeriods(resourceIds);

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(schedulePeriods));
};
