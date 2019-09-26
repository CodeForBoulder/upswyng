import moment from 'moment';

import { TSchedule } from '../../../types';
import { weeklyDayScheduleMap } from '../questionMaps';
import getQuestionUrlParam from '../getQuestionUrlParam';

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

export default getWeeklyScheduleUrlParams;
