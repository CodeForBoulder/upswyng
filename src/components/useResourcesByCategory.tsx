import { useEffect, useState } from 'react';
import axios from 'axios';

import { TCategoryName } from './Categories';

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

interface TResourceNew {}

interface TResourcesBySubCategory {
  resources: TResourceNew[];
  _id: string;
  name: TCategoryName;
  stub: string;
  parentCategory: string;
  createdAt: string;
  lastModifiedAt: string;
  __v: number;
}

interface TResourcesByCategory {
  subcategories: TResourcesBySubCategory[];
  _id: string;
  name: TCategoryName;
  stub: string;
  color: string;
  createdAt: string;
  lastModifiedAt: string;
  __v: number;
}

interface TResourcesByCategoryResponse {
  category: TResourcesByCategory;
}

// TODO: use specific category types
const useCategory = (category: TCategoryStub): null | TResourcesByCategory => {
  const [
    resourcesByCategory,
    setResourcesByCategory
  ] = useState<null | TResourcesByCategory>(null);

  useEffect(() => {
    if (category) {
      const getResourceByCategory = async (): Promise<void> => {
        try {
          const response = await axios.get<TResourcesByCategoryResponse>(
            `https://upswyng-server.herokuapp.com/api/category/${category}`
          );
          const {
            data: { category: resourcesByCategory }
          } = response;

          setResourcesByCategory(resourcesByCategory);
        } catch (err) {
          //do something with error
        }
      };

      getResourceByCategory();
    }
  });

  return resourcesByCategory;
};

export default useCategory;
