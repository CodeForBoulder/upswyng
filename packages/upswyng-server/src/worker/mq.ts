/**
 * Javascript interface to the BullMQ queue.
 */

import * as dotenv from "dotenv";

import { Job, Queue, QueueEvents, QueueScheduler } from "bullmq";
import {
  TJobCheckLinksData,
  TJobData,
  TJobTestData,
  TJobTestResult,
} from "./workerTypes";

import { ObjectID } from "bson";
import { TJobCheckLinksResult } from "packages/upswyng-server/__build__/worker/workerTypes";
import getName from "@afuggini/namegenerator";
import parseRedisUrl from "../utility/parseRedisUrl";

dotenv.config();

const statuses = {
  active: null,
  completed: null,
  delayed: null,
  failed: null,
  paused: null,
  waiting: null,
};

const { REDIS_URL, WORKER_JOB_QUEUE_NAME, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const queueName = WORKER_JOB_QUEUE_NAME || "upswyng-test-queue";

if (dev && queueName.toLowerCase().includes("prod")) {
  throw new Error(
    "💩 You're attempting to use the production worker queue in a dev enviroment."
  );
}

export type TCounts = { [K in keyof typeof statuses]: number };

const connection = parseRedisUrl(REDIS_URL || "redis://localhost:6379");

let queueEvents: QueueEvents;
let queue: Queue<TJobData>;
try {
  queueEvents = new QueueEvents(queueName, { connection });
} catch (e) {
  console.error(`Error creating QueueEvents: ${e}`);
}

try {
  queue = new Queue<TJobData>(queueName, { connection });
} catch (e) {
  console.error(`Error creating Queue: ${e}`);
}

try {
  new QueueScheduler(queueName, { connection });
} catch (e) {
  console.error(`Error creating Queue Scheduler: ${e}`);
}

const getCounts = async (): Promise<TCounts> => {
  const counts = await queue.getJobCounts(...Object.keys(statuses));
  return counts as TCounts;
};

async function addJobTest(
  name: string = getName("-"),
  delayMs: number = 0,
  shouldFail = false,
  userId: string = null
): Promise<Job<TJobTestData, TJobTestResult>> {
  return queue.add(
    name,
    { kind: "test", shouldFail, userId },
    {
      priority: 1,
      jobId: new ObjectID().toHexString(),
      delay: delayMs,
    }
  );
}

async function addJobCheckLinks(
  name: string = getName("-"),
  userId
): Promise<Job<TJobCheckLinksData, TJobCheckLinksResult>> {
  return queue.add(
    name,
    { kind: "check_links", userId },
    {
      priority: 2,
      jobId: new ObjectID().toHexString(),
    }
  );
}

const mq = {
  addJobCheckLinks,
  addJobTest,
  connection,
  getCounts,
  queue,
  queueEvents,
  queueName,
  statuses,
};

Object.freeze(mq);
export default mq;
