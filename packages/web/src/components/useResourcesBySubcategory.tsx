import { QueryResult, queryCache, useQuery } from "react-query";
import { TResource } from "@upswyng/types";
import { TResourcesByCategoryPayload } from "../webTypes";

import { TResourcesBySubcategoryPayload } from "../webTypes";
import apiClient from "../utils/apiClient";

const getResourceBySubcategory = async (
  _queryKey: string,
  params: { subcategory: string }
): Promise<TResource[]> => {
  const { data } = await apiClient.get<TResourcesBySubcategoryPayload>(
    `/subcategory/${params.subcategory}`
  );

  if (!data.subcategory) {
    throw new Error(
      "no subcategory found in resources by subcategory response"
    );
  }

  const {
    subcategory: { resources },
  } = data;
  if (!resources || !resources.length) {
    throw new Error("no resources found in subcategory response");
  }

  return resources;
};

const getResourcesFromCategory = (
  categoryStub: string,
  subcategoryStub?: string
): TResource[] | undefined => {
  if (!subcategoryStub) {
    return;
  }

  const resourcesByCategory = queryCache.getQueryData([
    "resources",
    { category: categoryStub },
  ]) as TResourcesByCategoryPayload | undefined;
  if (!resourcesByCategory) {
    return;
  }

  const subcategory = resourcesByCategory?.category?.subcategories?.find(
    subcategory => subcategory.stub === subcategoryStub
  );

  return subcategory?.resources;
};

const useResourcesBySubcategory = (
  category: string,
  subcategory?: string
): QueryResult<TResource[]> =>
  useQuery(
    !!subcategory && ["resources", { subcategory }],
    getResourceBySubcategory,
    {
      initialData: () => getResourcesFromCategory(category, subcategory),
      staleTime: 900000, // 15 min
    }
  );

export default useResourcesBySubcategory;
