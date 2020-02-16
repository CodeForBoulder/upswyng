import { ResourceSchedule, TScheduleItem } from "@upswyng/upswyng-core";
import nextScheduleCache, {
  SchedulePeriod,
} from "../../../utility/nextScheduleCache";
import { ObjectId } from "bson";
import Resource from "../../../models/Resource";
import moment from "moment";

const cache = nextScheduleCache();

const scheduleItemToPeriod = (item: TScheduleItem): SchedulePeriod => {
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
    (nextSchedule: SchedulePeriod | null, currentSchedule: TScheduleItem) => {
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

export const get = async (req, res, _next) => {
  const { resourceIds } = req.query;

  if (!resourceIds) {
    res.writeHead(400, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: "Please provide resource ID(s)",
      })
    );
  } else {
    const ids = resourceIds.split(",");
    const now = Date.now();
    const nextSchedules = {} as Record<string, SchedulePeriod>;

    for (let index = 0; index < ids.length; index++) {
      const currentId = ids[index];
      const cachedResourceSchedule = cache.get(currentId);
      if (
        cachedResourceSchedule &&
        cachedResourceSchedule.close.getTime() > now
      ) {
        nextSchedules[currentId] = cachedResourceSchedule;
      } else {
        try {
          const nextSchedulePeriod = await getNextSchedulePeriod(currentId);

          if (nextSchedulePeriod) {
            cache.set(currentId, nextSchedulePeriod);
            nextSchedules[currentId] = nextSchedulePeriod;
          }
        } catch (e) {
          console.error(e);
        }
      }
    }

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify(nextSchedules));
  }
};
