import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { colors, font } from '../App.styles';

interface Props {
  color?: string;
  text: string;
}

const CategoryBannerContainer = styled.div`
  align-items: stretch;
  background: ${props => (props.color ? props.color : colors.greyLight)};
  display: flex;
  flex-direction: row;
  padding: ${font.helpers.convertPixelsToRems(14)} 0;
  wrap: no-wrap;
`;

const CategoryBannerLink = styled(Link)`
  align-items: center;
  display: flex;
  padding-right: ${font.helpers.convertPixelsToRems(12)};
`;

const CategoryBannerIcon = styled(Icon)`
  && {
    align-items: center;
    display: flex;
    font-size: ${font.helpers.convertPixelsToRems(36)};
    height: auto;
    width: auto;
  }
` as typeof Icon;

const CategoryBannerArrowBack = styled(ArrowBack)`
  && {
    font-size: inherit;
  }
` as typeof ArrowBack;

const CategoryBannerHeading = styled.h1`
  align-items: center;
  display: flex;
  font-size: ${font.helpers.convertPixelsToRems(24)};
  font-weight: 400;
  margin: ${font.helpers.convertPixelsToRems(-2)} 0 0;
`;

const CategoryBanner = ({ color, text }: Props) => (
  <CategoryBannerContainer color={color}>
    <CategoryBannerLink to="/">
      <CategoryBannerIcon>
        <CategoryBannerArrowBack />
      </CategoryBannerIcon>
    </CategoryBannerLink>
    <CategoryBannerHeading>{text}</CategoryBannerHeading>
  </CategoryBannerContainer>
);

export default CategoryBanner;
