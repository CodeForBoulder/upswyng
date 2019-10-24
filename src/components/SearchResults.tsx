import React from 'react';
import { Response } from 'algoliasearch';

import ResourceList from './ResourceList';

interface Props {
  placeholder?: React.ReactElement;
  results: Response | null | undefined;
}

const mapResultsToResources = (results: Response | null | undefined) => {
  if (!results) {
    return results;
  }

  const { hits } = results;
  if (!hits || !hits.length) {
    return null;
  }

  {
    name: 'Some Charity';
  }

  const resources = hits.map(({ name, objectID }) => ({
    id: objectID,
    name
  }));
  return resources;
};

const SearchResults = ({ placeholder, results }: Props) => (
  <ResourceList
    placeholder={placeholder}
    resources={mapResultsToResources(results)}
  />
);

export default SearchResults;
