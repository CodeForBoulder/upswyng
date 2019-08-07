/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const dotenv = require('dotenv');
const algoliaSearch = require('algoliasearch');

//load local environment variables
const env = {
  local: dotenv.parse(fs.readFileSync('.env.local'))
};

const charities = JSON.parse(
  fs.readFileSync('data_pipeline/charity.json').toString('utf8')
);

const updatedAlgoliaIndex = Object.entries(charities).map(
  ([charityID, { charityname, category, servicetype, description }]) => ({
    objectID: charityID, //objectID required by Algolia
    charityname,
    category,
    description,
    servicetype
  })
);

// initialize Algolia project
const algolia = algoliaSearch(
  env.local.REACT_APP_ALGOLIA_APP_ID,
  env.local.REACT_APP_ALGOLIA_ADMIN_API_KEY
);

// initialize Algolia project index
const index = algolia.initIndex(env.local.REACT_APP_ALGOLIA_INDEX_NAME);

// add/update charities
index
  .saveObjects(updatedAlgoliaIndex)
  .then(() => {
    console.log('Charities imported into Algolia');
  })
  .catch(error => {
    throw new Error('Error when importing charities into Algolia', error);
  });
