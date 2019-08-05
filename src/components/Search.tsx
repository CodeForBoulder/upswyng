import React from 'react';
import useSearchResults from './useSearchResults';
import { getSearchParamVal } from '../utils/searchParams';
import { SEARCH_PARAM_QUERY } from '../constants';
import SearchResults from './SearchResults';
import { Container } from '../App.styles';

const Search = () => {
  const searchQuery = getSearchParamVal(SEARCH_PARAM_QUERY);
  if (searchQuery) {
    const searchResults = useSearchResults(searchQuery);
    return (
      <Container>
        <h1>Search</h1>
        <SearchResults results={searchResults} />
      </Container>
    );
  }
  return null;
};

export default Search;
