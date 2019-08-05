import React from 'react';
import useSearchResults from './useSearchResults';
import { getSearchParamVal } from '../utils/searchParams';
import { SEARCH_PARAM_QUERY } from '../constants';
import SearchResults from './SearchResults';
import LoadingSpinner from './LoadingSpinner';

const Search = () => {
  const searchQuery = getSearchParamVal(SEARCH_PARAM_QUERY);
  if (searchQuery) {
    const searchResults = useSearchResults(searchQuery);
    return (
      <div>
        <h1>Search</h1>
        {!searchResults && <LoadingSpinner />}
        {searchResults && <SearchResults results={searchResults} />}
      </div>
    );
  }
  return null;
};

export default Search;
