import React from 'react';
import { TResourceCategory } from '../types';
import { colors, Container } from '../App.styles';
import CategoryResults from './CategoryResults';

const categoryColor = colors.orangePrimary;
const category: TResourceCategory = {
  text: 'Shelters',
  query: 'CATEGORY-shelter'
};
const subCategories: TResourceCategory[] = [
  {
    text: 'Pregnant',
    query: 'SUBCATEGORY-shelter-pregnant'
  },
  {
    text: 'Abused',
    query: 'SUBCATEGORY-shelter-abused'
  },
  {
    text: 'Youth',
    query: 'SUBCATEGORY-shelter-youth'
  },
  {
    text: 'Family',
    query: 'SUBCATEGORY-shelter-family'
  },
  {
    text: 'Transitional',
    query: 'SUBCATEGORY-shelter-transitional'
  },
  {
    text: 'Temporary',
    query: 'SUBCATEGORY-shelter-temporary'
  },
  {
    text: 'Emergency',
    query: 'SUBCATEGORY-shelter-emergency'
  }
];

const Shelters = () => (
  <Container>
    <CategoryResults
      category={category}
      color={categoryColor}
      subCategories={subCategories}
    />
  </Container>
);

export default Shelters;
