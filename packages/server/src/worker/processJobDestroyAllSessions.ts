import {
  JobKind,
  TJobDestroyAllSessionsData,
  TJobDestroyAllSessionsResult,
} from "./workerTypes";

import { Job } from "bullmq";
import mongoose from "mongoose";

/**
 * Wipes all the user sessions from the mongodb collection
 */
export async function processJobDestroyAllSessions(
  job: Job<TJobDestroyAllSessionsData, TJobDestroyAllSessionsResult>,
  connection: mongoose.Connection
) {
  const result = await connection.db.dropCollection("sessions");
  if (result) {
    await job.updateProgress(100);
    return {
      kind: JobKind.DestroyAllSessions,
    };
  } else {
    throw new Error(`Failed to remove sessions`);
  }
}
