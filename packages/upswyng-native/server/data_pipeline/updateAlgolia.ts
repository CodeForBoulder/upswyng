import * as dotenv from "dotenv";
import algoliaSearch from "algoliasearch";
import mongoose from "mongoose";
import "../src/models/Subcategory"; // needed to populate resource field
import Resource from "../src/models/Resource";

dotenv.config();

const {
  ALGOLIA_APP_ID,
  ALGOLIA_WRITE_API_KEY,
  ALGOLIA_INDEX_NAME,

  DATABASE_URL,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_USER
} = process.env;

// initialize Algolia project
const algolia = algoliaSearch(ALGOLIA_APP_ID, ALGOLIA_WRITE_API_KEY);

// initialize Algolia project index
const index = algolia.initIndex(ALGOLIA_INDEX_NAME);

console.log("Syncing Resources to Algolia");

mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    dbName: DATABASE_NAME,
    user: DATABASE_USER,
    pass: DATABASE_PASSWORD
  })
  .then(
    () => console.log(`Connected to MongoDB instance at ${DATABASE_URL}`),
    e =>
      console.log(
        `There was an error connecting to the MongoDB instance at ${DATABASE_URL}:\n${e}`
      )
  )
  .then(() => Resource.getAll())
  .then(resources => {
    const updatedAlgoliaIndex = resources.map(
      ({ id, name, description, subcategories }) => ({
        objectID: id,
        name,
        description,
        subcategories: subcategories.map(s => s.name).join(",")
      })
    );

    return index.saveObjects(updatedAlgoliaIndex);
  })
  .then(() => console.log("Resources imported into Algolia"))
  .catch(error => {
    throw new Error("Error when importing resources into Algolia:\n" + error);
  })
  .finally(() => mongoose.connection.close());
