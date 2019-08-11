import React from 'react';
import { TResourceCategory } from '../types';
import { colors, Container } from '../App.styles';
import CategoryResults from './CategoryResults';

const categoryColor = colors.orangePrimary;
const category: TResourceCategory = {
  text: 'Food',
  query: 'CATEGORY-food'
};
const subCategories: TResourceCategory[] = [
  {
    text: 'Meals',
    query: 'SUBCATEGORY-food-meal'
  },
  {
    text: 'Food Pantries',
    query: 'SUBCATEGORY-food-pantry'
  }
];

const Food = () => (
  <Container>
    <CategoryResults
      category={category}
      color={categoryColor}
      subCategories={subCategories}
    />
  </Container>
);

export default Food;
