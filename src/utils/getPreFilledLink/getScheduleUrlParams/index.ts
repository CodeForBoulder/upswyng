import { TResource } from '../../../types';

import { scheduleTypeQuestionMap } from '../questionMaps';
import getQuestionUrlParam from '../getQuestionUrlParam';
import getWeeklyScheduleUrlParams from './getWeeklyScheduleUrlParams';
import getMonthlyScheduleUrlParams from './getMonthlyScheduleUrlParams';

const getScheduleQuestionUrlParams = ({ schedule }: TResource) => {
  if (!schedule.length) {
    return '';
  }

  // TODO: add handling of mixture of schedule types
  // NOTE: this was not done because no Boulder county resources have a mixture

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
      break;
    case 'Monthly':
      scheduleTimeQuestionParams = getMonthlyScheduleUrlParams(schedule);
      break;
    case 'Date Range':
    //TODO: implement URL param generator for date range
    //NOTE: this was not implemented because no current, open resources are open during a date range
  }

  return `${scheduleTypeQuestionParam}&${scheduleTimeQuestionParams}`;
};

export default getScheduleQuestionUrlParams;
