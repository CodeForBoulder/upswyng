import {
  TDay,
  TSchedule,
  TScheduleItemOpenClose,
  TSchedulePeriod,
} from "@upswyng/types";

import { ResourceSchedule } from "@upswyng/common";
import moment from "moment";

const orderedPeriods: TSchedulePeriod[] = [
  "First",
  "Second",
  "Third",
  "Fourth",
];

const orderedDays: TDay[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const convert12HourTo24Hour = (time: string): number =>
  parseInt(moment(time, "h:mm A").format("H"));

const compareTimes = (time1?: string, time2?: string): number => {
  if (!time1 || !time2) return 0;
  const twentyFourHourTime1 = convert12HourTo24Hour(time1);
  const twentyFourHourTime2 = convert12HourTo24Hour(time2);

  return twentyFourHourTime1 - twentyFourHourTime2;
};

const compareDays = (day1?: TDay, day2?: TDay): number => {
  if (!day1 || !day2) return 0;
  return orderedDays.indexOf(day1) - orderedDays.indexOf(day2);
};

const comparePeriods = (
  period1: TSchedulePeriod,
  period2: TSchedulePeriod
): number => orderedPeriods.indexOf(period1) - orderedPeriods.indexOf(period2);

const sortSchedule = (schedule: TSchedule[]) => {
  return schedule.sort((schedule1, schedule2) => {
    const { period: period1, day: day1, from: startTime1 } = schedule1;
    const { period: period2, day: day2, from: startTime2 } = schedule2;

    if (period1 && period2 && period1 !== period2) {
      // apples to monthly schedule, e.g., every first Sunday, third Wednesday, etc.
      return comparePeriods(period1, period2);
    }

    if (day1 !== day2) {
      return compareDays(day1, day2);
    }

    return compareTimes(startTime1, startTime2);
  });
};

export const orderSchedule = (schedule: TSchedule[]) => {
  if (schedule && schedule.length) {
    const { scheduleType } = schedule[0];

    switch (scheduleType) {
      case "Open 24/7":
        return schedule;
      case "Weekly":
      case "Monthly":
      default:
        return sortSchedule(schedule);
    }
  }
  return schedule;
};

const getOpensAtText = ({ open }: TScheduleItemOpenClose) =>
  moment(open).calendar(new Date(), {
    sameDay: "[today at] h:mm A",
    nextDay: "[tomorrow at] h:mm A",
    nextWeek: "dddd [at] h:mm A",
    sameElse: "MMM Do",
  });

export const getNextOpenText = (schedule: ResourceSchedule): string => {
  if (schedule.alwaysOpen) {
    return "Open 24/7";
  }

  const currentDt = new Date();
  const nextScheduleItemPeriod = schedule.getNextScheduleItemPeriod(currentDt);
  if (!nextScheduleItemPeriod) {
    return "";
  }

  if (currentDt.getTime() > nextScheduleItemPeriod.open.getTime()) {
    return `Closes at ${moment(nextScheduleItemPeriod.close).format("h:mm A")}`;
  }

  return `open ${getOpensAtText(nextScheduleItemPeriod)}`;
};
