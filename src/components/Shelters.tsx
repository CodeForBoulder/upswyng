import React from 'react';
import { colors, Container } from '../App.styles';
import useSearchResults from './useSearchResults';
import CategoryBanner from './CategoryBanner';
import SearchResults from './SearchResults';

const Shelters = () => {
  const searchQuery = 'CATEGORY-shelter';
  const searchResults = useSearchResults(searchQuery);
  return (
    <Container>
      <CategoryBanner text="Shelters" color={colors.orangeDark} />
      <SearchResults results={searchResults} />
    </Container>
  );
};

export default Shelters;
