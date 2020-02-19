import { TResource, TResourceScheduleData } from "@upswyng/upswyng-types";
import LoadingSpinner from "./LoadingSpinner";
import React from "react";
import ResourceCard from "./ResourceCard";
import { ResourceSchedule } from "@upswyng/upswyng-core";
import { font } from "../App.styles";
import moment from "moment";
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

const getNextOpenText = (scheduleData: TResourceScheduleData): string => {
  const schedule = ResourceSchedule.parse(scheduleData);
  const currentDateTime = new Date();

  const nextScheduleItemPeriod = schedule.getNextScheduleItemPeriod(
    currentDateTime
  );

  if (!nextScheduleItemPeriod) {
    return "";
  }

  const { open, close } = nextScheduleItemPeriod;
  if (currentDateTime.getTime() > open.getTime()) {
    return `Closes at ${moment(close).format("h:mm A")}`;
  }

  return `Opens ${moment(open).format("MMM D")} at ${moment(open).format(
    "h:mm A"
  )}`;
};

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
