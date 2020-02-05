import Resource, { resourceDocumentToResource } from "../models/Resource";
import { TJobCheckLinksData, TJobCheckLinksResult } from "./workerTypes";

import { Job } from "bullmq";
import { TResource } from "@upswyng/upswyng-types/src";
import axios from "axios";

/**
 * Go through `Resource`s and check the URL in the `website` field
 * to ensure its validity
 */
export async function processesJobCheckLinks(
  job: Job<TJobCheckLinksData, TJobCheckLinksResult>
): Promise<TJobCheckLinksResult> {
  const BATCH_SIZE = 5;

  const estimatedResourceCount = await Resource.estimatedDocumentCount();
  let batch = 0;
  let linksCheckedCount = 0;
  let erroredLinks = [];

  console.info(
    `${job.name}[${job.id}]\tEstimated resource count: ${estimatedResourceCount}`
  );

  let resources: TResource[] = [];
  do {
    console.info(`${job.name}[${job.id}]\tStarting batch ${batch}`);
    resources = (
      await Resource.find({})
        .skip(batch * BATCH_SIZE)
        .limit(BATCH_SIZE)
    ).map(resourceDocumentToResource);
    batch++;

    const newErroredLinks = (
      await Promise.all(
        resources.map(async resource => {
          console.info(
            `${job.name}[${job.id}]\tChecking resource ${resource.name}[${resource.resourceId}]`
          );
          if (resource.website) {
            // Axios is angry when there is no protocol before the site
            const url =
              resource.website.indexOf("http") === 0
                ? resource.website
                : `https://${resource.website}`;
            try {
              await axios.get(url, {
                maxRedirects: 20,
                timeout: 5000,
              });
            } catch (e) {
              // Axios throws even if http operation was successful,
              // i.e. successful operation but 404 status
              let result = {
                resourceId: resource.resourceId,
                accessTime: new Date(),
                url: resource.website,
              } as any;
              if (e.code) {
                result = { ...result, statusText: e.code };
              } else if (e.response) {
                result = {
                  ...result,
                  statusText: e.response.statusText,
                  status: e.response.status,
                };
              }
              return result;
            }
          }
        })
      )
    ).filter(Boolean);

    linksCheckedCount += resources.length;
    console.info(
      `${job.name}[${job.id}]\tLinks checked count: ${linksCheckedCount}`
    );
    erroredLinks = [...erroredLinks, ...newErroredLinks];
    job.updateProgress((linksCheckedCount / estimatedResourceCount) * 100); // TODO: Persist the resources we have already looked at
  } while (resources.length);
  job.updateProgress(100);

  return {
    erroredLinks,
    jobName: job.name,
    kind: "check_links",
    linksCheckedCount,
  };
}
