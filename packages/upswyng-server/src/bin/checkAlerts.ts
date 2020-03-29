/**
 * Standalone script to add a "Check New Alerts" job to the Worker queue.
 *
 * Transpiled with the config in `bin.rollup.config.js` to `upswyng/packages/upswyng-server/__build__/bin/check_alerts`.
 */
import * as dotenv from "dotenv";

import mq from "../worker/mq";

const { addJobCheckNewAlerts } = mq;

dotenv.config();

const botUserId = process.env.BOT_USER_ID;

if (!botUserId) {
  console.error(
    "No bot user ID provided. Provide the ID as the BOT_USER_ID env variable."
  );
  process.exit(1);
}

addJobCheckNewAlerts(undefined, botUserId)
  .then(() => {
    console.info("Created a check new alerts job");
    process.exit(0);
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
