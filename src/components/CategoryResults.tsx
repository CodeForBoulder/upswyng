import React, { useState } from 'react';
import { TSubCategory } from '../types';
import useSearchResults from './useSearchResults';
import CategoryBanner from './CategoryBanner';
import SubCategories from './SubCategories';
import SearchResults from './SearchResults';

interface Props {
  category: TSubCategory;
  color: string;
  subCategories: TSubCategory[];
}

const CategoryResults = ({
  category,
  color: categoryColor,
  subCategories
}: Props) => {
  const { text: categoryText, query: categoryQuery } = category;
  const [searchQuery, updateSearchQuery] = useState(categoryQuery);
  const searchResults = useSearchResults(searchQuery);

  subCategories.unshift({ text: 'All', query: categoryQuery });

  const handleSubCategoryClick = (query: string) => updateSearchQuery(query);

  return (
    <>
      <CategoryBanner text={categoryText} color={categoryColor} />
      <SubCategories
        color={categoryColor}
        subCategories={subCategories}
        handleSubCategoryClick={handleSubCategoryClick}
      />
      <SearchResults results={searchResults} />
    </>
  );
};

export default CategoryResults;
