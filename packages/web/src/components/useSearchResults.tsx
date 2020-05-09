import { TAlgoliaResponse, TEnvVariables } from "../webTypes";
import { useEffect, useState } from "react";

import { TStatusFetch } from "@upswyng/types";
import algoliaSearch from "algoliasearch";

declare const process: TEnvVariables & {
  env: { NODE_ENV: string | undefined };
};

const {
  NODE_ENV,
  REACT_APP_ALGOLIA_APP_ID,
  REACT_APP_ALGOLIA_SEARCH_API_KEY,
  REACT_APP_ALGOLIA_INDEX_NAME,
} = process.env;

// Development/CI mode:
// If the environment is not production and algolia information isn't complete,
// set up a handler that just logs queries
const logOnly =
  NODE_ENV !== "production" &&
  (!REACT_APP_ALGOLIA_APP_ID ||
    !REACT_APP_ALGOLIA_SEARCH_API_KEY ||
    !REACT_APP_ALGOLIA_INDEX_NAME);

let algoliaClient: algoliaSearch.Client;
let searchIndex: algoliaSearch.Index;

if (logOnly) {
  console.warn(
    "Algolia search env vars not provided. Starting in Development Mode."
  );
  console.warn(`\tREACT_APP_ALGOLIA_APP_ID:\t${REACT_APP_ALGOLIA_APP_ID}`);
  console.warn(
    `\tREACT_APP_ALGOLIA_SEARCH_API_KEY:\t${REACT_APP_ALGOLIA_SEARCH_API_KEY}`
  );
  console.warn(
    `\tREACT_APP_ALGOLIA_INDEX_NAME:\t${REACT_APP_ALGOLIA_INDEX_NAME}`
  );
} else {
  algoliaClient = algoliaSearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY
  );
  searchIndex = algoliaClient.initIndex(
    process.env.REACT_APP_ALGOLIA_INDEX_NAME
  );
}

const useSearchResults = logOnly
  ? (query: string): [TStatusFetch, TAlgoliaResponse | null] => {
      console.warn(`Algolia search queried in dev mode: ${query}`);
      return [TStatusFetch.STATUS_FETCH_ERROR, null];
    }
  : (query: string): [TStatusFetch, TAlgoliaResponse | null] => {
      const [status, setStatus] = useState<TStatusFetch>(
        TStatusFetch.STATUS_NOT_FETCHED
      );
      const [
        searchResults,
        setSearchResults,
      ] = useState<null | TAlgoliaResponse>(null);

      useEffect(() => {
        if (query) {
          const getSearchResults = async (query: string): Promise<void> => {
            try {
              setStatus(TStatusFetch.STATUS_FETCHING);
              setSearchResults(null);
              const searchResults = (await searchIndex.search(
                query
              )) as TAlgoliaResponse;

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
      }, [query]);

      return [status, searchResults];
    };

export default useSearchResults;
