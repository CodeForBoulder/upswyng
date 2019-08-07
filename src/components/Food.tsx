import React from 'react';
import { colors, Container } from '../App.styles';
import useSearchResults from './useSearchResults';
import CategoryBanner from './CategoryBanner';
import SearchResults from './SearchResults';

const Food = () => {
  const searchQuery = 'CATEGORY-food';
  const searchResults = useSearchResults(searchQuery);
  return (
    <Container>
      <CategoryBanner text="Food" color={colors.gold} />
      <SearchResults results={searchResults} />
    </Container>
  );
};

export default Food;
