import { useEffect, useState } from 'react';
import axios from 'axios';

import { TResourcePayload, TResourceNew } from '../types';

const useResourceNew = (
  resourceId: string
): undefined | null | TResourceNew => {
  const [resource, setResource] = useState<undefined | null | TResourceNew>();

  useEffect(() => {
    const getResource = async (): Promise<void> => {
      try {
        const { data } = await axios.get<TResourcePayload>(
          `https://upswyng-server.herokuapp.com/api/resource/${resourceId}`
        );
        const resource: TResourceNew | undefined = data.resource;
        if (!resource) {
          const errorMessage: string =
            data.message || 'There was a problem retrieving the resource.';
          throw new Error(errorMessage);
        }

        setResource(resource);
      } catch (err) {
        // TODO: log this error
        setResource(null);
      }
    };

    getResource();
  }, [setResource]);

  return resource;
};

export default useResourceNew;
