import React from 'react';
import { Container } from '../App.styles';
import useSimilarSearchResults from './useSimilarSearchResults';
import SearchResults from './SearchResults';

const Shelters = () => {
  const searchQuery = 'shelter, housing, family, permanent, temporary';
  const searchResults = useSimilarSearchResults(searchQuery);
  return (
    <Container>
      <h1>Shelters</h1>
      <SearchResults results={searchResults} />
    </Container>
  );
};

export default Shelters;
