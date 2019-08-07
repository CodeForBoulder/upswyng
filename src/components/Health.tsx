import React from 'react';
import { Container } from '../App.styles';
import useSearchResults from './useSearchResults';
import SearchResults from './SearchResults';

const Health = () => {
  const searchQuery = 'CATEGORY-health';
  const searchResults = useSearchResults(searchQuery);
  return (
    <Container>
      <h1>Health</h1>
      <SearchResults results={searchResults} />
    </Container>
  );
};

export default Health;
