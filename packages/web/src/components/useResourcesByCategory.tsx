import { TResource } from "@upswyng/types";
import { TResourcePayload } from "../webTypes";
import apiClient from "../utils/apiClient";
import { useQuery } from "react-query";

const getResourcesByCategory = async (
  _queryKey: string,
  params: { category: string }
): Promise<TResourcePayload> => {
  const { data } = await apiClient.get<TResourcePayload>(
    `/resources/?categories=${params.category}`
  );

  if (!data.resources) {
    throw new Error("no category found in resources by category response");
  }

  // const {
  //   category: { subcategories },
  // } = data;
  // if (!(subcategories || []).length) {
  //   throw new Error(
  //     "no sub-categories found in resources by category response"
  //   );
  // }

  return data;
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
  const resources = data?.resources;

  return { data: resources, status };
};

export default useResourcesByCategory;
