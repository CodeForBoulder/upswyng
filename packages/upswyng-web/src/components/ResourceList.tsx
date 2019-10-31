import React from 'react';
import styled from 'styled-components';

import { font } from '../App.styles';
import LoadingSpinner from './LoadingSpinner';
import ResourceCard from './ResourceCard';

interface Resource {
  id: string;
  name: string;
}

interface Props {
  placeholder?: React.ReactElement;
  resources: undefined | null | Resource[];
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

const ResourceList = ({ placeholder, resources }: Props) => {
  if (resources === undefined) {
    return <LoadingSpinner />;
  }

  if (resources && resources.length) {
    const listItems = resources.map(({ name, id }, index) => {
      if (name && id) {
        return (
          <SearchResultsItem key={id}>
            <ResourceCard
              index={index}
              placeholder={placeholder}
              resourceId={id}
              resourceName={name}
            />
          </SearchResultsItem>
        );
      }
    });
    return <SearchResultsList>{listItems}</SearchResultsList>;
  }

  return (
    <>
      Whoops, it looks like we are having trouble on our end. Please try again
      in a bit.
    </>
  );
};

export default ResourceList;
