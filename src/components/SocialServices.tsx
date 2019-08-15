import React from 'react';
import { TResourceCategory } from '../types';
import { colors, Container } from '../App.styles';
import CategoryResults from './CategoryResults';

const categoryColor = colors.brown;
const category: TResourceCategory = {
  text: 'Social Services',
  query: 'CATEGORY-socialServices'
};
const subCategories: TResourceCategory[] = [
  {
    text: 'Social Security',
    query: 'SUBCATEGORY-socialServices-socialSecurity'
  },
  {
    text: 'Health and Human Services',
    query: 'SUBCATEGORY-socialServices-healthAndHumanServices'
  },
  {
    text: 'Food Stamps',
    query: 'SUBCATEGORY-socialServices-foodStamps'
  }
];

const SocialServices = () => (
  <Container>
    <CategoryResults
      category={category}
      color={categoryColor}
      subCategories={subCategories}
    />
  </Container>
);

export default SocialServices;
