import { TUser } from "@upswyng/types";
import getName from "@afuggini/namegenerator";
import handleCommandFromSlack from "../../../utility/handleCommandFromSlack";
import mq from "../../../worker/mq";

async function makeTestJob(req, res, _next, user: TUser) {
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
  await mq.addJobTest(
    jobName,
    delay ? delay * 1000 : null,
    undefined,
    user._id
  ); // this is taking too long, so don't await it.
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
        text: `:timer_clock: Your job will be delayed for *${delay} ${
          delay === 1 ? "second" : "seconds"
        }* before work starts on it`,
        type: "mrkdwn",
      },
    });
  } else if (argParseFailure) {
    blocks.push({
      type: "section",
      text: {
        text: `:confused: I couldn't understand part of your command. Try something like _"/testjob 21"_ to start a test job which delays for 21 seconds`,
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

/**
 * Adds a Test Job to the Work Queue.
 *
 * Can be called from slack command `/test-job`.
 * To call from the command line:
 * curl -XPOST -d 'delay=2000&shouldFail=true' 'localhost:3000/api/bot/test-job'
 */
export async function post(req, res, next) {
  const { response_url: responseUrl } = req.body;

  if (responseUrl && responseUrl.includes("hooks.slack.com")) {
    return handleCommandFromSlack(req, res, next, makeTestJob);
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
    return res.end(
      JSON.stringify({
        jobName: j.name,
        jobId: j.id,
        shouldFail: req.body.shouldFail === "true",
      })
    );
  } catch (e) {
    res.writeHead(500, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: e.message }));
  }
}
