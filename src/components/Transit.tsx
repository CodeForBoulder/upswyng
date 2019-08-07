import React from 'react';
import { Container } from '../App.styles';
import useSearchResults from './useSearchResults';
import SearchResults from './SearchResults';

const Transit = () => {
  const searchQuery = 'CATEGORY-transit';
  const searchResults = useSearchResults(searchQuery);
  return (
    <Container>
      <h1>Transit</h1>
      <SearchResults results={searchResults} />
    </Container>
  );
};

export default Transit;
