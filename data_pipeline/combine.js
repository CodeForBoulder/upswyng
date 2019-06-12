const fs = require('fs');

const charity = JSON.parse(fs.readFileSync('data_pipeline/charity.json'));
const hotline = JSON.parse(fs.readFileSync('data_pipeline/hotline.json'));

const db = {
  charity,
  hotline
};

fs.writeFileSync('data_pipeline/all.json', JSON.stringify(db));
