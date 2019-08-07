import React from 'react';
import { TDay, TSchedule } from '../types';
import { orderSchedule } from '../utils/schedule';
import { font } from '../App.styles';
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

const WeeklyTimes = styled.p`
  && {
    display: flex;
    flex: 1 1 70%;
    flex-direction: column;
    margin: 0;
  }
`;

const WeeklyTime = styled.span`
  && {
    margin: 0;
    && + && {
      margin-top: ${font.helpers.convertPixelsToRems(4)};
    }
  }
`;

const renderDaySchedule = (schedule: TSchedule[]) => {
  const { day } = schedule[0];
  return (
    <WeeklyContainer key={day}>
      <WeeklyDay>{day}</WeeklyDay>
      <WeeklyTimes>
        {schedule.map(({ day, fromstring, tostring }) => (
          <WeeklyTime key={`${day}-${fromstring}`}>
            {fromstring} - {tostring}
          </WeeklyTime>
        ))}
      </WeeklyTimes>
    </WeeklyContainer>
  );
};

const renderWeeklySchedule = (schedule: TSchedule[]) => {
  const renderedDays: TDay[] = [];

  return schedule.map(({ day: currentDay, fromstring, tostring }) => {
    if (!renderedDays.includes(currentDay)) {
      renderedDays.push(currentDay);
      const currentDaySchedule = schedule.filter(
        ({ day }) => day === currentDay
      );
      return renderDaySchedule(currentDaySchedule);
    }
    return null;
  });
};

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
