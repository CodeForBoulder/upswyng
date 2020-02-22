import { useEffect, useState } from "react";
import { TEnvVariables } from "../webTypes";
import { TStatusFetch } from "@upswyng/upswyng-types";
import algoliaSearch from "algoliasearch";

declare const process: TEnvVariables;

function useSearchResults(
  query: string
): [TStatusFetch, algoliaSearch.Response | null] {
  const algoliaClient = algoliaSearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY
  );

  const searchIndex = algoliaClient.initIndex(
    process.env.REACT_APP_ALGOLIA_INDEX_NAME
  );

  const [status, setStatus] = useState<TStatusFetch>(
    TStatusFetch.STATUS_NOT_FETCHED
  );
  const [
    searchResults,
    setSearchResults,
  ] = useState<null | algoliaSearch.Response>(null);

  useEffect(() => {
    if (query && !searchResults) {
      const getSearchResults = async (query: string): Promise<void> => {
        try {
          setStatus(TStatusFetch.STATUS_FETCHING);
          const searchResults = await searchIndex.search(query);

          setStatus(TStatusFetch.STATUS_FETCH_SUCCESS);
          setSearchResults(searchResults);
        } catch (err) {
          // TODO: log this error
          setStatus(TStatusFetch.STATUS_FETCH_ERROR);
          setSearchResults(null);
        }
      };

      getSearchResults(query);
    }
  }, [query, searchIndex, searchResults]);

  return [status, searchResults];
}

export default useSearchResults;
