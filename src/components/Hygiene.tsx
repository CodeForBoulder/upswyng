import React from 'react';
import { Container } from '../App.styles';
import useSimilarSearchResults from './useSimilarSearchResults';
import LoadingSpinner from './LoadingSpinner';
import SearchResults from './SearchResults';

const Hygiene = () => {
  const searchQuery = 'hygiene';
  const searchResults = useSimilarSearchResults(searchQuery);
  return (
    <Container>
      <h1>Hygiene</h1>
      {!searchResults && <LoadingSpinner />}
      {searchResults && <SearchResults results={searchResults} />}
    </Container>
  );
};

export default Hygiene;
