import { TResourceCategory, TResourceSubcategory } from "../webTypes";

import PageBanner from "./PageBanner";
import React from "react";
import ResourceList from "./ResourceList";
import { ResourceSchedule } from "@upswyng/common";
import SubCategories from "./SubCategories";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";
import useResourcesByCategory from "./useResourcesByCategory";
import useResourcesBySubcategory from "./useResourcesBySubcategory";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(["categories"]);

  const {
    translationKey: categoryTranslationKey,
    stub: categoryStub,
  } = category;
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
  const resources = ResourceSchedule.sortByOpen(
    subcategoryStub ? subcategoryResources : categoryResources
  );

  return (
    <>
      <PageBanner color={categoryColor}>
        <Typography variant="h1">{t(categoryTranslationKey)}</Typography>
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
