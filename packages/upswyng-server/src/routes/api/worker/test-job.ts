import forge from "node-forge";
import getName from "@afuggini/namegenerator";
import mq from "../../../worker/mq";

/**
 * Adds a Test Job to the Work Queue.
 */
export async function post(req, res, _next) {
  const { response_url: responseUrl } = req.body;

  const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
  if (!slackSigningSecret) {
    throw new Error(
      "No Slack signing secret was provided in the `env` variables"
    );
  }

  if (responseUrl && responseUrl.includes("hooks.slack.com")) {
    // This ALLEGEDLY came from the slack bot. Verify the request.
    // https://api.slack.com/docs/verifying-requests-from-slack
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

    const jobName = getName("-");

    // Command can be like /testjob 35, where the second part is the delay to apply to the job
    let argParseFailure = false;
    let delay: number;
    const arg = req.body.text;
    if (arg) {
      try {
        delay = parseInt(arg.split(/\s/)[0]);
        if (isNaN(delay)) throw new Error("NaN");
      } catch (e) {
        argParseFailure = true;
      }
    }
    // TODO: Better Failure handling
    mq.addJobTest(jobName, delay ? delay * 1000 : null); // this is taking too long, so don't await it.
    const blocks = [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `:hammer: I'm creating test job *${jobName}* for you!`,
        }, // TODO: Add link to app?
      },
    ];
    if (delay && !argParseFailure) {
      blocks.push({
        type: "section",
        text: {
          text: `Your job will be delayed for *${delay} ${
            delay === 1 ? "second" : "seconds"
          }* before work starts on it`,
          type: "mrkdwn",
        },
      });
    } else if (argParseFailure) {
      blocks.push({
        type: "section",
        text: {
          text: `I couldn't understand part of your command. Try something like _"/testjob 21"_ to start a test job which delays for 21 seconds`,
          type: "mrkdwn",
        },
      });
    }
    const slackResponse = {
      response_type: "in_channel", // eslint-disable-line @typescript-eslint/camelcase
      blocks,
    };

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(slackResponse));
  }
  // Not from the slack bot
  // TODO: Add verification (or not since it's the test job)
  try {
    const j = await mq.addJobTest(
      undefined,
      isNaN(parseInt(req.body.delay)) ? undefined : parseInt(req.body.delay),
      req.body.shouldFail === "true"
    );
    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ jobName: j.name, jobId: j.id }));
  } catch (e) {
    res.writeHead(500, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: e.message }));
  }
}
