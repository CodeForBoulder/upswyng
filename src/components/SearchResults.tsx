import React from 'react';
import { Response } from 'algoliasearch';
import { Link } from 'react-router-dom';
import { SEARCH_PARAM_RESOURCE } from '../constants';

interface Props {
  results: Response;
}

const SearchResults = ({ results }: Props) => {
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
  return null;
};

export default SearchResults;
