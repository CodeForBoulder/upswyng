import React from 'react';
import { colors, Container } from '../App.styles';
import useSearchResults from './useSearchResults';
import CategoryBanner from './CategoryBanner';
import SearchResults from './SearchResults';

const Health = () => {
  const searchQuery = 'CATEGORY-health';
  const searchResults = useSearchResults(searchQuery);
  return (
    <Container>
      <CategoryBanner text="Health" color={colors.red} />
      <SearchResults results={searchResults} />
    </Container>
  );
};

export default Health;
