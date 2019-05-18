let fs = require('fs');

let b = {
  latLow: 39.914301,
  latHi: 40.260222,
  lngLow: -105.690812,
  lngHi: -105.055875
};

let charity = JSON.parse(
  fs.readFileSync('data_pipeline/strapped/charity.json')
);

//TODO: filter
let filteredCharity = Object.keys(charity).reduce((filtered, key) => {
  c = charity[key];
  if (
    c.lat <= b.latHi &&
    c.lat >= b.latLow &&
    c.lng <= b.lngHi &&
    c.lng >= b.lngLow
  ) {
    filtered[key] = c;
  }
  return filtered;
}, {});

//TODO: massage

fs.writeFileSync('data_pipeline/charity.json', JSON.stringify(filteredCharity));

let crisisline = JSON.parse(
  fs.readFileSync('data_pipeline/strapped/crisisline.json')
);

//TODO: filter

//TODO: massage

fs.writeFileSync('data_pipeline/crisisline.json', JSON.stringify(crisisline));
