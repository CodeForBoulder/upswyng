import React from 'react';
import { TResourceCategory } from '../types';
import { colors, Container } from '../App.styles';
import CategoryResults from './CategoryResults';

const categoryColor = colors.red;
const category: TResourceCategory = {
  text: 'Health',
  query: 'CATEGORY-health'
};
const subCategories: TResourceCategory[] = [
  {
    text: 'Addiction Recovery Services',
    query: 'SUBCATEGORY-health-addictionRecoveryServices'
  },
  {
    text: 'Clinics',
    query: 'SUBCATEGORY-health-clinic'
  },
  {
    text: 'Dental',
    query: 'SUBCATEGORY-health-dental'
  },
  {
    text: 'Hospital',
    query: 'SUBCATEGORY-health-hospital'
  },
  {
    text: 'Mental',
    query: 'SUBCATEGORY-health-mental'
  },
  {
    text: 'Pharmacies',
    query: 'SUBCATEGORY-health-pharmacy'
  },
  {
    text: 'Vision',
    query: 'SUBCATEGORY-health-vision'
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
