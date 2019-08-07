import React from 'react';
import { Container } from '../App.styles';
import useSimilarSearchResults from './useSimilarSearchResults';
import SearchResults from './SearchResults';

const Resources = () => {
  const searchQuery =
    'resources, supplies, sleeping bag, gear, camp, clothes, shoes, pet';
  const searchResults = useSimilarSearchResults(searchQuery);
  return (
    <Container>
      <h1>Resources</h1>
      <SearchResults results={searchResults} />
    </Container>
  );
};

export default Resources;
