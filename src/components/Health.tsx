import React from 'react';
import { Container } from '../App.styles';
import useSimilarSearchResults from './useSimilarSearchResults';
import SearchResults from './SearchResults';

const Health = () => {
  const searchQuery = 'CATEGORY-health';
  const searchResults = useSimilarSearchResults(searchQuery);
  return (
    <Container>
      <h1>Health</h1>
      <SearchResults results={searchResults} />
    </Container>
  );
};

export default Health;
