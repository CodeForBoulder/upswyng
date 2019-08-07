import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SEARCH_PARAM_RESOURCE } from '../constants';
import { colors, font } from '../App.styles';

interface Props {
  resourceId: string;
  resourceName: string;
}

const ResourceCardContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  font-family: ${font.families.openSans};
`;

const ResourceCardImageContainer = styled.div`
  position: relative;
  background: ${colors.greyLight};
  flex: 1 1 auto;
  &::before {
    content: '';
    display: block;
    padding-bottom: ${(96 / 146) * 100}%;
    width: 100%;
  }
`;

const ResourceCardResourceName = styled.span`
  bottom: 4px;
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  font-shadow: 
  font-size: ${font.helpers.convertPixelsToRems(14)};
  font-weight: 700;
  padding: 0 8px 8px;
  position: absolute;
  width: 100%;
`;

const ResourceCard = ({ resourceId, resourceName }: Props) => (
  <ResourceCardContainer
    to={{
      pathname: '/resource',
      search: `?${SEARCH_PARAM_RESOURCE}=${resourceId}`
    }}
  >
    <ResourceCardImageContainer>
      <ResourceCardResourceName>{resourceName}</ResourceCardResourceName>
    </ResourceCardImageContainer>
  </ResourceCardContainer>
);

export default ResourceCard;
