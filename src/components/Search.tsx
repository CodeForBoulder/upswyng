import React from 'react';
import { Link } from 'react-router-dom';
import algoliaSearch from 'algoliasearch';
import useSearchResults from './useSearchResults';
import { getSearchParamVal } from '../utils/searchParams';
import { SEARCH_PARAM_QUERY, SEARCH_PARAM_RESOURCE } from '../constants';
import LoadingSpinner from './LoadingSpinner';

const renderResults = (results: algoliaSearch.Response) => {
  const { hits } = results;
  if (hits && hits.length) {
    const listItems = hits.map(({ charityname, objectID }) => {
      if (charityname && objectID) {
        return (
          <li key={objectID}>
            <Link
              to={{
                pathname: '/resource',
                search: `?${SEARCH_PARAM_RESOURCE}=${objectID}`
              }}
            >
              {charityname}
            </Link>
          </li>
        );
      }
    });
    return <ul>{listItems}</ul>;
  }
};

const SearchResults = () => {
  const searchQuery = getSearchParamVal(SEARCH_PARAM_QUERY);
  if (searchQuery) {
    const searchResults = useSearchResults(searchQuery);
    return (
      <div>
        <h1>Search</h1>
        {!searchResults && <LoadingSpinner />}
        {searchResults && renderResults(searchResults)}
      </div>
    );
  }
  return null;
};

export default SearchResults;
