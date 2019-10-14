import { TResource, TSchedule, TScheduleType } from '../../../types';

import { scheduleTypeQuestionMap } from '../questionMaps';
import getQuestionUrlParam from '../getQuestionUrlParam';
import getWeeklyScheduleUrlParams from './getWeeklyScheduleUrlParams';
import getMonthlyScheduleUrlParams from './getMonthlyScheduleUrlParams';

const getScheduleType = (schedules: TSchedule[]) => {
  // TODO: add handling of mixture of schedules types
  // NOTE: this was not done because no Boulder county resources have a mixture
  return schedules[0].type;
};

const getScheduleTypeQuestionParam = (schedules: TSchedule[]) => {
  const scheduleType = getScheduleType(schedules);
  return getQuestionUrlParam(
    scheduleTypeQuestionMap.questionNum,
    scheduleTypeQuestionMap.values[scheduleType],
    true
  );
};

const getScheduleTimesQuestionParams = (schedules: TSchedule[]) => {
  const scheduleType = getScheduleType(schedules);
  switch (scheduleType) {
    case 'Weekly':
      return getWeeklyScheduleUrlParams(schedules);
    case 'Monthly':
      return getMonthlyScheduleUrlParams(schedules);
    case 'Date Range':
    //TODO: implement URL param generator for date range
    //NOTE: this was not implemented because no current, open resources are open during a date range
    default:
      return '';
  }
};

const getScheduleQuestionUrlParams = ({ schedule: schedules }: TResource) => {
  if (!schedules || !schedules.length) {
    return '';
  }

  const scheduleType = getScheduleType(schedules);
  if (!scheduleTypeQuestionMap.values[scheduleType]) {
    return '';
  }

  const scheduleTypeQuestionParam = getScheduleTypeQuestionParam(schedules);
  const scheduleTimeQuestionParams = getScheduleTimesQuestionParams(schedules);

  return `${scheduleTypeQuestionParam}&${scheduleTimeQuestionParams}`;
};

export default getScheduleQuestionUrlParams;
