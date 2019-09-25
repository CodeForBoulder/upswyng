import moment from 'moment';

import { TResource, TSchedule } from '../../types';

import {
  scheduleTypeQuestionMap,
  weeklyDayScheduleMap,
  monthlyScheduleMap
} from './questionMaps';
import getQuestionUrlParam from './getQuestionUrlParam';

const getWeeklyScheduleUrlParams = (schedules: TSchedule[]) => {
  return Object.entries(weeklyDayScheduleMap)
    .map(([questionDay, questionMap]) => {
      const daysInSchedule = schedules.filter(({ day }) => day === questionDay);

      if (!daysInSchedule.length) {
        return getQuestionUrlParam(questionMap.isOpen, 'No', true);
      }

      const isOpenQuestionUrlParam = getQuestionUrlParam(
        questionMap.isOpen,
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
            weeklyDayScheduleMap[questionDay].periods[numSchedulesAdded].open,
            from24Hr,
            true
          );
          const toQuestionUrlParam = getQuestionUrlParam(
            weeklyDayScheduleMap[questionDay].periods[numSchedulesAdded].close,
            to24Hr,
            true
          );

          numSchedulesAdded++;

          return `${fromQuestionUrlParam}&${toQuestionUrlParam}`;
        })
        .join('&');

      return `${isOpenQuestionUrlParam}&${dayScheduleUrlParams}`;
    })
    .join('&');
};

const getMonthlyScheduleUrlParams = (schedules: TSchedule[]) => {
  return monthlyScheduleMap
    .map((questionGroup, index) => {
      const currentSchedule = schedules[index];

      if (currentSchedule) {
        const { day, fromstring, period, tostring } = currentSchedule;
        const dayUrlParam = getQuestionUrlParam(
          questionGroup.day,
          currentSchedule.day,
          true
        );
        const periodFrequencyUrlParam = getQuestionUrlParam(
          questionGroup.frequency,
          currentSchedule.period || '',
          true
        );

        // TODO: add handling of multiple time periods in a day

        const { fromstring: from12Hr, tostring: to12Hr } = currentSchedule;

        const from24Hr = moment(from12Hr, 'h:mm A').format('HH:mm');
        const to24Hr = moment(to12Hr, 'h:mm A').format('HH:mm');

        const {
          open: openQuestion,
          close: closeQuestion
        } = questionGroup.periods[0];

        const fromQuestionUrlParam = getQuestionUrlParam(
          openQuestion,
          from24Hr,
          true
        );
        const toQuestionUrlParam = getQuestionUrlParam(
          closeQuestion,
          to24Hr,
          true
        );

        const nextScheduleExists = !!schedules[index + 1];

        let areMoreDaysUrlParam = '';
        if (questionGroup.areMoreDays) {
          const areMoreDaysUrlParamValue = nextScheduleExists ? 'Yes' : 'No';
          areMoreDaysUrlParam = `&${getQuestionUrlParam(
            questionGroup.areMoreDays,
            areMoreDaysUrlParamValue
          )}`;
        }

        return `${dayUrlParam}&${periodFrequencyUrlParam}&${fromQuestionUrlParam}&${toQuestionUrlParam}${areMoreDaysUrlParam}`;
      }
    })
    .filter(urlParams => urlParams)
    .join('&');
};

const getScheduleQuestionUrlParams = ({ schedule }: TResource) => {
  if (!schedule.length) {
    return '';
  }

  // TODO: ADD HANDLING OF MIXTURE OF SCHEDULE TYPES
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
    case 'Monthly':
      scheduleTimeQuestionParams = getMonthlyScheduleUrlParams(schedule);
    case 'Date Range':
  }

  return `${scheduleTypeQuestionParam}&${scheduleTimeQuestionParams}`;
};

export default getScheduleQuestionUrlParams;
