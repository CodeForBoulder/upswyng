import React from 'react';
import { colors, Container } from '../App.styles';
import useSearchResults from './useSearchResults';
import CategoryBanner from './CategoryBanner';
import SearchResults from './SearchResults';

const JobTraining = () => {
  const searchQuery = 'CATEGORY-jobTraining';
  const searchResults = useSearchResults(searchQuery);
  return (
    <Container>
      <CategoryBanner text="Job Training" color={colors.lavendar} />
      <SearchResults results={searchResults} />
    </Container>
  );
};

export default JobTraining;
