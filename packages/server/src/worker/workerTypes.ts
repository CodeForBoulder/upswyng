/**
 * Type definitions for server worker jobs.
 */

/**
 * Represents each kind of task the worker can execute
 */
export enum JobKind {
  CheckLinks = "check_links", // visit the websites listed in Resources and check for broken URLs
  CheckNewAlerts = "check_new_alerts", // look for alerts whose start time has come and process them
  DestroyAllSessions = "destroy_all_sessions", // wipes all the user sessions from the mongodb collection
  Test = "test", // no-op job used for testing the worker/queue
  SyncAlgolia = "sync_algolia", // update algolia index with latest resources
}

// DestroyAllSessions
// wipes all the user sessions from the mongodb collection
export interface TJobDestroyAllSessionsData {
  kind: JobKind.DestroyAllSessions;
  userId?: string; // _id of user who started this job
}

export interface TJobDestroyAllSessionsResult {
  kind: JobKind.DestroyAllSessions;
}

// Test Job
export interface TJobTestData {
  kind: JobKind.Test;
  userId?: string; // _id of user who started this job
  shouldFail?: boolean; // force this job to fail at some point
}

export interface TJobTestResult {
  kind: JobKind.Test;
}

/**
 * Check for alerts that have recently become active. Log an event/send a message
 * to Slack, and push the notification out to clients.
 */
export interface TJobCheckNewAlertsData {
  kind: JobKind.CheckNewAlerts;
  userId: string; // _id of user who initiated the job
}

export interface TJobCheckNewAlertsResult {
  kind: JobKind.CheckNewAlerts;
  alertsProcessed: string[];
  jobName: string;
}

/**
 * Check the links in the Resource directory for broken URLs
 */
export interface TJobCheckLinksData {
  kind: JobKind.CheckLinks;
  userId: string; // _id of user who initiated the job
}
export interface TJobCheckLinksResult {
  erroredLinks: {
    accessTime: Date;
    resourceId: string;
    status: number | null;
    statusText: string;
    url: string;
  }[];
  linksCheckedCount: number;
  jobName: string;
  kind: JobKind.CheckLinks;
}

/**
 *  Update algolia index with latest resources
 */
export interface TJobSyncAlgoliaData {
  kind: JobKind.SyncAlgolia;
  userId: string; // _id of user who started this job
}
export interface TJobSyncAlgoliaResult {
  kind: JobKind.SyncAlgolia;
  jobName: string;
  succeeded: boolean;
  deletedRecords: string[];
  insertedRecords: string[];
}

export type TJobData =
  | TJobCheckLinksData
  | TJobCheckNewAlertsData
  | TJobDestroyAllSessionsData
  | TJobTestData
  | TJobSyncAlgoliaData;
export type TJobResult =
  | TJobCheckLinksResult
  | TJobCheckNewAlertsResult
  | TJobDestroyAllSessionsResult
  | TJobTestResult
  | TJobSyncAlgoliaResult;
