import React from 'react';
import { Response } from 'algoliasearch';
import { Link } from 'react-router-dom';
import { SEARCH_PARAM_RESOURCE } from '../constants';
import LoadingSpinner from './LoadingSpinner';

interface Props {
  results: Response | null;
}

const SearchResults = ({ results }: Props) => {
  if (results) {
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
    // TODO: Add message when there are no matching results
  }
  return <LoadingSpinner />;
};

export default SearchResults;
