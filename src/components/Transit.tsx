import React from 'react';
import { TResourceCategory } from '../types';
import { colors, Container } from '../App.styles';
import CategoryResults from './CategoryResults';

const categoryColor = colors.green;
const category: TResourceCategory = {
  text: 'Transit',
  query: 'CATEGORY-transit'
};
const subCategories: TResourceCategory[] = [
  {
    text: 'Bus',
    query: 'SUBCATEGORY-transit-bus'
  },
  {
    text: 'Bicycle',
    query: 'SUBCATEGORY-transit-bicycle'
  },
  {
    text: 'Lite Rail',
    query: 'SUBCATEGORY-transit-liteRail'
  }
];

const Health = () => (
  <Container>
    <CategoryResults
      category={category}
      color={categoryColor}
      subCategories={subCategories}
    />
  </Container>
);

export default Health;
