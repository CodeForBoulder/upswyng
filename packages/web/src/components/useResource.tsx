import { useEffect, useState } from "react";

import { TResource } from "@upswyng/types";
import { TResourcePayload } from "../webTypes";
import apiClient from "../utils/apiClient";

let serverUri = process.env.REACT_APP_SERVER_URI || "http://localhost:3000";
if (serverUri.charAt(serverUri.length - 1) === "/") {
  serverUri = serverUri.slice(0, -1);
}

const useResource = (resourceId: string): undefined | null | TResource => {
  const [resource, setResource] = useState<undefined | null | TResource>();

  useEffect(() => {
    const getResource = async (): Promise<void> => {
      try {
        const { data } = await apiClient.get<TResourcePayload>(
          `/resource/${resourceId}`
        );

        const resource: TResource | undefined = data.resource;
        if (!resource) {
          const errorMessage: string =
            data.message || "There was a problem retrieving the resource.";
          throw new Error(errorMessage);
        }

        setResource(resource);
      } catch (err) {
        // TODO: log this error
        setResource(null);
      }
    };

    getResource();
  }, [resourceId, setResource]);

  return resource;
};

export default useResource;
