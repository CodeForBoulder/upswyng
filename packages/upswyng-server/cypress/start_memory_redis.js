#!/usr/bin/env node

/**
 * Sets up a redis instance for testing
 *
 * Writes two files to its directory:
 * .redispid contains the PID of the child process which should be killed once the test is complete.
 * .redisuri contains the connection string/uri of the instance
 */

/* eslint-disable */
const fs = require("fs");
const { spawn } = require("child_process");
const child = spawn("node", [`${__dirname}/start_memory_redis_impl.js`], {
  detached: true, // don't SIGHUP when the parent proc exits
  stdio: ["ignore", "pipe", "pipe"],
});

child.stderr.pipe(process.stderr);
child.stdout.on("data", chunk => {
  const pid = String(child.pid).trim();
  const uri = String(chunk).trim();
  const match = uri.match(
    /^CONNECTION_STRING=(?<connectionString>redis:\/\/.+\?)$/
  );
  if (!match) {
    console.error(`Invalid connection string: ${uri}`);
    process.exit(1);
  }
  const { connectionString } = match.groups;
  fs.writeFileSync(`${__dirname}/.redisuri`, connectionString);
  fs.writeFileSync(`${__dirname}/.redispid`, pid);

  console.info(`🎉 Started in-memory redis`);
  console.info(`PID:\t\t${pid}`);
  console.info(`Connection URI:\t${connectionString}`);
  
  // got data, maybe look at it to verify that it started up ok
  child.unref(); // let the process close normally
  process.exit(0);
});
