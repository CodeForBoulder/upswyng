import React from "react";
import ResourceList from "./ResourceList";
import { Response } from "algoliasearch";

interface Props {
  placeholder?: React.ReactElement;
  results?: Response | null;
}

const mapResultsToResources = (
  results?: Response | null
): null | { resourceId: string; name: string }[] => {
  if (!results) {
    return null;
  }

  const { hits } = results;
  if (!hits || !hits.length) {
    return null;
  }

  return hits.map(({ name, objectID }) => ({
    resourceId: objectID,
    name,
  }));
};

const SearchResults = ({ placeholder, results }: Props) => (
  <ResourceList
    placeholder={placeholder}
    resources={mapResultsToResources(results)}
  />
);

export default SearchResults;
