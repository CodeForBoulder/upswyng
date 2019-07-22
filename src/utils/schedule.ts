import moment from 'moment';
import { TDay, TSchedule, TSchedulePeriod } from '../types';

const days: TDay[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const periods: TSchedulePeriod[] = ['First', 'Second', 'Third', 'Fourth'];

export const orderWeeklySchedule = (schedule: TSchedule[]) => {
  return schedule.sort(
    (
      { day: day1, tostring: fromstring1 },
      { day: day2, fromstring: fromstring2 }
    ) => {
      if (day1 === day2) {
        const startTime1 = parseInt(moment(fromstring1, 'h:mm A').format('H'));
        const startTime2 = parseInt(moment(fromstring2, 'h:mm A').format('H'));
        return startTime1 - startTime2;
      }
      return days.indexOf(day1) - days.indexOf(day2);
    }
  );
};

export const orderMonthlySchedule = (schedule: TSchedule[]) => {
  return schedule.sort((schedule1, schedule2) => {
    const { period: period1, day: day1, fromstring: fromstring1 } = schedule1;
    const { period: period2, day: day2, fromstring: fromstring2 } = schedule2;
    if (period1 && period2) {
      if (period1 === period2) {
        if (day1 === day2) {
          const startTime1 = parseInt(
            moment(fromstring1, 'h:mm A').format('H')
          );
          const startTime2 = parseInt(
            moment(fromstring2, 'h:mm A').format('H')
          );
          return startTime1 - startTime2;
        }
        return days.indexOf(day1) - days.indexOf(day2);
      }
      return periods.indexOf(period1) - periods.indexOf(period2);
    }
    return 0;
  });
};
