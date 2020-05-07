#!/usr/bin/env node

/**
 * Sets up an in-memory database for testing.
 * Helpful: https://github.com/tapjs/node-tap/issues/608#issuecomment-548120391
 *
 * Writes two files to its directory:
 * .mongodbpid contains the PID of the child process which should be killed once the test is complete.
 * .mongodburi contains the connection string/uri of the database
 */

/* eslint-disable */
const fs = require("fs");
const { spawn } = require("child_process");
const child = spawn("node", [`${__dirname}/start_memory_db_impl.js`], {
  detached: true, // don't SIGHUP when the parent proc exits
  stdio: ["ignore", "pipe", "pipe"],
});

child.stderr.pipe(process.stderr);
child.stdout.on("data", chunk => {
  const pid = String(child.pid).trim();
  const uri = String(chunk).trim();
  const match = uri.match(
    /^CONNECTION_STRING=(?<connectionString>mongodb:\/\/.+\?)$/
  );
  if (!match) {
    console.error(`Invalid connection string: ${uri}`);
    process.exit(1);
  }
  const { connectionString } = match.groups;
  fs.writeFileSync(`${__dirname}/.mongodburi`, connectionString);
  fs.writeFileSync(`${__dirname}/.mongodbpid`, pid);

  console.info(`🎉 Started in-memory mongo db`);
  console.info(`PID:\t\t${pid}`);
  console.info(`Connection URI:\t${connectionString}`);
  
  // got data, maybe look at it to verify that it started up ok
  child.unref(); // let the process close normally
  process.exit(0);
});
