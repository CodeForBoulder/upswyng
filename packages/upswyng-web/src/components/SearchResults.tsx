import { History } from "history";
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

const updateSearchParam = debounce((searchValue: string, history: History) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(SEARCH_PARAM_QUERY, searchValue);

  history.replace({
    search: searchParams.toString(),
  });
}, 300);

const SearchResults = ({ placeholder }: Props) => {
  const searchQueryParam = useSearchParam(SEARCH_PARAM_QUERY);
  const [searchValue, setSearchValue] = React.useState<string>(
    searchQueryParam || ""
  );
  const results = useSearchResults(searchQueryParam || "");
  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInputValue = e.target.value;
    setSearchValue(searchInputValue);
    updateSearchParam(searchInputValue, history);
  };

  return (
    <>
      <form onSubmit={e => e.preventDefault()}>
        <SearchInput onChange={handleChange} value={searchValue} />
      </form>
      <ResourceList
        placeholder={placeholder}
        resources={mapResultsToResources(results)}
      />
    </>
  );
};

export default SearchResults;
