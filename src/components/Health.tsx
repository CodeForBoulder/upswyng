import React, { useState } from 'react';
import { TSubCategory } from '../types';
import { colors, Container } from '../App.styles';
import useSearchResults from './useSearchResults';
import CategoryBanner from './CategoryBanner';
import SearchResults from './SearchResults';

const Health = () => {
  const [searchQuery, updateSearchQuery] = useState('CATEGORY-health');
  const searchResults = useSearchResults(searchQuery);
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

  const handleSubCategoryClick = (query: string) => {
    updateSearchQuery(query);
  };

  const renderSubCategories = (subCategories: TSubCategory[]) => (
    <ul>
      {subCategories.map(({ text, query }) => (
        <li key={query} onClick={() => handleSubCategoryClick(query)}>
          {text}
        </li>
      ))}
    </ul>
  );

  return (
    <Container>
      <CategoryBanner text="Health" color={colors.red} />
      {renderSubCategories(subCategories)}
      <SearchResults results={searchResults} />
    </Container>
  );
};

export default Health;
