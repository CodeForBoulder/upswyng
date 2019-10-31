/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import algoliaSearch from "algoliasearch";
import { TEnvVariables } from "./types";
import config from "../config";
import { TSearchHit } from "./useSearchResults";

function useSimilarSearchResults(query: string): algoliaSearch.Response | null {
  const [
    searchResults,
    setSearchResults,
  ] = useState<algoliaSearch.Response | null>(null);

  useEffect(() => {
    if (query) {
      const algoliaClient = algoliaSearch(
        config.REACT_APP_ALGOLIA_APP_ID,
        config.REACT_APP_ALGOLIA_SEARCH_API_KEY
      );

      const searchIndex = algoliaClient.initIndex(
        config.REACT_APP_ALGOLIA_INDEX_NAME
      );

      searchIndex.search(
        {
          query: "",
          similarQuery: query,
        },
        (err, res) => {
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
        }
      );
    }
  }, [query]);

  return searchResults;
}

export default useSimilarSearchResults;
