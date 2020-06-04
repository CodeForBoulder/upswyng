import { TResourceCategory, TResourceSubcategory } from "../webTypes";

import PageBanner from "./PageBanner";
import React from "react";
import ResourceList from "./ResourceList";
import SubCategories from "./SubCategories";
import Typography from "@material-ui/core/Typography";
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
  const {
    data: categoryResources,
    status: categoryResourcesStatus,
  } = useResourcesByCategory(categoryStub);

  const subcategoryStub = params.subcategory;
  const {
    data: subcategoryResources,
    status: subcategoryResourcesStatus,
  } = useResourcesBySubcategory(categoryStub, subcategoryStub);

  const status = subcategoryStub
    ? subcategoryResourcesStatus
    : categoryResourcesStatus;
  const resources = subcategoryStub ? subcategoryResources : categoryResources;

  return (
    <>
      <PageBanner color={categoryColor}>
        <Typography variant="h1">{categoryText}</Typography>
      </PageBanner>
      <SubCategories
        category={category}
        color={categoryColor}
        subCategories={subCategories}
      />
      <ResourceList
        placeholder={placeholder}
        resources={resources}
        status={status}
      />
    </>
  );
};

export default CategoryResults;
