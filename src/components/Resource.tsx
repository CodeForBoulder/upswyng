import React, { useState } from 'react';
import moment from 'moment';
import { TResource, TSchedule } from '../types';
import useResource from './useResource';
import { getSearchParamVal } from '../utils/searchParams';
import { SEARCH_PARAM_RESOURCE, FIREBASE_RESOURCE_BRANCH } from '../constants';
import LoadingSpinner from './LoadingSpinner';
import { Container } from '../App.styles';
import Details, { DetailBody, DetailHeading } from './Details';
import Schedule from './Schedule';
import Map from './Map';

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
        <DetailBody>
          <Schedule schedule={schedule} />
        </DetailBody>
      </Details>
      <Map resources={[resource]} />
    </Container>
  );
};

export default Resource;
