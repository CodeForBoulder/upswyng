import React from 'react';
import moment from 'moment';
import { TResource, TSchedule } from '../types';
import useResource from './useResource';
import { getSearchParamVal } from '../utils/searchParams';
import { orderSchedule } from '../utils/schedule';
import { SEARCH_PARAM_RESOURCE, FIREBASE_RESOURCE_BRANCH } from '../constants';
import LoadingSpinner from './LoadingSpinner';
import { Container } from '../App.styles';
import Details, { DetailBody, DetailHeading } from './Details';

interface Props {
  id: string;
  resource: TResource;
}

const renderAddressContent = (resource: TResource) => {
  const { address1, address2, city, state, zip } = resource;
  return (
    <p>
      {address1}, {address2 ? `${address2},` : ''} {city}, {state} {zip}
    </p>
  );
};

const renderPhoneContent = (resource: TResource) => {
  const { phone } = resource;
  return <p>{phone}</p>;
};

const generateSchedule = (schedule: TSchedule[]) => {
  if (schedule.length) {
    const { type } = schedule[0];
    const orderedSchedule = orderSchedule(schedule);

    switch (type) {
      case 'Weekly':
        return orderedSchedule.map(({ day, fromstring, tostring }) => (
          <>
            <h3>{day}</h3>
            <p>
              {fromstring} - {tostring}
            </p>
          </>
        ));
      case 'Monthly':
        return orderedSchedule.map(({ day, fromstring, period, tostring }) => {
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
        });
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
      <Details>
        <DetailHeading>Address</DetailHeading>
        <DetailBody>{renderAddressContent(resource)}</DetailBody>
        <DetailHeading>Phone</DetailHeading>
        <DetailBody>{renderPhoneContent(resource)}</DetailBody>
        <DetailHeading>Schedule</DetailHeading>
        <DetailBody>{generateSchedule(schedule)}</DetailBody>
      </Details>
    </Container>
  );
};

export default Resource;
