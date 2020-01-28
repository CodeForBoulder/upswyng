export const JobKind = {
  /* eslint-disable @typescript-eslint/camelcase */
  update_algolia: null, // sync the algolia search index with our database
  /* eslint-enable @typescript-eslint/camelcase */
};
export type TJobKind = keyof typeof JobKind;

/**
 * Update Alolia
 */
export interface TJobUpdateAlgoliaData {
  kind: "update_algolia";
}
export interface TJobUpdateAlgoliaResult {
  taskID: number;
  createdAt: string;
  objectID?: string;
}

export type TJobData = TJobUpdateAlgoliaData /* | TJobNexJobData */;
export type TJobResult = TJobUpdateAlgoliaResult;
