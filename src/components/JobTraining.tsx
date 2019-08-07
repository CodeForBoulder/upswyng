import React from 'react';
import { Container } from '../App.styles';
import useSimilarSearchResults from './useSimilarSearchResults';
import SearchResults from './SearchResults';

const JobTraining = () => {
  const searchQuery =
    'job, career, financial aid, GED, school, K-12, library, vocational, training';
  const searchResults = useSimilarSearchResults(searchQuery);
  return (
    <Container>
      <h1>Job Training</h1>
      <SearchResults results={searchResults} />
    </Container>
  );
};

export default JobTraining;
