import React, { useState } from 'react';
import { TResourceCategory } from '../types';
import useSearchResults from './useSearchResults';
import PageBanner from './PageBanner';
import SubCategories from './SubCategories';
import SearchResults from './SearchResults';
import useResourcesByCategory from './useResourcesByCategory';

interface Props {
  category: TResourceCategory;
  color: string;
  placeholder?: React.ReactElement;
  subCategories: TResourceCategory[];
}

const CategoryResults = ({
  category,
  color: categoryColor,
  placeholder,
  subCategories
}: Props) => {
  const { text: categoryText, query: categoryQuery } = category;
  const resourcesByCategory = useResourcesByCategory('food');
  console.log('useResourcesByCategory: ', resourcesByCategory);
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
      <SearchResults placeholder={placeholder} results={searchResults} />
    </>
  );
};

export default CategoryResults;
