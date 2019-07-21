import React from 'react';
import useResource from './useResource';
import { getSearchParamVal } from '../utils/searchParams';
import { SEARCH_PARAM_RESOURCE, FIREBASE_RESOURCE_BRANCH } from '../constants';
import LoadingSpinner from './LoadingSpinner';

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
  return <div>{charityname}</div>;
};

export default Resource;
