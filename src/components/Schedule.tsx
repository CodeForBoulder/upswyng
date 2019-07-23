import React from 'react';
import { TSchedule } from '../types';
import { orderSchedule } from '../utils/schedule';
import styled from 'styled-components';

interface ScheduleProps {
  schedule: TSchedule[];
}

const WeeklyContainer = styled.div`
  display: flex;
`;

const WeeklyDay = styled.h3`
  && {
    flex: 0 1 30%;
    font-size: inherit;
    font-weight: 400;
    margin: 0;
    &::after {
      content: ':';
    }
  }
`;

const WeeklyTime = styled.p`
  && {
    flex: 1 1 70%;
    margin: 0;
  }
`;

const renderWeeklySchedule = (schedule: TSchedule[]) =>
  schedule.map(({ day, fromstring, tostring }) => (
    <WeeklyContainer key={`${day}-${fromstring}`}>
      <WeeklyDay>{day}</WeeklyDay>
      <WeeklyTime>
        {fromstring} - {tostring}
      </WeeklyTime>
    </WeeklyContainer>
  ));

const renderMonthlySchedule = (schedule: TSchedule[]) =>
  schedule.map(({ day, fromstring, period, tostring }) => {
    if (period) {
      return (
        <p key={`${period}-${day}-${fromstring}`}>
          every {period.toLowerCase()} {day} from {fromstring} - {tostring}
        </p>
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
