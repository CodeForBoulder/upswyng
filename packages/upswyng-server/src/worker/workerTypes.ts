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

/**
 * Check the links in the Resource directory for broken URLs
 */
export interface TJobCheckLinksData {
  kind: "check_links";
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
  kind: "check_links";
}

export type TJobData = TJobCheckLinksData | TJobTestData;
export type TJobResult = TJobCheckLinksResult | TJobTestResult;
