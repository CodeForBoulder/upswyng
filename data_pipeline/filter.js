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

let filteredCharity = Object.keys(charity).reduce((filtered, key) => {
  let c = charity[key];
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

fs.writeFileSync('data_pipeline/charity.json', JSON.stringify(filteredCharity));

let crisisline = JSON.parse(
  fs.readFileSync('data_pipeline/strapped/crisisline.json')
);

//TODO: filter

fs.writeFileSync('data_pipeline/crisisline.json', JSON.stringify(crisisline));
