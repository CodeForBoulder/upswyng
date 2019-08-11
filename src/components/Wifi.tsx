import React from 'react';
import { TResourceCategory } from '../types';
import { colors, Container } from '../App.styles';
import CategoryResults from './CategoryResults';

const categoryColor = colors.blue;
const category: TResourceCategory = {
  text: 'Wifi',
  query: 'CATEGORY-wifi'
};
const subCategories: TResourceCategory[] = [
  {
    text: 'Free Wifi',
    query: 'SUBCATEGORY-wifi-freeWifi'
  },
  {
    text: 'Public Computer',
    query: 'SUBCATEGORY-wifi-publicComputer'
  },
  {
    text: 'Charging',
    query: 'SUBCATEGORY-wifi-charging'
  }
];

const Wifi = () => (
  <Container>
    <CategoryResults
      category={category}
      color={categoryColor}
      subCategories={subCategories}
    />
  </Container>
);

export default Wifi;
