/**
 * Example worker job processor; doesn't actually do anything
 */
import { JobKind, TJobTestData, TJobTestResult } from "./workerTypes";

import { Job } from "bullmq";
import { sleep } from "../worker";

export async function processJobTest(
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
    await job.updateProgress(Math.min(progress, 100));
  }
  // A job can return values that will be stored in Redis as JSON
  // This return value is unused in this demo application.
  return { kind: JobKind.Test };
}
