import { useEffect, useState } from 'react';
import apiClient from '../utils/apiClient';

import {
  TSubcategoryStub,
  TResource,
  TResourcesBySubcategoryPayload
} from '../types';

const useResourcesBySubcategory = (
  subcategory: TSubcategoryStub | null
): undefined | null | TResource[] => {
  const [resourcesBySubcategory, setResourcesBySubcategory] = useState<
    undefined | null | TResource[]
  >();

  useEffect(() => {
    if (subcategory) {
      const getResourceBySubcategory = async (): Promise<void> => {
        try {
          const { data } = await apiClient.get<TResourcesBySubcategoryPayload>(
            `/subcategory/${subcategory}`
          );

          if (!data.subcategory) {
            throw new Error(
              'no subcategory found in resources by subcategory response'
            );
          }

          const {
            subcategory: { resources }
          } = data;
          if (!resources || !resources.length) {
            throw new Error('no resources found in subcategory response');
          }

          setResourcesBySubcategory(resources);
        } catch (err) {
          setResourcesBySubcategory(null);
          // TODO: log this error
          console.log(err);
        }
      };

      getResourceBySubcategory();
    }
  }, [subcategory]);

  return resourcesBySubcategory;
};

export default useResourcesBySubcategory;
