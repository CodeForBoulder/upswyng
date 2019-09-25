import { TResource, TSchedule, TScheduleType } from '../../../types';

import { scheduleTypeQuestionMap } from '../questionMaps';
import getQuestionUrlParam from '../getQuestionUrlParam';
import getWeeklyScheduleUrlParams from './getWeeklyScheduleUrlParams';
import getMonthlyScheduleUrlParams from './getMonthlyScheduleUrlParams';

const getScheduleTypeQuestionParam = (scheduleType: TScheduleType) => {
  return getQuestionUrlParam(
    scheduleTypeQuestionMap.questionNum,
    scheduleTypeQuestionMap.values[scheduleType],
    true
  );
};

const getScheduleTimesQuestionParams = (schedule: TSchedule) => {
  switch (scheduleType) {
    case 'Weekly':
      return getWeeklyScheduleUrlParams(schedule);
    case 'Monthly':
      return getMonthlyScheduleUrlParams(schedule);
    case 'Date Range':
    //TODO: implement URL param generator for date range
    //NOTE: this was not implemented because no current, open resources are open during a date range
    default:
      return '';
  }
};

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

  const scheduleTypeQuestionParam = getScheduleTypeQuestionParam(scheduleType);
  const scheduleTimeQuestionParams = getScheduleTimesQuestionParams(schedule);

  return `${scheduleTypeQuestionParam}&${scheduleTimeQuestionParams}`;
};

export default getScheduleQuestionUrlParams;
