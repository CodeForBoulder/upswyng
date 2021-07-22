import { Job, JobsOptions, QueueEvents } from "bullmq";
import { TJobData, TJobResult } from "./workerTypes";

import { Server } from "http";
import { TCounts } from "./mq";
import WebSocket from "ws";
import mq from "./mq";
import { parse as parseRedisInfo } from "redis-info";

const { queue, getCounts, queueEvents } = mq;

const HEARTBEAT_INTERVAL_MS = 30000; // how often to ping clients to make sure they are connected
const REDIS_METRICS_BROADCAST_INTERVAL_MS = 15000;

export const statuses = mq.statuses;

export type TStatus = keyof typeof statuses;

export interface TJob<D = TJobData, R = TJobResult> {
  attemptsMade: number;
  data: D;
  failedReason?: string;
  finishedOn?: Date;
  id: string;
  name: string;
  opts: JobsOptions;
  processedOn?: Date;
  progress: number | object;
  returnValue: R | null;
  stackTrace: string;
  status: TStatus | "unknown";
  timestamp: Date;
}

interface TRedisMetrics {
  total_system_memory?: string;
  redis_version?: string;
  used_memory?: string;
  mem_fragmentation_ratio?: string;
  connected_clients?: string;
  blocked_clients?: string;
}

const desiredMetrics: (keyof TRedisMetrics)[] = [
  "redis_version",
  "used_memory",
  "mem_fragmentation_ratio",
  "connected_clients",
  "blocked_clients",
];

interface TMessageCounts {
  kind: "message_counts";
  data: { counts: TCounts };
}

interface TMessageRedisMetrics {
  kind: "redis_metrics";
  data: { metrics: TRedisMetrics };
}

interface TMessageJobs {
  kind: "jobs";
  timestamp: number;
  data: { jobs: TJob[]; eventName?: string };
}

interface TMessageProgress {
  kind: "progress";
  timestamp: number;
  data: { jobId: string; data: { progress: string } };
}

interface TMessageRemoved {
  kind: "removed";
  data: { jobIds: string[] };
}

export type TMessage =
  | TMessageRemoved
  | TMessageRedisMetrics
  | TMessageCounts
  | TMessageJobs
  | TMessageProgress;

/**
 * Directs the server to clean completed jobs from the queue
 */
interface TIncomingMessageCleanCompletedJobs {
  kind: "clean_completed_jobs";
}

/**
 * Remove the job with the `jobId` provided from the queues
 */
interface TIncomingMessageRemoveJob {
  kind: "remove_job";
  data: { jobId: string };
}

/**
 * Directive to the server to retry a failed job
 */
interface TIncomingMessageRetryJob {
  kind: "retry_job";
  data: { jobId: string };
}

/**
 * Directive to the server to retry all failed jobs
 */
interface TIncomingMessageRetryAllFailedJobs {
  kind: "retry_all_failed_jobs";
}

/**
 * Messages from clients back to the server
 */
export type TIncomingMessage =
  | TIncomingMessageCleanCompletedJobs
  | TIncomingMessageRemoveJob
  | TIncomingMessageRetryJob
  | TIncomingMessageRetryAllFailedJobs;

/**
 * Query Redis for the basic parameters about itself. Graciously borrowed from:
 * https://github.com/vcapretz/bull-board/blob/master/src/routes/queues.ts
 */
async function getRedisMetrics(q: QueueEvents): Promise<TRedisMetrics> {
  const redisClient = await q.client;
  const redisInfoRaw = await redisClient.info();
  const redisInfo: Record<string, any> = parseRedisInfo(redisInfoRaw);

  const validMetrics: TRedisMetrics = desiredMetrics.reduce(
    (acc: Record<string, any>, metric) => {
      if (redisInfo[metric]) {
        acc[metric] = redisInfo[metric];
      }
      return acc;
    },
    {}
  );

  // eslint-disable-next-line @typescript-eslint/camelcase
  validMetrics.total_system_memory =
    redisInfo.total_system_memory || redisInfo.maxmemory;

  return validMetrics;
}

function sendRedisMetrics(ws: WebSocket, metrics: TRedisMetrics) {
  const message: TMessageRedisMetrics = {
    kind: "redis_metrics",
    data: { metrics },
  };
  ws.send(JSON.stringify(message));
}

function sendCounts(ws: WebSocket, counts: TCounts) {
  const message: TMessageCounts = {
    kind: "message_counts",
    data: { counts },
  };
  ws.send(JSON.stringify(message));
}

async function jobToTJob(j: Job): Promise<TJob> {
  {
    const status = await j.getState();
    const jobJson = j.asJSON();
    const result = {
      ...jobJson,
      status,
      opts: JSON.parse(jobJson.opts),
      data: JSON.parse(jobJson.data) as TJobData,
      returnValue: jobJson.returnvalue
        ? JSON.parse(jobJson.returnvalue)
        : undefined,
      stackTrace: JSON.parse(jobJson.stacktrace),
      finishedOn:
        typeof jobJson.finishedOn === "number"
          ? new Date(jobJson.finishedOn)
          : undefined,
      processedOn:
        typeof jobJson.processedOn === "number"
          ? new Date(jobJson.processedOn)
          : undefined,
      timestamp:
        typeof jobJson.timestamp === "number"
          ? new Date(jobJson.timestamp)
          : undefined,
    };
    delete result.returnvalue;
    delete result.stacktrace;
    return result;
  }
}

async function getAllJobs(): Promise<TJob[]> {
  const jobs = await queue.getJobs(Object.keys(statuses));
  return Promise.all(jobs.map(jobToTJob));
}

async function getTJobById(jobId: string): Promise<TJob> {
  const job = await queue.getJob(jobId);
  return jobToTJob(job);
}

function sendJobs(
  ws: WebSocket,
  timestamp: number,
  jobs: TJob[],
  eventName?: string
) {
  ws.send(
    JSON.stringify({ kind: "jobs", timestamp, data: { jobs, eventName } })
  );
}

function sendProgress(
  ws: WebSocket,
  timestamp: number,
  jobId: string,
  progress: number
) {
  ws.send(
    JSON.stringify({ kind: "progress", timestamp, data: { jobId, progress } })
  );
}

function sendRemoved(ws: WebSocket, jobIds: string[]) {
  ws.send(JSON.stringify({ kind: "removed", data: { jobIds } }));
}

/**
 * Connects to the Redis Instance via BullMQ and sets up a web socket server to serve data
 * about the stats and events appening in the BullMQ Job Queue.
 */
export default function(server: Server): void {
  const wss = new WebSocket.Server({
    server,
  });

  function broadcast(f: (ws: WebSocket) => any) {
    wss.clients.forEach(f);
  }

  wss.on("connection", async (ws: WebSocket & { isAlive: boolean }) => {
    // Setup Heartbeat. See: https://www.npmjs.com/package/ws#how-to-detect-and-close-broken-connections
    ws.isAlive = true;
    ws.on("pong", () => {
      ws.isAlive = true;
    });

    // Handle Incoming Messages from Clients
    ws.on("message", async (m: string) => {
      const d: TIncomingMessage = JSON.parse(m);
      if (!d.kind) {
        console.warn(`Received an incoming message with no kind: ${d}`);
        return;
      }

      switch (d.kind) {
        case "clean_completed_jobs":
          queue.clean(0, Infinity, "completed");
          break;
        case "remove_job":
          {
            const j = await queue.getJob(d.data.jobId);
            if (j) {
              await j.remove();
            } else {
              console.warn(
                `Received a 'remove_job' message but couldn't find job. Message: ${d}`
              );
            }
          }
          // "removed" event fires
          break;
        case "retry_job":
          {
            const j = await queue.getJob(d.data.jobId);
            if (j) {
              try {
                await j.retry();
              } catch (e) {
                console.error(
                  `There was a problem retrying job ${d.data.jobId}: ${e}`
                );
              }
            } else {
              console.warn(
                `Received a 'retry_job' message but couldn't find job. Message: ${d}`
              );
            }
          }
          // Expect to fire an "active" or "waiting" event
          break;
        case "retry_all_failed_jobs":
          {
            const jobs = await queue.getJobs(["failed"]);
            jobs.forEach(job => job.retry());
          }
          break;
      }
    });

    // send over metrics, counts, and jobs on initial connection
    try {
      sendRedisMetrics(ws, await getRedisMetrics(queueEvents));
    } catch (e) {
      console.error(`Error fetching and sending redis metrics: ${e}`);
    }

    try {
      sendCounts(ws, await getCounts());
    } catch (e) {
      console.error(`Error getting and sending queue counts: ${e}`);
    }

    try {
      sendJobs(ws, /* bogus timestamp */ 0, await getAllJobs());
    } catch (e) {
      console.error(`Error getting and sending all jobs: ${e}`);
    }
  });

  // event  -  who    -    args
  // waiting   Queue       Job
  // cleaned   Queue       JobID[]
  // active    QEvents     { event: 'active', jobId: '5e32969eb9dcea0e4fa73ef1', prev: 'waiting' } <ts> 1580373686472-0
  // completed QEvents     { event: 'completed', jobId: '5e32969eb9dcea0e4fa73ef1', returnvalue: { kind: 'test' }} <ts>
  // progress  QEvents     { event: 'progress', jobId: '5e32969eb9dcea0e4fa73ef1', data: 2 } <ts>
  // failed    QEvents     { event: 'failed', jobId: 'akje43fwjhaanfwkefnaaef', failedReason: string (error.message) }, <ts>
  // drained   QEvents     { event: 'drained' }, <ts>
  // stalled   QEvents     { event: 'stalled', jobId: '5e34bb8cde649f8dcc27f484' }, <ts>
  // delayed   QEvents     { event: 'delayed', jobId: '5e354983af70e5a2c3725b4d', delay: '1580550551357' }, <ts>

  ["active", "completed", "delayed", "failed", "waiting"].forEach(eventName => {
    queueEvents.on(
      eventName,
      async (data: { jobId: string }, timestamp: string) => {
        const j = await getTJobById(data.jobId);
        broadcast(async ws => {
          sendJobs(ws, parseInt(timestamp, 10), [j], eventName);
          sendCounts(ws, await getCounts());
        });
      }
    );
  });

  queueEvents.on(
    "progress",
    async (
      { jobId, data: progress }: { jobId: string; data: number },
      timestamp: string
    ) => {
      broadcast(ws =>
        sendProgress(ws, parseInt(timestamp, 10), jobId, progress)
      );
    }
  );

  queue.on("cleaned", (jobIds: string[]) =>
    broadcast(async ws => {
      sendRemoved(ws, jobIds);
      sendCounts(ws, await getCounts());
    })
  );

  queue.on("removed", (job: Job) =>
    broadcast(async ws => {
      sendRemoved(ws, [job.id]);
      sendCounts(ws, await getCounts());
    })
  );

  // Heartbeat keep-alive
  setInterval(() => {
    wss.clients.forEach((ws: WebSocket & { isAlive: boolean }) => {
      if (ws.isAlive === false) return ws.terminate();

      ws.isAlive = false;
      ws.ping(() => {}); // eslint-disable-line @typescript-eslint/no-empty-function
    });
  }, HEARTBEAT_INTERVAL_MS);

  // Redis metrics periodic broadcast
  setInterval(() => {
    wss.clients.forEach(async (ws: WebSocket & { isAlive: boolean }) => {
      try {
        sendRedisMetrics(ws, await getRedisMetrics(queueEvents));
      } catch (e) {
        console.error(`Error fetching and sending redis metrics: ${e}`);
      }
    });
  }, REDIS_METRICS_BROADCAST_INTERVAL_MS);
}
