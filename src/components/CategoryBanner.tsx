import React from 'react';
import styled from 'styled-components';

import { colors, font } from '../App.styles';
import BackButton from './BackButton';

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

const CategoryBannerHeading = styled.h1`
  align-items: center;
  display: flex;
  font-size: ${font.helpers.convertPixelsToRems(24)};
  font-weight: 400;
  margin: ${font.helpers.convertPixelsToRems(-2)} 0 0;
`;

const CategoryBanner = ({ color, text }: Props) => (
  <CategoryBannerContainer color={color}>
    <BackButton />
    <CategoryBannerHeading>{text}</CategoryBannerHeading>
  </CategoryBannerContainer>
);

export default CategoryBanner;
