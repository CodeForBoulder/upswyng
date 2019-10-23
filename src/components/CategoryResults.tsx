import React, { useState, useEffect } from 'react';
import {
  TCategoryStub,
  TSubcategoryStub,
  TResourceCategory,
  TResourceNew,
  TResourceSubcategory
} from '../types';
import PageBanner from './PageBanner';
import SubCategories from './SubCategories';
import ResourceList from './ResourceList';
import useResourcesByCategory from './useResourcesByCategory';
import useResourcesBySubcategory from './useResourcesBySubcategory';

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

  const [
    currentSubcategory,
    setCurrentSubcategory
  ] = useState<TSubcategoryStub | null>(null);

  const categoryResources = useResourcesByCategory(categoryStub);
  const subCategoryResources = useResourcesBySubcategory(currentSubcategory);

  const resources = currentSubcategory
    ? subCategoryResources
    : categoryResources;

  const handleSubCategoryClick = (
    newStub: TCategoryStub | TSubcategoryStub
  ) => {
    if (newStub !== currentSubcategory) {
      setCurrentSubcategory(
        newStub !== categoryStub ? (newStub as TSubcategoryStub) : null
      );
    }
  };

  return (
    <>
      <PageBanner text={categoryText} color={categoryColor} />
      <SubCategories
        category={category}
        color={categoryColor}
        subCategories={subCategories}
        handleSubCategoryClick={handleSubCategoryClick}
      />
      {resources && (
        <ResourceList placeholder={placeholder} resources={resources} />
      )}
    </>
  );
};

export default CategoryResults;
