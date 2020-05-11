import {
  JobKind,
  TJobSyncAlgoliaData,
  TJobSyncAlgoliaResult,
} from "./workerTypes";
import Resource, { resourceDocumentToResource } from "../models/Resource";

import { Job } from "bullmq";
import { TAlgoliaHit } from "@upswyng/types";
import algoliaSearch from "algoliasearch";

/**
 * Update our Algolia search index with current resource data
 */
export async function processJobSyncAlgolia(
  job: Job<TJobSyncAlgoliaData, TJobSyncAlgoliaResult>,
  algoliaAppId: string,
  algoliaIndexName: string,
  algoliaWriteApiKey: string
): Promise<TJobSyncAlgoliaResult> {
  console.info(`${job.name}[${job.id}]\t: Syncing Resources to Algolia`);

  // Initialize Algolia project and project index
  const algolia = algoliaSearch(algoliaAppId, algoliaWriteApiKey);
  const index = algolia.initIndex(algoliaIndexName);
  console.info(
    `${job.name}[${job.id}]\t: Algolia connection has been established`
  );
  job.updateProgress(25);

  let wasUpdated = false;
  wasUpdated = await Resource.getAll()
    .then(resourceDocuments =>
      Promise.all(resourceDocuments.map(resourceDocumentToResource))
    )
    .then(resources => {
      job.updateProgress(50);
      console.info(
        `${job.name}[${job.id}]\t: Resources have been successfully retrieved from the database. Preparing ${resources.length} resources as Algolia Records`
      );

      const updatedAlgoliaIndex = resources.map(
        ({ resourceId, name, description, subcategories }): TAlgoliaHit => ({
          objectID: resourceId,
          name,
          description,
          subcategories: subcategories.map(s => s.name).join(","),
        })
      );
      job.updateProgress(75);
      console.info(
        `${job.name}[${job.id}]\t: Algolia Records have been prepared. Synchronizing Algolia Index...`
      );

      return index.saveObjects(updatedAlgoliaIndex);
    })
    .then(() => {
      return true;
    })
    .catch(error => {
      throw error;
    })
    .finally(() => {
      job.updateProgress(100);
    });

  return {
    kind: JobKind.SyncAlgolia,
    jobName: job.name,
    wasUpdated,
  };
}
