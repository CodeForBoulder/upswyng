#!/usr/bin/env ts-node

/**
 * Convert a JSON dump of charities in strapped format to resources in upswyng format
 *
 * Useage:
 * - Convert file to executeable
 * chmod u+x convertResources.ts
 *
 * - Run script
 * ./convertResources.ts path/to/charity.json path/to/output/resources.json
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const { convertResource } = require('../src/utils/convertStrappedToUpswyng');

const args = process.argv.slice(2);

if (args.length != 2) {
  throw new Error(
    'Please provide an input and out path. Sample useage:\n \
    ./convertResources.ts path/to/charity.json path/to/output/resources.json'
  );
}

const inPath = args[0];
const outPath = args[1];

if (!inPath || typeof inPath != 'string' || !inPath.length) {
  throw new Error('Did not receive a path for the input file');
}

if (!outPath || typeof outPath != 'string' || !outPath.length) {
  throw new Error('Did not receive a path for the output file');
}

const charities = JSON.parse(fs.readFileSync(inPath).toString('utf8'));

const resources = Object.keys(charities).reduce(
  (result, id) => ({ ...result, [id]: convertResource(charities[id]) }),
  {}
);

fs.writeFileSync(outPath, JSON.stringify(resources, null, 2));
