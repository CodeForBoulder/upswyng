/**
 * Node app which executes jobs separate from the server.
 */

import * as dotenv from "dotenv";

import { Job, Worker } from "bullmq";
import {
  JobKind,
  TJobCheckLinksData,
  TJobCheckLinksResult,
  TJobCheckNewAlertsData,
  TJobCheckNewAlertsResult,
  TJobDestroyAllSessionsData,
  TJobDestroyAllSessionsResult,
  TJobSyncAlgoliaData,
  TJobSyncAlgoliaResult,
} from "./worker/workerTypes";
import {
  TJobData,
  TJobResult,
  TJobTestData,
  TJobTestResult,
} from "./worker/workerTypes";

import mongoose from "mongoose";
import mq from "./worker/mq";
import { processJobCheckLinks } from "./worker/processJobCheckLinks";
import { processJobCheckNewAlerts } from "./worker/processJobCheckNewAlerts";
import { processJobDestroyAllSessions } from "./worker/processJobDestroyAllSessions";
import { processJobSyncAlgolia } from "./worker/processJobSyncAlgolia";
import { processJobTest } from "./worker/processJobTest";
import throng from "throng";

dotenv.config();

const {
  DATABASE_URL,
  DATABASE_PASSWORD,
  DATABASE_USER,

  ALGOLIA_APP_ID,
  ALGOLIA_WRITE_API_KEY,
  ALGOLIA_INDEX_NAME,
} = process.env;

mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    user: DATABASE_USER,
    pass: DATABASE_PASSWORD,
  })
  .then(
    () => console.log(`Connected to MongoDB instance at ${DATABASE_URL}`),
    e =>
      console.log(
        `There was an error connecting to the MongoDB instance at ${DATABASE_URL}:\n${e}`
      )
  )
  .catch(error => {
    throw new Error("Error when importing resources into Algolia:\n" + error);
  });

const { queueName, connection } = mq;

// Spin up multiple processes to handle jobs to take advantage of more CPU cores
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
const workers = process.env.WEB_CONCURRENCY || 2;

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function start() {
  const worker = new Worker<TJobData>(
    queueName,
    async (job: Job<TJobData, TJobResult>) => {
      switch (job.data.kind) {
        case JobKind.CheckLinks:
          return processJobCheckLinks(
            job as Job<TJobCheckLinksData, TJobCheckLinksResult>
          );
        case JobKind.CheckNewAlerts:
          return processJobCheckNewAlerts(
            job as Job<TJobCheckNewAlertsData, TJobCheckNewAlertsResult>
          );
        case JobKind.DestroyAllSessions:
          return processJobDestroyAllSessions(
            job as Job<
              TJobDestroyAllSessionsData,
              TJobDestroyAllSessionsResult
            >,
            mongoose.connection
          );
        case JobKind.Test:
          return processJobTest(job as Job<TJobTestData, TJobTestResult>);
        case JobKind.SyncAlgolia:
          return processJobSyncAlgolia(
            job as Job<TJobSyncAlgoliaData, TJobSyncAlgoliaResult>,
            ALGOLIA_APP_ID,
            ALGOLIA_INDEX_NAME,
            ALGOLIA_WRITE_API_KEY
          );
        default:
          // TODO: Implement other jobs and then put an exhaustive requirement here
          throw new Error("unimplemented");
      }
    },
    { connection }
  );

  worker.on("active", job => {
    console.info(`${job.name}[${job.id}]\tstarted being processed`);
  });

  worker.on("completed", job => {
    console.info(`${job.name}[${job.id}]\tcompleted`);
  });

  worker.on("failed", (job, err) => {
    console.info(`${job.name}[${job.id}]\tfailed: ${err.message}`);
  });
}

// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
throng({ workers, start });
