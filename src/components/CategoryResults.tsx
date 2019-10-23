import React, { useState } from 'react';
import { TResourceCategory, TResourceSubcategory } from '../types';
import useSearchResults from './useSearchResults';
import PageBanner from './PageBanner';
import SubCategories from './SubCategories';
import ResourceList from './ResourceList';
import useResourcesByCategory from './useResourcesByCategory';

interface Props {
  category: TResourceCategory;
  color: string;
  placeholder?: React.ReactElement;
  subCategories: TResourceSubcategory[];
}

const CategoryResults = ({
  category,
  color: categoryColor,
  placeholder,
  subCategories
}: Props) => {
  const { text: categoryText, stub: categoryStub } = category;
  const resourcesByCategory = useResourcesByCategory(categoryStub);
  // const [searchQuery, updateSearchQuery] = useState(categoryQuery);
  // const searchResults = useSearchResults(searchQuery);

  // const handleSubCategoryClick = (query: string) => updateSearchQuery(query);
  const handleSubCategoryClick = () => {};

  return (
    <>
      <PageBanner text={categoryText} color={categoryColor} />
      <SubCategories
        category={category}
        color={categoryColor}
        subCategories={subCategories}
        handleSubCategoryClick={handleSubCategoryClick}
      />
      {resourcesByCategory && (
        <ResourceList
          placeholder={placeholder}
          resources={resourcesByCategory}
        />
      )}
    </>
  );
};

export default CategoryResults;
