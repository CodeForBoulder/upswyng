import React from 'react';
import { Container } from '../App.styles';
import useSimilarSearchResults from './useSimilarSearchResults';
import SearchResults from './SearchResults';

const Health = () => {
  const searchQuery =
    'health, medical, clinic, dental, vision, eye, hospital, nurse, pediatrician, mental, routine, urgent, therapy, physical, pharmacy';
  const searchResults = useSimilarSearchResults(searchQuery);
  return (
    <Container>
      <h1>Health</h1>
      <SearchResults results={searchResults} />
    </Container>
  );
};

export default Health;
