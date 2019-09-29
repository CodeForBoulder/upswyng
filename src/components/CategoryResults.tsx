import React, { useState } from 'react';
import { TResourceCategory } from '../types';
import useSearchResults from './useSearchResults';
import PageBanner from './PageBanner';
import SubCategories from './SubCategories';
import SearchResults from './SearchResults';

interface Props {
  category: TResourceCategory;
  color: string;
  subCategories: TResourceCategory[];
}

const CategoryResults = ({
  category,
  color: categoryColor,
  subCategories
}: Props) => {
  const { text: categoryText, query: categoryQuery } = category;
  const [searchQuery, updateSearchQuery] = useState(categoryQuery);
  const searchResults = useSearchResults(searchQuery);

  const handleSubCategoryClick = (query: string) => updateSearchQuery(query);

  return (
    <>
      <PageBanner text={categoryText} color={categoryColor} />
      <SubCategories
        category={category}
        color={categoryColor}
        subCategories={subCategories}
        handleSubCategoryClick={handleSubCategoryClick}
      />
      <SearchResults results={searchResults} />
    </>
  );
};

export default CategoryResults;
