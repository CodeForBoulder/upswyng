import React from 'react';
import { TResource } from '../types';
import useResource from './useResource';
import { getSearchParamVal } from '../utils/searchParams';
import { SEARCH_PARAM_RESOURCE, FIREBASE_RESOURCE_BRANCH } from '../constants';
import LoadingSpinner from './LoadingSpinner';
import { Container } from '../App.styles';

const renderContactInfo = (resource: TResource) => {
  const { address1, address2, city, state, zip } = resource;
  return (
    <>
      <h2>Address</h2>
      <p>
        {address1}, {address2 ? `${address2},` : ''} {city}, {state} {zip}
      </p>
    </>
  );
};

export const Resource = () => {
  const resourceDataRef = `${FIREBASE_RESOURCE_BRANCH}/${getSearchParamVal(
    SEARCH_PARAM_RESOURCE
  )}`;
  const resource = useResource(resourceDataRef);

  if (!resource) {
    return null;
  }

  const { charityname } = resource;

  if (!charityname) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <h1>{charityname}</h1>
      {renderContactInfo(resource)}
    </Container>
  );
};

export default Resource;
