import moment from "moment";
import { TDay, TSchedule, TSchedulePeriod } from "../types";

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

const compareTimes = (time1: string, time2: string): number => {
  const twentyFourHourTime1 = convert12HourTo24Hour(time1);
  const twentyFourHourTime2 = convert12HourTo24Hour(time2);

  return twentyFourHourTime1 - twentyFourHourTime2;
};

const compareDays = (day1: TDay, day2: TDay): number =>
  orderedDays.indexOf(day1) - orderedDays.indexOf(day2);

const comparePeriods = (
  period1: TSchedulePeriod,
  period2: TSchedulePeriod
): number => orderedPeriods.indexOf(period1) - orderedPeriods.indexOf(period2);

const sortSchedule = (schedule: TSchedule[]) => {
  return schedule.sort((schedule1, schedule2) => {
    const { period: period1, day: day1, fromstring: startTime1 } = schedule1;
    const { period: period2, day: day2, fromstring: startTime2 } = schedule2;

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
    const { type } = schedule[0];

    switch (type) {
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
