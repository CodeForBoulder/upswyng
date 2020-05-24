import { TResource } from "@upswyng/types";
import { TResourcesByCategoryPayload } from "../webTypes";
import apiClient from "../utils/apiClient";
import { useQuery } from "react-query";

const getResourcesByCategory = async (
  _queryKey: string,
  params: { category: string }
): Promise<TResourcesByCategoryPayload> => {
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

  return data;
};

const getUniqueFlattenedResources = (
  payload?: TResourcesByCategoryPayload
): TResource[] | undefined => {
  const subcategories = payload?.category?.subcategories;
  if (!subcategories || !subcategories.length) {
    return;
  }

  const uniqueResources = subcategories.reduce<TResource[]>(
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

const useResourcesByCategory = (
  categoryStub?: string
): {
  data: TResource[] | undefined;
  status: "loading" | "error" | "success";
} => {
  const { data, status } = useQuery(
    !!categoryStub && ["resources", { category: categoryStub }],
    getResourcesByCategory,
    {
      staleTime: 900000, // 15 min
    }
  );
  const resources = getUniqueFlattenedResources(data);

  return { data: resources, status };
};

export default useResourcesByCategory;
