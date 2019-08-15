import React from 'react';
import { TResourceCategory } from '../types';
import { colors, Container } from '../App.styles';
import CategoryResults from './CategoryResults';

const categoryColor = colors.teal;
const category: TResourceCategory = {
  text: 'Hygiene',
  query: 'CATEGORY-hygiene'
};
const subCategories: TResourceCategory[] = [
  {
    text: 'Feminine Products',
    query: 'SUBCATEGORY-hygiene-feminine'
  },
  {
    text: 'Water Fountains',
    query: 'SUBCATEGORY-hygiene-water'
  },
  {
    text: 'Showers',
    query: 'SUBCATEGORY-hygiene-shower'
  },
  {
    text: 'Restrooms',
    query: 'SUBCATEGORY-hygiene-bathroom'
  }
];

const Hygiene = () => (
  <Container>
    <CategoryResults
      category={category}
      color={categoryColor}
      subCategories={subCategories}
    />
  </Container>
);

export default Hygiene;
