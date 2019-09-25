import moment from 'moment';

import { TSchedule } from '../../../types';

import { monthlyScheduleMap } from '../questionMaps';
import getQuestionUrlParam from '../getQuestionUrlParam';

const convertToTwentyFourHr = (twelveHrTime: string) => {
  return moment(twelveHrTime, 'h:mm A').format('HH:mm');
};

const getMonthlyScheduleUrlParams = (schedules: TSchedule[]) => {
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
        // NOTE: the above was not handled because no Boulder resources have a monthly schedule with multiple time periods in a day

        const { fromstring: from12Hr, tostring: to12Hr } = currentSchedule;
        const from24Hr = convertToTwentyFourHr(from12Hr);
        const to24Hr = convertToTwentyFourHr(to12Hr);

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
