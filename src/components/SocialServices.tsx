import React from 'react';
import { Container } from '../App.styles';
import useSimilarSearchResults from './useSimilarSearchResults';
import SearchResults from './SearchResults';

const SocialServices = () => {
  const searchQuery = 'CATEGORY-socialServices';
  const searchResults = useSimilarSearchResults(searchQuery);
  return (
    <Container>
      <h1>Social Services</h1>
      <SearchResults results={searchResults} />
    </Container>
  );
};

export default SocialServices;
