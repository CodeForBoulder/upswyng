import React from 'react';
import { TResource } from '../types';
import withResource from './withResource';
import { getSearchParamVal } from '../utils/searchParams';
import { SEARCH_PARAM_RESOURCE, FIREBASE_RESOURCE_BRANCH } from '../constants';
import LoadingSpinner from './LoadingSpinner';

interface Props {
  id: string;
  resource: TResource;
}

export const Resource = (props: Props) => {
  const {
    resource: { charityname }
  } = props;

  if (!charityname) {
    return <LoadingSpinner />;
  }
  return <div>{charityname}</div>;
};

const resourceDataRef = `${FIREBASE_RESOURCE_BRANCH}/${getSearchParamVal(
  SEARCH_PARAM_RESOURCE
)}`;

export default withResource(Resource, resourceDataRef);
