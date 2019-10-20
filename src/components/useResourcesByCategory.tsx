import { useEffect, useState } from 'react';
import axios from 'axios';

import { TResourceNew, TResourcesByCategoryPayload } from '../types';

type TCategoryStub =
  | 'food'
  | 'health'
  | 'hygiene'
  | 'job_training'
  | 'resources'
  | 'shelters'
  | 'social_services'
  | 'transit'
  | 'wifi';

// TODO: use specific category types
const useCategory = (category: TCategoryStub): null | TResourceNew[] => {
  const [resourcesByCategory, setResourcesByCategory] = useState<
    undefined | null | TResourceNew[]
  >();

  useEffect(() => {
    if (category) {
      const getResourceByCategory = async (): Promise<void> => {
        try {
          const { data } = await axios.get<TResourcesByCategoryPayload>(
            `https://upswyng-server.herokuapp.com/api/category/${category}`
          );
          if (!data.category) {
            throw new Error(
              'no category found in resources by category response'
            );
          }

          const {
            category: { subcategories }
          } = data;
          if (!subcategories.length) {
            throw new Error(
              'no sub-categories found in resources by category response'
            );
          }

          const uniqueResources = subcategories.reduce<TResourceNew[]>(
            (categoryResources, subcategory) => {
              const { resources: subcategoryResources } = subcategory;
              if (!subcategoryResources || !subcategoryResources.length) {
                return categoryResources;
              }

              const uniqueSubcategoryResources = categoryResources.length
                ? subcategoryResources.filter(
                    resource =>
                      !categoryResources.find(
                        categoryResource => categoryResource.id === resource.id
                      )
                  )
                : subcategoryResources;

              return categoryResources.concat(uniqueSubcategoryResources);
            },
            []
          );

          setResourcesByCategory(uniqueResources);
        } catch (err) {
          console.log(err);
          // TODO: log this error
        }
      };

      getResourceByCategory();
    }
  }, [category]);

  return resourcesByCategory;
};

export default useCategory;
