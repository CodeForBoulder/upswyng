#!/usr/bin/env node

/**
 * Starts an in-memory redis instance.
 * Logs CONNECTION_STRING=<connection string> once started
 */

/* eslint-disable */
const tmpRedis = require("tmp-redis");
const getPort = require("get-port");

getPort({ port: 6379 }).then(p => {
  tmpRedis(p, (e, _shutdown) => {
    if (e) throw e;
    console.info(`CONNECTION_STRING=redis://localhost:${p}`);
  });
});
