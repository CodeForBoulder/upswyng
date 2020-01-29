/**
 * Javascript interface to the BullMQ queue.
 */

import * as dotenv from "dotenv";

import { Job, Queue, QueueEvents, QueueScheduler } from "bullmq";
import { TJobData, TJobTestData, TJobTestResult } from "@upswyng/upswyng-types";

import { ObjectID } from "bson";
import getName from "@afuggini/namegenerator";

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

export function parseRedisUrl(
  x: string
): { port: number; host: string; username?: string; password?: string } {
  // see spec at: https://www.iana.org/assignments/uri-schemes/prov/redis

  // ex: redis://h:aehflaiesupasswordhfliasdf@sub.domain.com:12345
  const longPatternMatch = x.match(
    /rediss?:\/\/(?<username>\w*):(?<password>\w+)@(?<host>.*):(?<port>[0-9]+)/
  );
  if (longPatternMatch) {
    return {
      host: longPatternMatch.groups.host,
      password: longPatternMatch.groups.password,
      port: parseInt(longPatternMatch.groups.port, 10),
      username: longPatternMatch.groups.username,
    };
  }

  // ex: redis://10.3.2.1:2222
  const shortPatternMatch = x.match(/rediss?:\/\/(?<host>.+):(?<port>[0-9]+)/);
  if (shortPatternMatch) {
    return {
      host: shortPatternMatch.groups.host,
      port: parseInt(shortPatternMatch.groups.port, 10),
    };
  }

  throw new Error(`Could not parse redis url: ${x}`);
}

const connection = parseRedisUrl(REDIS_URL);

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

const addJobTest = async (
  name: string = getName("-"),
  delayMs: number = 0,
  shouldFail = false
): Promise<Job<TJobTestData, TJobTestResult>> =>
  queue.add(
    name,
    { kind: "test", shouldFail },
    {
      priority: 1,
      jobId: new ObjectID().toHexString(),
      delay: delayMs,
    }
  );

const mq = {
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
