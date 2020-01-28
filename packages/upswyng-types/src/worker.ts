/**
 * Type definitions for server worker jobs.
 */

/**
 * Update Alolia
 */
export interface TJobUpdateAlgoliaData {
  kind: "update_algolia";
}
export interface TJobUpdateAlgoliaResult {
  createdAt: string;
  kind: "update_algolia";
  objectID?: string;
  taskID: number;
}

export type TJobData = TJobUpdateAlgoliaData /* | TJobNexJobData */;
export type TJobResult = TJobUpdateAlgoliaResult;
