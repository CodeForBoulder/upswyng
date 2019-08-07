import React from 'react';
import { Container } from '../App.styles';
import useSearchResults from './useSearchResults';
import SearchResults from './SearchResults';

const Hygiene = () => {
  const searchQuery = 'CATEGORY-hygiene';
  const searchResults = useSearchResults(searchQuery);
  return (
    <Container>
      <h1>Hygiene</h1>
      <SearchResults results={searchResults} />
    </Container>
  );
};

export default Hygiene;
