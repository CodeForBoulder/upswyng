import React from 'react';
import { Container } from '../App.styles';
import useSearchResults from './useSearchResults';
import SearchResults from './SearchResults';

const Resources = () => {
  const searchQuery = 'CATEGORY-resources';
  const searchResults = useSearchResults(searchQuery);
  return (
    <Container>
      <h1>Resources</h1>
      <SearchResults results={searchResults} />
    </Container>
  );
};

export default Resources;
