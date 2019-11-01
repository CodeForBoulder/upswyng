import { TResource } from '@upswyng/upswyng-types';
import { TResourcePayload } from '../webTypes';
import { useEffect, useState } from 'react';
import axios from 'axios';

const useResource = (resourceId: string): undefined | null | TResource => {
  const [resource, setResource] = useState<undefined | null | TResource>();

  useEffect(() => {
    const getResource = async (): Promise<void> => {
      try {
        const { data } = await axios.get<TResourcePayload>(
          `https://upswyng-server.herokuapp.com/api/resource/${resourceId}`
        );
        const resource: TResource | undefined = data.resource;
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

export default useResource;
