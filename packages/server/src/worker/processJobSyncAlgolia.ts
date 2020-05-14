import {
  JobKind,
  TJobSyncAlgoliaData,
  TJobSyncAlgoliaResult,
} from "./workerTypes";
import Resource, { resourceDocumentToResource } from "../models/Resource";
import { TAlgoliaHit, TResource } from "@upswyng/types";

import { Job } from "bullmq";
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
  const BATCH_SIZE = 200;

  const estimatedResourceCount = await Resource.estimatedDocumentCount();
  let batch = 0;
  let succeeded = false;
  let deletedRecords: string[] = [];
  let insertedRecords: string[] = [];

  // Initialize Algolia project and project index
  const algolia = algoliaSearch(algoliaAppId, algoliaWriteApiKey);
  const index = algolia.initIndex(algoliaIndexName);
  console.info(
    `${job.name}[${job.id}]\t: Algolia connection has been established. Preparing about ${estimatedResourceCount} resources as Algolia Records`
  );

  // Update (<= BATCH_SIZE) records at a time until resources are exhausted
  let resources: TResource[] = [];
  do {
    console.info(`${job.name}[${job.id}]\tStarting batch ${batch}`);
    resources = await Promise.all(
      (
        await Resource.find({})
          .skip(batch * BATCH_SIZE)
          .limit(BATCH_SIZE)
      ).map(resourceDocumentToResource)
    );
    succeeded = false;
    batch++;

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

    console.info(
      `${job.name}[${job.id}]\t: Algolia Records have been prepared. ${updatedAlgoliaIndex.toUpdate.length} records will be updated and ${updatedAlgoliaIndex.toDelete.length} records will be deleted. Synchronizing Algolia Index...`
    );
    try {
      await Promise.all([
        index.deleteObjects(updatedAlgoliaIndex.toDelete),
        index.saveObjects(updatedAlgoliaIndex.toUpdate),
      ]);
      succeeded = true;
      deletedRecords = [...deletedRecords, ...updatedAlgoliaIndex.toDelete];
      insertedRecords = [
        ...insertedRecords,
        ...updatedAlgoliaIndex.toUpdate.map(r => r.objectID),
      ];
    } catch (error) {
      throw error;
    }

    job.updateProgress((resources.length / estimatedResourceCount) * 100);
  } while (resources.length);
  job.updateProgress(100);

  return {
    kind: JobKind.SyncAlgolia,
    jobName: job.name,
    succeeded,
    deletedRecords,
    insertedRecords,
  };
}
