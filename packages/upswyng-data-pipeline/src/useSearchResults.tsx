import React, { useState, useEffect } from "react";
import algoliaSearch from "algoliasearch";
import config from "../config";
import { TResource } from "./types";

export interface TSearchHit {
  objectId: string | null;
  resourceName: string | null;
}

function useSearchResults(query: string): TSearchHit[] | null {
  const [searchResults, setSearchResults] = useState<TSearchHit[] | null>(null);

  useEffect(() => {
    if (query) {
      const algoliaClient = algoliaSearch(
        config.REACT_APP_ALGOLIA_APP_ID,
        config.REACT_APP_ALGOLIA_SEARCH_API_KEY
      );

      const searchIndex = algoliaClient.initIndex(
        config.REACT_APP_ALGOLIA_INDEX_NAME
      );

      searchIndex.search(query, (err, res) => {
        if (err) {
          throw new Error(err.message);
        }
        if (res && res.hits) {
          setSearchResults(res.hits.map(h => ({
            ...h,
            objectId: h.objectID,
            resourceName: h.charityname,
          })) as TSearchHit[]);
        }
        return null;
      });
    }
  }, [query]);

  return searchResults;
}

export default useSearchResults;
