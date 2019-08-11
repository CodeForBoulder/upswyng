import React from 'react';
import { TResourceCategory } from '../types';
import { colors, Container } from '../App.styles';
import CategoryResults from './CategoryResults';

const categoryColor = colors.purple;
const category: TResourceCategory = {
  text: 'Resources',
  query: 'CATEGORY-resources'
};
const subCategories: TResourceCategory[] = [
  {
    text: 'Pets',
    query: 'SUBCATEGORY-resources-pets'
  },
  {
    text: 'Hair Care',
    query: 'SUBCATEGORY-resources-hairCare'
  },
  {
    text: 'Laundry',
    query: 'SUBCATEGORY-resources-laundry'
  },
  {
    text: 'Legal Help',
    query: 'SUBCATEGORY-resources-legalHelp'
  },
  {
    text: 'Outdoor Gear',
    query: 'SUBCATEGORY-resources-outdoorGear'
  },
  {
    text: 'Home Goods',
    query: 'SUBCATEGORY-resources-homeGoods'
  },
  {
    text: 'Shoes',
    query: 'SUBCATEGORY-resources-shoes'
  },
  {
    text: 'Clothing',
    query: 'SUBCATEGORY-resources-clothing'
  }
];

const Resources = () => (
  <Container>
    <CategoryResults
      category={category}
      color={categoryColor}
      subCategories={subCategories}
    />
  </Container>
);

export default Resources;
