import User, { userDocumentToUser } from "../models/User";

import { TUser } from "@upswyng/upswyng-types";
import forge from "node-forge";

/**
 * Verifies a `POST` route was called as a slack "slash command", then verifies that the user
 * who executed the slash command is an admin of UpSwyng. If both those check good, then runs `callback`.
 */
export default async function handleCommandFromSlack<R = any>(
  req,
  res,
  next,
  callback: (req, res, next, user: TUser) => R
): Promise<R | void> {
  // This ALLEGEDLY came from the slack bot. Verify the request.
  // https://api.slack.com/docs/verifying-requests-from-slack
  const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
  if (!slackSigningSecret) {
    throw new Error(
      "No Slack signing secret was provided in the `env` variables"
    );
  }
  const slackTimestamp = req.get("X-Slack-Request-Timestamp");

  // TODO: Right now Slack is on V0, but we should fetch this dynamically in case this changes
  const baseString = `v0:${slackTimestamp}:${req.rawBody}`;

  const hmac = forge.hmac.create();
  hmac.start("sha256", slackSigningSecret);
  hmac.update(baseString);

  const signatureAnswer = `v0=${hmac.digest().toHex()}`;
  const slackSignature = req.get("X-Slack-Signature");
  if (signatureAnswer !== slackSignature) {
    console.warn(
      `Received a request allegedly from Slack but with an incorrect signature:\n${JSON.stringify(
        req.body
      )}`
    );
    // do not respond to the bogus request
    return;
  }

  // Now that we know this is actually from our slack chat bot, see if the user making the request
  // is an authorized admin
  const { user_id: slackUserId } = req.body;
  if (!slackUserId) {
    // this shouldn't happen, as all requests from slack should have a user ID
    throw new Error("unreachable");
  }

  let user: TUser | null = null;
  try {
    user = userDocumentToUser(
      await User.findOne({ "slack.userId": slackUserId })
    );
  } catch (e) {
    console.error(`Error getting User with slackUserId ${slackUserId}:\n${e}`);
  }

  if (!user) {
    const slackResponse = {
      response_type: "in_channel", // eslint-disable-line @typescript-eslint/camelcase
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `Sorry, you don't appear to be signed up with Slack in the UpSwyng providers' portal`,
          },
        },
      ],
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(slackResponse));
  }

  if (user && !user.isAdmin) {
    const slackResponse = {
      response_type: "in_channel", // eslint-disable-line @typescript-eslint/camelcase
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `I found you in UpSwyng, but you have to be an administrator to tell me to run this command`,
          },
        },
      ],
    };

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(slackResponse));
  }
  return await callback(req, res, next, user);
}
