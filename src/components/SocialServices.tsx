import React from 'react';
import { colors, Container } from '../App.styles';
import useSearchResults from './useSearchResults';
import CategoryBanner from './CategoryBanner';
import SearchResults from './SearchResults';

const SocialServices = () => {
  const searchQuery = 'CATEGORY-socialServices';
  const searchResults = useSearchResults(searchQuery);
  return (
    <Container>
      <CategoryBanner text="Social Services" color={colors.brown} />
      <SearchResults results={searchResults} />
    </Container>
  );
};

export default SocialServices;
