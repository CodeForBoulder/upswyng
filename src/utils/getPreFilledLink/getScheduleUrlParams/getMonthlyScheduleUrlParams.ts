import moment from 'moment';

import { TSchedule } from '../../../types';

import { monthlyScheduleMap } from '../questionMaps';
import getQuestionUrlParam from '../getQuestionUrlParam';

const getMonthlyScheduleUrlParams = (schedules: TScheduleType) => {
  return monthlyScheduleMap
    .map((questionGroup, index) => {
      const currentSchedule = schedules[index];

      if (currentSchedule) {
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

export default getMonthlyScheduleUrlParams;
