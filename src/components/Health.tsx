import React from 'react';
import { TSubCategory } from '../types';
import { colors, Container } from '../App.styles';
import CategoryResults from './CategoryResults';

const Health = () => {
  const categoryColor = colors.red;
  const category: TSubCategory = {
    text: 'Health',
    query: 'CATEGORY-health'
  };
  const subCategories: TSubCategory[] = [
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

  return (
    <Container>
      <CategoryResults
        category={category}
        color={categoryColor}
        subCategories={subCategories}
      />
    </Container>
  );
};

export default Health;
