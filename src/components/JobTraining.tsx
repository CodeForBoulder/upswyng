import React from 'react';
import { Container } from '../App.styles';
import useSearchResults from './useSearchResults';
import SearchResults from './SearchResults';

const JobTraining = () => {
  const searchQuery = 'CATEGORY-jobTraining';
  const searchResults = useSearchResults(searchQuery);
  return (
    <Container>
      <h1>Job Training</h1>
      <SearchResults results={searchResults} />
    </Container>
  );
};

export default JobTraining;
