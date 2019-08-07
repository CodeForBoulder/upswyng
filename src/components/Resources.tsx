import React from 'react';
import { colors, Container } from '../App.styles';
import useSearchResults from './useSearchResults';
import CategoryBanner from './CategoryBanner';
import SearchResults from './SearchResults';

const Resources = () => {
  const searchQuery = 'CATEGORY-resources';
  const searchResults = useSearchResults(searchQuery);
  return (
    <Container>
      <CategoryBanner text="Resources" color={colors.purple} />
      <SearchResults results={searchResults} />
    </Container>
  );
};

export default Resources;
