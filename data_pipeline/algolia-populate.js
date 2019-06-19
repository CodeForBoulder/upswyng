/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const dotenv = require('dotenv');
const algoliasearch = require('algoliasearch');

dotenv.config();

const charities = JSON.parse(
  fs.readFileSync('data_pipeline/charity.json').toString('utf8')
);

const updatedAlgoliaIndex = [];

for (const charityID in charities) {
  if (charities[charityID]) {
    const { charityname, category, servicetype } = charities[charityID];
    updatedAlgoliaIndex.push({
      objectID: charityID, //objectID required by Algolia
      charityname,
      category,
      servicetype
    });
  }
}

// initialize Algolia project
const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
);

// initialize Algolia project index
const index = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME);

// add/update charities
index
  .saveObjects(updatedAlgoliaIndex)
  .then(() => {
    console.log('Charities imported into Algolia');
  })
  .catch(error => {
    throw new Error('Error when importing charities into Algolia', error);
  });
