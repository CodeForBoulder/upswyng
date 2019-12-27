import * as SlackWebApi from "@slack/web-api";
import * as dotenv from "dotenv";

import { TEventLog } from "@upswyng/upswyng-types";

const { WebClient } = SlackWebApi;

dotenv.config();

const HOST = `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOST}`;
const CHANNEL = process.env.SLACK_BOT_CHANNEL || "proj-upswyng";

let webClient: SlackWebApi.WebClient;
try {
  webClient = new WebClient(process.env.SLACK_OAUTH_ACCESS_TOKEN);
  webClient.auth.test().then(
    r => {
      console.info(`🤖   upswyngbot starting 🚀`);
      console.info(`🤖   HOST: ${HOST}`);
      console.info(`🤖   CHANNEL: ${CHANNEL}`);
      console.info(
        `🤖   slack auth successful:\n${JSON.stringify(r, null, 2)}`
      );
      console.info(`🤖   upswyngbot started 😎\n\n`);
    },
    e => {
      console.error(`💩 Error getting slackbot auth info: ${e.message}`);
    }
  );
} catch (e) {
  console.error(`Problem starting slack bot web client:\n${e.message}`);
}

function assertUnreachable(_x: never): never {
  throw new Error("unreachable");
}

function createTextForEventLog(e: TEventLog): string {
  const { detail } = e;
  switch (detail.kind) {
    case "draft_approved":
      return `:thumbsup: ${
        e.actor.name ? e.actor.name : e.actor.email
      } approved a draft to ${
        detail.newResource ? "create" : "update"
      } <${HOST}/resource/${detail.resourceId}|${detail.resourceName}>`;
    case "draft_deleted":
      return `:put_litter_in_its_place: ${
        e.actor.name ? e.actor.name : e.actor.email
      } deleted a draft of <${HOST}/resource/${detail.resourceId}|${
        detail.resourceName
      }>`;
    case "resource_issue_reopened":
      return `:slightly_frowning_face: ${
        e.actor.name ? e.actor.name : e.actor.email
      } reopened a <${HOST}/resource/issue/${
        detail.resourceIssueId
      }|${detail.resourceIssueKind.replace(
        /_/g,
        " "
      )} issue> for <${HOST}/resource/${detail.resourceId}|${
        detail.resourceName
      }>`;
    case "resource_issue_resolved":
      return `:clipboard: ${
        e.actor.name ? e.actor.name : e.actor.email
      } resolved a <${HOST}/resource/issue/${
        detail.resourceIssueId
      }|${detail.resourceIssueKind.replace(
        /_/g,
        " "
      )} issue> for <${HOST}/resource/${detail.resourceId}|${
        detail.resourceName
      }>`;
    default:
      assertUnreachable(detail);
  }
}
export async function postEventLogMessage(e: TEventLog) {
  try {
    // Use the `chat.postMessage` method to send a message from this app
    await webClient.chat.postMessage({
      /* eslint-disable @typescript-eslint/camelcase */
      as_user: false,
      // TODO (rhinodavid): Get Channel list and send to all (https://api.slack.com/methods/chat.postMessage#channels)
      channel: CHANNEL,
      // TODO (rhinodavid): Remove hardcoded URL
      // Issue now is that if you use the SERVER_HOST slack can't access `localhost`
      icon_url: `https://codeforboulder-upswyng-server.herokuapp.com/upswyngbot.svg`,
      text: createTextForEventLog(e),
      /* eslint-enable @typescript-eslint/camelcase */
    });
  } catch (e) {
    console.error(e.message);
  }
}

export async function postTestMessage() {
  try {
    // Use the `chat.postMessage` method to send a message from this app
    await webClient.chat.postMessage({
      /* eslint-disable @typescript-eslint/camelcase */
      as_user: false,
      // TODO (rhinodavid): Get Channel list and send to all (https://api.slack.com/methods/chat.postMessage#channels)
      channel: CHANNEL,
      // TODO (rhinodavid): Remove hardcoded URL
      // Issue now is that if you use the SERVER_HOST slack can't access `localhost`
      icon_url: `${HOST}/upswyngbot.svg`,
      text: `🔔 DING. It's ${new Date().toLocaleString()}`,
      /* eslint-enable @typescript-eslint/camelcase */
    });
  } catch (e) {
    console.error(e.message);
  }
}
