import { Response } from "algoliasearch";
import React from "react";
import ResourceList from "./ResourceList";

interface Props {
  placeholder?: React.ReactElement;
  results?: Response | null;
}

const mapResultsToResources = (
  results?: Response | null
): null | { id: string; name: string }[] => {
  if (!results) {
    return null;
  }

  const { hits } = results;
  if (!hits || !hits.length) {
    return null;
  }

  const resources = hits.map(({ name, objectID }) => ({
    id: objectID,
    name,
  }));
  return resources as { id: string; name: string }[];
};

const SearchResults = ({ placeholder, results }: Props) => (
  <ResourceList
    placeholder={placeholder}
    resources={mapResultsToResources(results)}
  />
);

export default SearchResults;
