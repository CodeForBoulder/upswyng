import { colors, font } from "../App.styles";

import Image from "material-ui-image";
import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";

interface Props {
  index?: number;
  placeholder?: React.ReactElement;
  resourceId: string;
  resourceImage: string | null;
  resourceName: string;
  scheduleText?: string;
}

const ResourceCardContainer = styled(Link)`
  border-radius: 6px;
  color: ${colors.white};
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
`;

interface ResourceCardImagePlaceholderContainerProps {
  backgroundColor: string;
}

const ResourceCardImagePlaceholderContainer = styled.div`
  background: ${(props: ResourceCardImagePlaceholderContainerProps) =>
    props.backgroundColor};
  position: relative;

  &::before {
    content: "";
    display: block;
    padding-bottom: ${(250 / 457) * 100}%;
    width: 100%;
  }
  && > * {
    height: 80%;
    left: 10%;
    position: absolute;
    opacity: 0.5;
    top: 10%;
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
  scheduleText,
  resourceImage,
}: Props) => {
  const cardColor =
    typeof index === "number" && !(index % 2) ? cardColors[0] : cardColors[1];

  return (
    <ResourceCardContainer
      to={{
        pathname: `/resource/${resourceId}`,
      }}
    >
      <ResourceCardImageContainer>
        {resourceImage && (
          <Image aspectRatio={457 / 250} src={resourceImage} alt="a" />
        )}
        {!resourceImage && (
          <ResourceCardImagePlaceholderContainer
            backgroundColor={cardColor.placeholderBackgroundColor}
          >
            {placeholder &&
              React.cloneElement(placeholder, {
                color: cardColor.iconColor,
              })}
          </ResourceCardImagePlaceholderContainer>
        )}
        <ResourceCardResourceName>{resourceName}</ResourceCardResourceName>
      </ResourceCardImageContainer>
      {scheduleText && (
        <ResourceCardFooter>
          <ResourceCardScheduleContainer>
            {scheduleText}
          </ResourceCardScheduleContainer>
        </ResourceCardFooter>
      )}
    </ResourceCardContainer>
  );
};

export default ResourceCard;
