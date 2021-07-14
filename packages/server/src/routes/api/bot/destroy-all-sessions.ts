import { TUser } from "@upswyng/types";
import getName from "@afuggini/namegenerator";
import handleCommandFromSlack from "../../../utility/handleCommandFromSlack";
import mq from "../../../worker/mq";

async function makeJobDestroyAllSessions(_req, res, _next, user: TUser) {
  const jobName = getName("-");
  await mq.addJobDestroyAllSessions(jobName, user._id);
  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `:bomb: I'm *destroying all sessions* for you!`,
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
 * Adds a Destroy All Sessions job to the queue.
 *
 * Can be called from slack command `/destroy-all-sessions`.
 */
export async function post(req, res, next) {
  const { response_url: responseUrl } = req.body;

  if (responseUrl && responseUrl.includes("hooks.slack.com")) {
    return handleCommandFromSlack(req, res, next, makeJobDestroyAllSessions);
  }

  // For now, only allow this endpoint to be called from Slack
  res.writeHead(400, { "Content-Type": "application/json" });
  return res.end(
    JSON.stringify({
      message:
        "Tell upswyngbot /destroy-all-sessions to run the Destroy All Sessions job",
    })
  );
}
