/**
 * Type definitions for server worker jobs.
 */

// Test Job
export interface TJobTestData {
  kind: "test";
  userId?: string; // _id of user who started this job
  shouldFail?: boolean; // force this job to fail at some point
}

export interface TJobTestResult {
  kind: "test";
}

// Update Algolia
export interface TJobUpdateAlgoliaData {
  kind: "update_algolia";
}
export interface TJobUpdateAlgoliaResult {
  createdAt: string;
  kind: "update_algolia";
  objectID?: string;
  taskID: number;
}

export type TJobData = TJobUpdateAlgoliaData | TJobTestData;
export type TJobResult = TJobUpdateAlgoliaResult | TJobTestResult;
