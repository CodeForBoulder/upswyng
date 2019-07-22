import React from 'react';
import moment from 'moment';
import { TResource, TSchedule } from '../types';
import useResource from './useResource';
import { getSearchParamVal } from '../utils/searchParams';
import { orderWeeklySchedule, orderMonthlySchedule } from '../utils/schedule';
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
    case 'Monthly':
      return orderMonthlySchedule(schedule).map(
        ({ day, fromstring, period, tostring }) => {
          if (period) {
            return (
              <>
                <p>
                  every {period.toLowerCase()} {day} from {fromstring} -{' '}
                  {tostring}
                </p>
              </>
            );
          }
          return null;
        }
      );
    case 'Open 24/7':
      return (
        <>
          <p>{type}</p>
        </>
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
