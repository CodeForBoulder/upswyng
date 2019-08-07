import React from 'react';
import { Container } from '../App.styles';
import useSearchResults from './useSearchResults';
import SearchResults from './SearchResults';

const WifiTech = () => {
  const searchQuery = 'CATEGORY-wifiTech';
  const searchResults = useSearchResults(searchQuery);
  return (
    <Container>
      <h1>Wifi &amp; Tech</h1>
      <SearchResults results={searchResults} />
    </Container>
  );
};

export default WifiTech;
