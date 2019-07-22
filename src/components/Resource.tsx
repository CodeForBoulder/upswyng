import React from 'react';
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
    ({ day: day1 }, { day: day2 }) => days.indexOf(day1) - days.indexOf(day2)
  );
};

const generateSchedule = (schedule: TSchedule[]) => {
  const { type } = schedule[0];
  if (type === 'Weekly') {
    const orderedSchedule = orderWeeklySchedule(schedule);
  }
};

const renderHours = (schedule: TSchedule[]) => {
  if (schedule.length) {
    return (
      <>
        <h2>Hours</h2>
        <p>stuff</p>
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
