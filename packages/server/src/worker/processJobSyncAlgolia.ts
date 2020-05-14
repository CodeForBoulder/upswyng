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

  let succeeded = false;
  // TODO - Jeremiah T - make data gathering pro - https://github.com/CodeForBoulder/upswyng/pull/365#discussion_r424262740
  Resource.find({})
    .then(resourceDocuments =>
      Promise.all(resourceDocuments.map(resourceDocumentToResource))
    )
    .catch(error => {
      throw error;
    })
    .then(resources => {
      job.updateProgress(50);
      console.info(
        `${job.name}[${job.id}]\t: Resources have been successfully retrieved from the database. Preparing ${resources.length} resources as Algolia Records`
      );

      const updatedAlgoliaIndex = resources.reduce(
        (
          container,
          { resourceId, name, description, subcategories, deleted }
        ) => {
          const resourceIndex = {
            objectID: resourceId,
            name,
            description,
            subcategories: subcategories.map(s => s.name).join(","),
          };

          deleted
            ? {
                toUpdate: container.toUpdate,
                toDelete: [...container.toDelete, resourceIndex.objectID],
              }
            : {
                toUpdate: [...container.toUpdate, resourceIndex],
                toDelete: container.toDelete,
              };

          return container;
        },
        {
          toUpdate: [] as TAlgoliaHit[],
          toDelete: [] as string[],
        }
      );

      job.updateProgress(75);
      console.info(
        `${job.name}[${job.id}]\t: Algolia Records have been prepared. ${updatedAlgoliaIndex.toUpdate.length} records will be updated and ${updatedAlgoliaIndex.toDelete.length} records will be deleted. Synchronizing Algolia Index...`
      );

      return Promise.all([
        index.deleteObjects(updatedAlgoliaIndex.toDelete),
        index.saveObjects(updatedAlgoliaIndex.toUpdate),
      ]);
    })
    .then(() => {
      succeeded = true;
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
    succeeded,
  };
}
