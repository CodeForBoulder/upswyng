import moment from 'moment';

import { TResource, TSchedule } from '../../types';

import { scheduleTypeQuestionMap, weeklyDayScheduleMap } from './questionMaps';
import getQuestionUrlParam from './getQuestionUrlParam';

const getWeeklyScheduleUrlParams = (schedule: TSchedule[]) => {
  // const isOpenQuestionUrlParam = getQuestionUrlParam(weeklyDayScheduleMap[day].isOpen,)
  return Object.entries(weeklyDayScheduleMap)
    .map(([key, value]) => {
      const daysInSchedule = schedule.filter(({ day }) => day === key);

      if (!daysInSchedule.length) {
        return getQuestionUrlParam(value.isOpen, 'No', true);
      }

      const isOpenQuestionUrlParam = getQuestionUrlParam(
        value.isOpen,
        'Yes',
        true
      );

      let numSchedulesAdded = 0;

      const dayScheduleUrlParams = daysInSchedule
        .map(day => {
          const { fromstring: from12Hr, tostring: to12Hr } = day;

          const from24Hr = moment(from12Hr, 'h:mm A').format('HH:mm');
          const to24Hr = moment(to12Hr, 'h:mm A').format('HH:mm');

          const fromQuestionUrlParam = getQuestionUrlParam(
            weeklyDayScheduleMap[key].periods[numSchedulesAdded].open,
            from24Hr,
            true
          );
          const toQuesitonUrlParam = getQuestionUrlParam(
            weeklyDayScheduleMap[key].periods[numSchedulesAdded].close,
            to24Hr,
            true
          );

          numSchedulesAdded++;

          return `${fromQuestionUrlParam}&${toQuesitonUrlParam}`;
        })
        .join('&');

      return `${isOpenQuestionUrlParam}&${dayScheduleUrlParams}`;
    })
    .join('&');
};

const getScheduleQuestionUrlParams = ({ schedule }: TResource) => {
  if (!schedule.length) {
    return '';
  }

  const { type: scheduleType } = schedule[0];
  if (!scheduleTypeQuestionMap.values[scheduleType]) {
    return '';
  }

  const scheduleTypeQuestionParam = getQuestionUrlParam(
    1777246851,
    scheduleTypeQuestionMap.values[scheduleType],
    true
  );

  let scheduleTimeQuestionParams = '';
  switch (scheduleType) {
    case 'Weekly':
      scheduleTimeQuestionParams = getWeeklyScheduleUrlParams(schedule);
      console.log(scheduleTimeQuestionParams);
    case 'Monthly':
    case 'Date Range':
    case 'Open 24/7':
  }

  return `${scheduleTypeQuestionParam}&${scheduleTimeQuestionParams}`;
};

export default getScheduleQuestionUrlParams;
