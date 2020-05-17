import { QueryResult, useQuery } from "react-query";

import { TResource } from "@upswyng/types";
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

const useResourcesBySubcategory = (
  subcategory?: string
): QueryResult<TResource[]> =>
  useQuery(
    !!subcategory && ["resources", { subcategory }],
    getResourceBySubcategory
  );

export default useResourcesBySubcategory;
