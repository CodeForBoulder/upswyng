import { useEffect, useState } from 'react';
import apiClient from '../utils/apiClient';

import {
  TSubcategoryStub,
  TResourceNew,
  TResourcesBySubcategoryPayload
} from '../types';

const useResourcesBySubcategory = (
  subcategory: TSubcategoryStub
): undefined | null | TResourceNew[] => {
  const [resourcesBySubcategory, setResourcesBySubcategory] = useState<
    undefined | null | TResourceNew[]
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
          if (!resources.length) {
            throw new Error('no resources found in subcategory response');
          }

          setResourcesBySubcategory(resources);
        } catch (err) {
          console.log(err);
          // TODO: log this error
        }
      };

      getResourceBySubcategory();
    }
  }, [subcategory]);

  return resourcesBySubcategory;
};

export default useResourcesBySubcategory;
