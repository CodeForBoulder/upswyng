import React, { useState, useEffect } from "react";
import algoliaSearch from "algoliasearch";
import config from "../config";

function useSearchResults(query: string): algoliaSearch.Response | null {
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

      searchIndex.search(query, (err, res) => {
        if (err) {
          throw new Error(err.message);
        }
        setSearchResults(res);
      });
    }
  }, [query]);

  return searchResults;
}

export default useSearchResults;
