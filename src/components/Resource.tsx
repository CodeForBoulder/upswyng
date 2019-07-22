import React from 'react';
import moment from 'moment';
import { TDay, TResource, TSchedule } from '../types';
import useResource from './useResource';
import { getSearchParamVal } from '../utils/searchParams';
import { SEARCH_PARAM_RESOURCE, FIREBASE_RESOURCE_BRANCH } from '../constants';
import LoadingSpinner from './LoadingSpinner';
import { Container } from '../App.styles';

const renderContactInfo = (resource: TResource) => {
  const { address1, address2, city, phone, state, zip } = resource;
  return (
    <>
      <h2>Address</h2>
      <p>
        {address1}, {address2 ? `${address2},` : ''} {city}, {state} {zip}
      </p>
      <h2>Phone</h2>
      <p>{phone}</p>
    </>
  );
};

const days: TDay[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const orderWeeklySchedule = (schedule: TSchedule[]) => {
  return schedule.sort(
    (
      { day: day1, tostring: fromstring1 },
      { day: day2, fromstring: fromstring2 }
    ) => {
      if (day1 === day2) {
        const startTime1 = parseInt(moment(fromstring1, 'h:mm A').format('H'));
        const startTime2 = parseInt(moment(fromstring2, 'h:mm A').format('H'));
        return startTime1 - startTime2;
      }
      return days.indexOf(day1) - days.indexOf(day2);
    }
  );
};

const generateSchedule = (schedule: TSchedule[]) => {
  const { type } = schedule[0];

  switch (type) {
    case 'Weekly':
      return orderWeeklySchedule(schedule).map(
        ({ day, fromstring, tostring }) => (
          <>
            <h3>{day}</h3>
            <p>
              {fromstring} - {tostring}
            </p>
          </>
        )
      );
    default:
      return null;
  }
};

const renderHours = (schedule: TSchedule[]) => {
  if (schedule.length) {
    return (
      <>
        <h2>Hours</h2>
        {generateSchedule(schedule)}
      </>
    );
  }
  return null;
};

export const Resource = () => {
  const resourceDataRef = `${FIREBASE_RESOURCE_BRANCH}/${getSearchParamVal(
    SEARCH_PARAM_RESOURCE
  )}`;
  const resource = useResource(resourceDataRef);

  if (!resource) {
    return null;
  }

  const { charityname, schedule } = resource;

  if (!charityname) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <h1>{charityname}</h1>
      {renderContactInfo(resource)}
      {renderHours(schedule)}
    </Container>
  );
};

export default Resource;
