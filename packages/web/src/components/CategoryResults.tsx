import { TResourceCategory, TResourceSubcategory } from "../webTypes";

import PageBanner from "./PageBanner";
import React from "react";
import ResourceList from "./ResourceList";
import SubCategories from "./SubCategories";
import { useParams } from "react-router-dom";
import useResourcesByCategory from "./useResourcesByCategory";
import useResourcesBySubcategory from "./useResourcesBySubcategory";

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
  subCategories,
}: Props) => {
  const params = useParams<{ subcategory?: string }>();

  const { text: categoryText, stub: categoryStub } = category;
  const { data: categoryResources } = useResourcesByCategory(categoryStub);

  const subcategoryStub = params.subcategory ? params.subcategory : null;
  const subcategoryResources = useResourcesBySubcategory(subcategoryStub);

  return (
    <>
      <PageBanner text={categoryText} color={categoryColor} />
      <SubCategories
        category={category}
        color={categoryColor}
        subCategories={subCategories}
      />
      <ResourceList
        placeholder={placeholder}
        resources={subcategoryStub ? subcategoryResources : categoryResources}
      />
    </>
  );
};

export default CategoryResults;
