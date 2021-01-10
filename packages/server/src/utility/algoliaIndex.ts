import * as dotenv from "dotenv";

import algoliaSearch from "algoliasearch";
dotenv.config();

const {
  ALGOLIA_APP_ID,
  ALGOLIA_WRITE_API_KEY,
  ALGOLIA_INDEX_NAME,
} = process.env;

const index = algoliaSearch(ALGOLIA_APP_ID, ALGOLIA_WRITE_API_KEY).initIndex(
  ALGOLIA_INDEX_NAME
);

export default index;
