import { TResource } from "@upswyng/types";
import { TResourcePayload } from "../webTypes";
import apiClient from "../utils/apiClient";
import { useQuery } from "react-query";

const getResources = async (queryParam: string): Promise<TResource[]> => {
  const { data } = await apiClient.get<TResourcePayload>(
    `/resources${queryParam}`
  );

  if (!data.resources) {
    const errorMessage: string =
      data.message || "There was a problem retrieving the resources.";
    throw new Error(errorMessage);
  }

  return data.resources;
};

const useResources = (
  resourceIds: string[]
): {
  resources: TResource[] | undefined;
  status: "loading" | "error" | "success";
} => {
  const queryParam = "?id=" + resourceIds.join(",");

  const { data, status } = useQuery(queryParam, getResources, {
    staleTime: 900000, // 15 min
  });

  return { resources: data, status };
};

export default useResources;
