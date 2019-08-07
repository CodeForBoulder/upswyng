import React from 'react';
import { Container } from '../App.styles';
import useSearchResults from './useSearchResults';
import SearchResults from './SearchResults';

const SocialServices = () => {
  const searchQuery = 'CATEGORY-socialServices';
  const searchResults = useSearchResults(searchQuery);
  return (
    <Container>
      <h1>Social Services</h1>
      <SearchResults results={searchResults} />
    </Container>
  );
};

export default SocialServices;
