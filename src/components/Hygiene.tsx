import React from 'react';
import { colors, Container } from '../App.styles';
import useSearchResults from './useSearchResults';
import CategoryBanner from './CategoryBanner';
import SearchResults from './SearchResults';

const Hygiene = () => {
  const searchQuery = 'CATEGORY-hygiene';
  const searchResults = useSearchResults(searchQuery);
  return (
    <Container>
      <CategoryBanner text="Hygiene" color={colors.teal} />
      <SearchResults results={searchResults} />
    </Container>
  );
};

export default Hygiene;
