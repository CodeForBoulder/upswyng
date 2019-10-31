/**
 * This is an example config file.
 *
 * Rename it `config.tsx` and insert your values below.
 */
import { TEnvVariables } from "./src/types";

const config_PUT_YOUR_DATA_HERE: TEnvVariables = {
  REACT_APP_ALGOLIA_ADMIN_API_KEY: "<EXAMPLE VALUE>",
  REACT_APP_ALGOLIA_APP_ID: "8ABD2RTEFV",
  REACT_APP_ALGOLIA_INDEX_NAME: "dev_UPSWYNG",
  REACT_APP_ALGOLIA_SEARCH_API_KEY: "c77e10c5b6838decc4e8bcd5f538f90c",
  REACT_APP_FIREBASE_API_KEY: "AIzaSyA-wDretdGtn0wGrv0pq8oXEQRvIdZbHgQ",
  REACT_APP_FIREBASE_AUTH_DOMAIN: "upswyng-local.firebaseapp.com",
  REACT_APP_FIREBASE_DATABASE_URL: "https://upswyng-local.firebaseio.com",
  REACT_APP_FIREBASE_PROJECT_ID: "upswyng-local",
  REACT_APP_FIREBASE_STORAGE_BUCKET: "upswyng-local.appspot.com",
  REACT_APP_FIREBASE_MESSAGE_SENDER_ID: "225583536875",
  REACT_APP_GOOGLE_MAPS_API_KEY: "<EXAMPLE VALUE>",
};

/***********************************************/
/*        DO NOT MODIFY BELOW HERE             */
/***********************************************/

const c = config_PUT_YOUR_DATA_HERE;

export const firebaseConfig = {
  apiKey: c.REACT_APP_FIREBASE_API_KEY,
  authDomain: c.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: c.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: c.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: c.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: c.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
};

export default config_PUT_YOUR_DATA_HERE;
