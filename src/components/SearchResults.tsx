import React from 'react';
import { Link } from 'react-router-dom';
import algoliaSearch from 'algoliasearch';
import useSearchResults from './useSearchResults';
import { SEARCH_PARAM_QUERY } from '../constants';

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
                search: `?${SEARCH_PARAM_QUERY}=${objectID}`
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
  return null;
};

const SearchResults = () => {
  const searchResults = useSearchResults('test');
  return (
    <div>
      <h1>Search</h1>
      {searchResults && renderResults(searchResults)}
    </div>
  );
};

export default SearchResults;
