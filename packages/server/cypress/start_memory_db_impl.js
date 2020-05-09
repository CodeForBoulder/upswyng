#!/usr/bin/env node

/**
 * Starts an in-memory MongoDb instance.
 * Logs CONNECTION_STRING=<connection string> once started
 */

/* eslint-disable */
const { MongoMemoryServer } = require("mongodb-memory-server");

MongoMemoryServer.create()
  .then(s => s.getConnectionString())
  .then(connectionString =>
    console.info(`CONNECTION_STRING=${connectionString}`)
  );
