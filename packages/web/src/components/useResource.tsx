import { useEffect, useState } from "react";

import { TResource } from "@upswyng/types";
import { TResourcePayload } from "../webTypes";
import apiClient from "../utils/apiClient";

let serverUri = process.env.REACT_APP_SERVER_URI || "http://localhost:3000";
if (serverUri.charAt(serverUri.length - 1) === "/") {
  serverUri = serverUri.slice(0, -1);
}

const useResources = (
  resourceIds: string[]
): undefined | null | TResource[] => {
  const [resources, setResources] = useState<undefined | null | TResource[]>();
  const queryParam = "?id=" + resourceIds.join(",");

  useEffect(() => {
    const getResources = async (): Promise<void> => {
      try {
        const { data } = await apiClient.get<TResourcePayload>(
          `/resources${queryParam}`
        );

        const resources: TResource[] | undefined = data.resources;
        if (!resources) {
          const errorMessage: string =
            data.message || "There was a problem retrieving the resources.";
          throw new Error(errorMessage);
        }

        setResources(resources);
      } catch (err) {
        // TODO: log this error
        setResources(null);
      }
    };

    getResources();
  }, [queryParam]);

  return resources;
};

export default useResources;
