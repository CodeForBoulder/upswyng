/**
 * Node app which executes jobs separate from the server.
 */

import * as dotenv from "dotenv";

import { Job, Queue, Worker } from "bullmq";
import { TJobData, TJobResult } from "@upswyng/upswyng-types";

import IORedis from "IORedis";
import throng from "throng";

dotenv.config();

const { REDIS_URL } = process.env;
const connection = new IORedis(REDIS_URL);

// Spin up multiple processes to handle jobs to take advantage of more CPU cores
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
const workers = process.env.WEB_CONCURRENCY || 2;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function start() {
  // TODO: Change queue name to an ENV var
  const queue = new Queue<TJobData>("upswyng-jobs", { connection });
  const worker = new Worker<TJobData>(
    "upswyng-jobs",
    async (job: Job<TJobData, TJobResult>) => {
      // This is an example job that just slowly reports on progress
      // while doing no work. Replace this with your own job logic.
      let progress = 0;

      // throw an error 5% of the time
      if (Math.random() < 0.05) {
        throw new Error("This job failed!");
      }

      while (progress < 100) {
        await sleep(50);
        progress += 1;
        job.updateProgress(progress);
      }

      // A job can return values that will be stored in Redis as JSON
      // This return value is unused in this demo application.
      return { value: "test job complete" };
    },
    { connection }
  );

  worker.on("completed", job => {
    console.log(`${job.id} has completed!`);
    console.log(JSON.stringify(job, null, 2));
  });

  worker.on("failed", (job, err) => {
    console.log(`${job.id} has failed with ${err.message}`);
  });

  worker.on("progress", (job, progress) => {
    console.log(`${job.id} progresses: ${progress}`);
  });

  await queue.add("testjerb", { kind: "update_algolia" });
  await sleep(20000);
  await queue.add("testjerb2", { kind: "update_algolia" });
}

// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
throng({ workers, start });
