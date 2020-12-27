import { TUser } from "@upswyng/types";
import getName from "@afuggini/namegenerator";
import handleCommandFromSlack from "../../../utility/handleCommandFromSlack";
import mq from "../../../worker/mq";

async function makeSyncAlgoliaJob(_req, res, _next, user: TUser) {
  const jobName = getName("-");
  mq.addJobSyncAlgolia(jobName, user._id);
  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `:globe_with_meridians: I'm *syncing Algolia* for you!`,
      },
    },
    {
      type: "section",
      text: {
        text: `Your job name is _${jobName}_`,
        type: "mrkdwn",
      },
    },
  ];
  const slackResponse = {
    response_type: "in_channel", // eslint-disable-line @typescript-eslint/camelcase
    blocks,
  };

  res.writeHead(200, { "Content-Type": "application/json" });
  return res.end(JSON.stringify(slackResponse));
}

/**
 * Adds 'syncAlgoliaIndex' to the queue. This job
 * ensures that our algolia index is in sync with our database.
 *
 * Can be called from slack command `/sync-algolia`.
 */
export async function post(req, res, next) {
  const { response_url: responseUrl } = req.body;

  if (responseUrl && responseUrl.includes("hooks.slack.com")) {
    return handleCommandFromSlack(req, res, next, makeSyncAlgoliaJob);
  }

  // For now, only allow this endpoint to be called from Slack
  res.writeHead(400, { "Content-Type": "application/json" });
  return res.end(
    JSON.stringify({
      message: "Tell upswyngbot /sync-algolia to run the Sync Algolia job",
    })
  );
}
