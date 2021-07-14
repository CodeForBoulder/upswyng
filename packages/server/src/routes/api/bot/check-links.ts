import { TUser } from "@upswyng/types";
import getName from "@afuggini/namegenerator";
import handleCommandFromSlack from "../../../utility/handleCommandFromSlack";
import mq from "../../../worker/mq";

async function makeCheckLinksJob(_req, res, _next, user: TUser) {
  const jobName = getName("-");
  await mq.addJobCheckLinks(jobName, user._id);
  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `:link: I'm *checking the resource links* for you!`,
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
 * Adds a Check Links job to the queue. This job walks through
 * all the resources in the directory and checks if their respective
 * website URLs are valid
 *
 * Can be called from slack command `/check-links`.
 */
export async function post(req, res, next) {
  const { response_url: responseUrl } = req.body;

  if (responseUrl && responseUrl.includes("hooks.slack.com")) {
    return handleCommandFromSlack(req, res, next, makeCheckLinksJob);
  }

  // For now, only allow this endpoint to be called from Slack
  res.writeHead(400, { "Content-Type": "application/json" });
  return res.end(
    JSON.stringify({
      message: "Tell upswyngbot /check-links to run the Check Links job",
    })
  );
}
