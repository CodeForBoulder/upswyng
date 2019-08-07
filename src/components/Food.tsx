import React from 'react';
import { Container } from '../App.styles';
import useSimilarSearchResults from './useSimilarSearchResults';
import SearchResults from './SearchResults';

const Food = () => {
  const searchQuery = 'CATEGORY-food';
  const searchResults = useSimilarSearchResults(searchQuery);
  return (
    <Container>
      <h1>Food</h1>
      <SearchResults results={searchResults} />
    </Container>
  );
};

export default Food;
