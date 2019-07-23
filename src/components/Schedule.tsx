import React from 'react';
import { TSchedule } from '../types';
import { orderSchedule } from '../utils/schedule';

interface ScheduleProps {
  schedule: TSchedule[];
}

const renderWeeklySchedule = (schedule: TSchedule[]) =>
  schedule.map(({ day, fromstring, tostring }) => (
    <>
      <h3>{day}</h3>
      <p>
        {fromstring} - {tostring}
      </p>
    </>
  ));

const renderMonthlySchedule = (schedule: TSchedule[]) =>
  schedule.map(({ day, fromstring, period, tostring }) => {
    if (period) {
      return (
        <>
          <p>
            every {period.toLowerCase()} {day} from {fromstring} - {tostring}
          </p>
        </>
      );
    }
    return null;
  });

const Schedule = ({ schedule }: ScheduleProps) => {
  if (schedule.length) {
    const { type } = schedule[0];
    const orderedSchedule = orderSchedule(schedule);

    switch (type) {
      case 'Weekly':
        return <>{renderWeeklySchedule(orderedSchedule)}</>;
      case 'Monthly':
        return <>{renderMonthlySchedule(orderedSchedule)}</>;
      case 'Open 24/7':
        return (
          <>
            <p>{type}</p>
          </>
        );
    }
  }
  return null;
};

export default Schedule;
