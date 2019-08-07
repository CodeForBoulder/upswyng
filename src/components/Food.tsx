import React from 'react';
import { Container } from '../App.styles';
import useSearchResults from './useSearchResults';
import SearchResults from './SearchResults';

const Food = () => {
  const searchQuery = 'CATEGORY-food';
  const searchResults = useSearchResults(searchQuery);
  return (
    <Container>
      <h1>Food</h1>
      <SearchResults results={searchResults} />
    </Container>
  );
};

export default Food;
