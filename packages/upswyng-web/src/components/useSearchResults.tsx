import { useEffect, useState } from "react";

import { TEnvVariables } from "../webTypes";
import algoliaSearch from "algoliasearch";

declare const process: TEnvVariables;

function useSearchResults(
  query: string
): undefined | null | algoliaSearch.Response {
  const algoliaClient = algoliaSearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY
  );

  const searchIndex = algoliaClient.initIndex(
    process.env.REACT_APP_ALGOLIA_INDEX_NAME
  );

  const [searchResults, setSearchResults] = useState<
    undefined | null | algoliaSearch.Response
  >(undefined);

  useEffect(() => {
    if (query) {
      const getSearchResults = async (query: string): Promise<void> => {
        try {
          const searchResults = await searchIndex.search(query);

          setSearchResults(searchResults);
        } catch (err) {
          // TODO: log this error
          setSearchResults(null);
        }
      };

      getSearchResults(query);
    }
  }, [query]);

  return searchResults;
}

export default useSearchResults;
