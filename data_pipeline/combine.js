const fs = require('fs');

const charity = JSON.parse(fs.readFileSync('data_pipeline/charity.json'));
const crisisline = JSON.parse(fs.readFileSync('data_pipeline/crisisline.json'));

const db = {
  charity,
  crisisline
};

fs.writeFileSync('data_pipeline/all.json', JSON.stringify(db));
