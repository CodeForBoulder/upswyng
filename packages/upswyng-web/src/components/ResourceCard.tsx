import { colors, font } from "../App.styles";

import { Link } from "react-router-dom";
import React from "react";
import { SEARCH_PARAM_RESOURCE } from "../constants";
import styled from "styled-components";

interface Props {
  index?: number;
  placeholder?: React.ReactElement;
  resourceId: string;
  resourceName: string;
}

const ResourceCardContainer = styled(Link)`
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  font-family: ${font.families.openSans};
  overflow: hidden;
  &:link,
  &:visited {
    text-decoration: none;
  }
  &:hover,
  &:active {
    text-decoration: none;
    & > *:first-child {
      text-decoration: underline;
    }
  }
`;

const ResourceCardImageContainer = styled.div`
  position: relative;
  flex: 1 1 auto;
  &::before {
    content: "";
    display: block;
    padding-bottom: ${(96 / 146) * 100}%;
    width: 100%;
  }
`;

interface ResourceCardImagePlaceholderContainerProps {
  backgroundColor: string;
}

const ResourceCardImagePlaceholderContainer = styled.div`
  background: ${(props: ResourceCardImagePlaceholderContainerProps) =>
    props.backgroundColor};
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  && > * {
    height: 80%;
    left: 50%;
    position: absolute;
    margin-left: -40%;
    margin-top: -25%;
    opacity: 0.5;
    top: 50%;
    width: 80%;
  }
`;

const ResourceCardResourceName = styled.span`
  bottom: 4px;
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  font-size: ${font.helpers.convertPixelsToRems(14)};
  font-weight: 700;
  padding: 0 8px 8px;
  position: absolute;
  width: 100%;
  text-decoration: inherit;
  text-shadow: 0 3px 6px ${colors.black};
`;

const ResourceCardFooter = styled.span`
  align-items: stretch;
  display: flex;
  flex-direction: row;
`;

const ResourceCardScheduleContainer = styled.span`
  align-items: center;
  background: ${colors.black};
  display: flex;
  flex: 1 1 auto;
  font-size: ${font.helpers.convertPixelsToRems(12)};
  font-weight: 600;
  text-decoration: none;
  padding: 6px 8px;
`;

interface TCardColor {
  iconColor: string;
  placeholderBackgroundColor: string;
}

const cardColors: TCardColor[] = [
  {
    iconColor: colors.greyMedium,
    placeholderBackgroundColor: colors.greyLight,
  },
  {
    iconColor: colors.greyLight,
    placeholderBackgroundColor: colors.greyMedium,
  },
];

const ResourceCard = ({
  index = 1,
  placeholder,
  resourceId,
  resourceName,
}: Props) => {
  const cardColor =
    typeof index === "number" && !(index % 2) ? cardColors[0] : cardColors[1];

  return (
    <ResourceCardContainer
      to={{
        pathname: "/resource",
        search: `?${SEARCH_PARAM_RESOURCE}=${resourceId}`,
      }}
    >
      <ResourceCardImageContainer>
        <ResourceCardImagePlaceholderContainer
          backgroundColor={cardColor.placeholderBackgroundColor}
        >
          {placeholder &&
            React.cloneElement(placeholder, {
              color: cardColor.iconColor,
            })}
        </ResourceCardImagePlaceholderContainer>
        <ResourceCardResourceName>{resourceName}</ResourceCardResourceName>
      </ResourceCardImageContainer>
      <ResourceCardFooter>
        <ResourceCardScheduleContainer>
          schedule placeholder
        </ResourceCardScheduleContainer>
      </ResourceCardFooter>
    </ResourceCardContainer>
  );
};

export default ResourceCard;
