import React from "react";
import ResourceList from "./ResourceList";
import { Response } from "algoliasearch";
import { SEARCH_PARAM_QUERY } from "../constants";
import SearchInput from "./SearchInput";
import debounce from "debounce";
import { useHistory } from "react-router-dom";
import useSearchParam from "./useSearchParam";
import useSearchResults from "./useSearchResults";

interface Props {
  placeholder?: React.ReactElement;
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

  return hits.map(({ charityname, objectID }) => ({
    resourceId: objectID,
    name: charityname,
  }));
};

const SearchResults = ({ placeholder }: Props) => {
  const searchQuery = useSearchParam(SEARCH_PARAM_QUERY);
  const results = useSearchResults(searchQuery || "");
  const history = useHistory();

  const updateSearch = debounce((searchQuery: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(SEARCH_PARAM_QUERY, searchQuery);

    history.replace({
      search: searchParams.toString(),
    });
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    updateSearch(searchQuery);
  };

  return (
    <>
      <SearchInput onChange={handleChange} value={searchQuery} />
      <ResourceList
        placeholder={placeholder}
        resources={mapResultsToResources(results)}
      />
    </>
  );
};

export default SearchResults;
