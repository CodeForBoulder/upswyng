import React from 'react';
import { Container } from '../App.styles';
import useSearchResults from './useSearchResults';
import SearchResults from './SearchResults';

const Shelters = () => {
  const searchQuery = 'CATEGORY-shelter';
  const searchResults = useSearchResults(searchQuery);
  return (
    <Container>
      <h1>Shelters</h1>
      <SearchResults results={searchResults} />
    </Container>
  );
};

export default Shelters;
