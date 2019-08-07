import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  text: string;
}

const CategoryBannerLink = styled(Link)`
  text-decoration: none;
  &:hover,
  &:active {
    text-decoration: underline;
  }
`;

const CategoryBanner = ({ text }: Props) => (
  <CategoryBannerLink to="/">
    <h1>{text}</h1>
  </CategoryBannerLink>
);

export default CategoryBanner;
