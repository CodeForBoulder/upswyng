import React from 'react';
import { Container } from '../App.styles';
import useSimilarSearchResults from './useSimilarSearchResults';
import SearchResults from './SearchResults';

const WifiTech = () => {
  const searchQuery = 'wifi, tech';
  const searchResults = useSimilarSearchResults(searchQuery);
  return (
    <Container>
      <h1>WifiTech</h1>
      <SearchResults results={searchResults} />
    </Container>
  );
};

export default WifiTech;
