import { QueryResult, useQuery } from "react-query";

import { TResource } from "@upswyng/types";
import { TResourcesByCategoryPayload } from "../webTypes";
import apiClient from "../utils/apiClient";

const getResourcesByCategory = async (
  _queryKey: string,
  params: { category: string }
): Promise<TResource[]> => {
  const { data } = await apiClient.get<TResourcesByCategoryPayload>(
    `/category/${params.category}`
  );

  if (!data.category) {
    throw new Error("no category found in resources by category response");
  }

  const {
    category: { subcategories },
  } = data;
  if (!(subcategories || []).length) {
    throw new Error(
      "no sub-categories found in resources by category response"
    );
  }

  const uniqueResources = (subcategories || []).reduce<TResource[]>(
    (categoryResources, subcategory) => {
      const { resources: subcategoryResources } = subcategory;
      if (!subcategoryResources || !subcategoryResources.length) {
        return categoryResources;
      }

      const uniqueSubcategoryResources = categoryResources.length
        ? subcategoryResources.filter(
            resource =>
              !categoryResources.find(
                categoryResource =>
                  categoryResource.resourceId === resource.resourceId
              )
          )
        : subcategoryResources;

      return categoryResources.concat(uniqueSubcategoryResources);
    },
    []
  );

  return uniqueResources;
};

const useResourcesByCategory = (category?: string): QueryResult<TResource[]> =>
  useQuery(!!category && ["resources", { category }], getResourcesByCategory);

export default useResourcesByCategory;
