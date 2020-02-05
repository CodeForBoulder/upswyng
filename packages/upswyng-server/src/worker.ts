/**
 * Node app which executes jobs separate from the server.
 */

import * as dotenv from "dotenv";

import { Job, Worker } from "bullmq";
import { TJobCheckLinksData, TJobCheckLinksResult } from "./worker/workerTypes";
import {
  TJobData,
  TJobResult,
  TJobTestData,
  TJobTestResult,
} from "./worker/workerTypes";

import mongoose from "mongoose";
import mq from "./worker/mq";
import { processesJobCheckLinks } from "./worker/processJobCheckLinks";
import throng from "throng";

dotenv.config();

const {
  DATABASE_URL,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_USER,
} = process.env;

mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    dbName: DATABASE_NAME,
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function processesTestJob(
  job: Job<TJobTestData, TJobTestResult>
): Promise<TJobTestResult> {
  // This is an example job that just slowly reports on progress
  // while doing no work. Replace this with your own job logic.
  let progress = 0;

  while (progress < 100) {
    if (Math.random() < 0.055) {
      throw new Error(`Job failed ${progress}% of the way through`);
    }
    await sleep(Math.random() * 5000);
    progress += Math.random() * 30;
    if (progress >= 100 && job.data.shouldFail) {
      throw new Error(`Forced job to fail at ${progress}%`);
    }
    job.updateProgress(Math.min(progress, 100));
  }

  // A job can return values that will be stored in Redis as JSON
  // This return value is unused in this demo application.
  return { kind: "test" };
}

async function start() {
  const worker = new Worker<TJobData>(
    queueName,
    async (job: Job<TJobData, TJobResult>) => {
      switch (job.data.kind) {
        case "check_links":
          return await processesJobCheckLinks(
            job as Job<TJobCheckLinksData, TJobCheckLinksResult>
          );
        case "test":
          return await processesTestJob(
            job as Job<TJobTestData, TJobTestResult>
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
