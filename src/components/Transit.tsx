import React from 'react';
import { colors, Container } from '../App.styles';
import useSearchResults from './useSearchResults';
import CategoryBanner from './CategoryBanner';
import SearchResults from './SearchResults';

const Transit = () => {
  const searchQuery = 'CATEGORY-transit';
  const searchResults = useSearchResults(searchQuery);
  return (
    <Container>
      <CategoryBanner text="Transit" color={colors.green} />
      <SearchResults results={searchResults} />
    </Container>
  );
};

export default Transit;
