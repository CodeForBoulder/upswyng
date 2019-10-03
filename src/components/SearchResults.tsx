import React from 'react';
import { Response } from 'algoliasearch';
import styled from 'styled-components';
import { font } from '../App.styles';
import ResourceCard from './ResourceCard';
import LoadingSpinner from './LoadingSpinner';

interface Props {
  placeholder?: React.ReactElement;
  results: Response | null;
}

const SearchResultsList = styled.ul`
  align-items: stretch;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 ${font.helpers.convertPixelsToRems(-8)};
  padding: 0;
  width: auto;
`;

const SearchResultsItem = styled.li`
  align-items: stretch;
  display: flex;
  flex: 0 1 50%;
  list-style-type: none;
  padding: ${font.helpers.convertPixelsToRems(8)};
`;

const SearchResults = ({ placeholder, results }: Props) => {
  if (results) {
    const { hits } = results;
    if (hits && hits.length) {
      const listItems = hits.map(({ charityname, objectID }, index) => {
        if (charityname && objectID) {
          return (
            <SearchResultsItem key={objectID}>
              <ResourceCard
                index={index}
                placeholder={placeholder}
                resourceId={objectID}
                resourceName={charityname}
              />
            </SearchResultsItem>
          );
        }
      });
      return <SearchResultsList>{listItems}</SearchResultsList>;
    }
    // TODO: Add message when there are no matching results
  }
  return <LoadingSpinner />;
};

export default SearchResults;
