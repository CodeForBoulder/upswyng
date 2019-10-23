import React from 'react';
import styled from 'styled-components';
import { font } from '../App.styles';
import ResourceCard from './ResourceCard';

interface Resource {
  id: string;
  name: string;
}

interface Props {
  placeholder?: React.ReactElement;
  resources: Resource[];
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
  return null;
  // TODO: Add message when there are no matching results
};

export default ResourceList;
