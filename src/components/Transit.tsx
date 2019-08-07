import React from 'react';
import { Container } from '../App.styles';
import useSimilarSearchResults from './useSimilarSearchResults';
import SearchResults from './SearchResults';

const Transit = () => {
  const searchQuery = 'CATEGORY-transit';
  const searchResults = useSimilarSearchResults(searchQuery);
  return (
    <Container>
      <h1>Transit</h1>
      <SearchResults results={searchResults} />
    </Container>
  );
};

export default Transit;
