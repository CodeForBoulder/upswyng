import React from 'react';
import { colors, Container } from '../App.styles';
import useSearchResults from './useSearchResults';
import CategoryBanner from './CategoryBanner';
import SearchResults from './SearchResults';

const WifiTech = () => {
  const searchQuery = 'CATEGORY-wifiTech';
  const searchResults = useSearchResults(searchQuery);
  return (
    <Container>
      <CategoryBanner text="Wifi &amp; Tech" color={colors.blue} />
      <SearchResults results={searchResults} />
    </Container>
  );
};

export default WifiTech;
