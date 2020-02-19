import LoadingSpinner from "./LoadingSpinner";
import React from "react";
import ResourceCard from "./ResourceCard";
import { TResource } from "@upswyng/upswyng-types";
import { font } from "../App.styles";
import { getNextOpenText } from "../utils/schedule";
import styled from "styled-components";

interface Props {
  placeholder?: React.ReactElement;
  resources: undefined | null | TResource[];
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
    const listItems = resources.map(({ name, resourceId, schedule }, index) => {
      if (!name || !resourceId) {
        return null;
      }
      const scheduleText = getNextOpenText(schedule);
      return (
        <SearchResultsItem key={resourceId}>
          <ResourceCard
            index={index}
            placeholder={placeholder}
            resourceId={resourceId}
            resourceName={name}
            scheduleText={scheduleText}
          />
        </SearchResultsItem>
      );
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
