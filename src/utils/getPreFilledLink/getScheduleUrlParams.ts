import { TResource, TSchedule } from '../../types';

import getQuestionUrlParam from './getQuestionUrlParam';

const scheduleTypeQuestionMap = {
  questionNum: 1777246851,
  values: {
    'Open 24/7': '24/7',
    Weekly: 'weekly',
    Monthly: 'monthly',
    'Date Range': 'on specific dates'
  }
};

const getWeeklyScheduleUrlParams = (schedule: TSchedule) => {
  return '';
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

  // const questionUrlParams = schedule.map(({ type }) => {
  //   switch (type) {
  //     case 'Weekly':
  //       return getWeeklyScheduleUrlParams(schedule);
  //     case 'Monthly':
  //     case 'Date Range':
  //     case 'Open 24/7':
  //     default:
  //       '';
  //   }
  // });

  return scheduleTypeQuestionParam;
};

export default getScheduleQuestionUrlParams;
