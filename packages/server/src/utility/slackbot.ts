import * as SlackRtmApi from "@slack/rtm-api";
import * as SlackWebApi from "@slack/web-api";
import * as dotenv from "dotenv";

import { EventLogKind, TEventLog } from "@upswyng/types";
import User, { userDocumentToUser } from "../models/User";

import { ObjectId } from "bson";
import { WebAPICallResult } from "@slack/web-api";

const { WebClient } = SlackWebApi;
const { RTMClient } = SlackRtmApi;

dotenv.config();

const HOST = `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOST}`;
const CHANNEL = process.env.SLACK_BOT_CHANNEL || "proj-upswyng";

let webClient: SlackWebApi.WebClient;
try {
  webClient = new WebClient(process.env.SLACK_OAUTH_ACCESS_TOKEN);
  webClient.auth.test().then(
    (_r: SlackWebApi.WebAPICallResult) => {
      console.info(`🤖   UpSwyngbot starting 🚀`);
      console.info(`🤖   HOST: ${HOST}`);
      console.info(`🤖   CHANNEL: ${CHANNEL}`);
      console.info(`🤖   UpSwyngbot connected to web api 😎\n\n`);
    },
    e => {
      console.error(`💩 Error getting slackbot auth info: ${e.message}`);
    }
  );
} catch (e) {
  console.error(`Problem starting slack bot web client:\n${e.message}`);
}

let rtm: SlackRtmApi.RTMClient;
try {
  rtm = new RTMClient(process.env.SLACK_BOT_OAUTH_ACCESS_TOKEN);
  rtm.on("connecting", () =>
    console.info("🤖   Connecting to slack RTM API...")
  );
  rtm.on("disconnecting", () =>
    console.info("🤖   Disconnecting from slack RTM API...")
  );
  rtm.on("disconnected", () =>
    console.error("🤖   Disconnected from slack RTM API")
  );
  rtm.on("reconnecting", () =>
    console.info("🤖   Reconnecting to slack RTM API")
  );
  rtm.on("error", error => {
    console.error(
      `🤖   slack RTM API Error: ${JSON.stringify(error, null, 2)}`
    );
  });
  rtm
    .start()
    .then((_r: WebAPICallResult) => {
      console.info(`🤖   slack RTM started`);
    })
    .catch(e => {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`Failed to start slack RTM: ${e}`);
      } else {
        throw new Error(`Failed to start slack RTM in production: ${e}`);
      }
    });
} catch (e) {
  console.error(`Problem starting slack bot rtm client:\n${e.message}`);
}

function assertUnreachable(_x: never): never {
  throw new Error("unreachable");
}

async function createTextForEventLog(e: TEventLog): Promise<string> {
  const { detail } = e;
  switch (detail.kind) {
    case EventLogKind.AlertLive:
      return `:bangbang: Alert <${HOST}/alert?id=${detail.alertId}|${detail.alertTitle}> is now live.`;
    case EventLogKind.DraftApproved:
      return `:thumbsup: ${
        e.actor.name ? e.actor.name : e.actor.email
      } approved a draft to ${
        detail.newResource ? "create" : "update"
      } <${HOST}/resource/${detail.resourceId}|${detail.resourceName}>`;
    case EventLogKind.DraftCreated:
      return `:eight_spoked_asterisk: ${
        e.actor.name ? e.actor.name : e.actor.email
      } wrote <${HOST}/resource/draft/${detail.draftId}|a draft> to ${
        detail.newResource ? "create" : "update"
      } ${detail.resourceName}`;
    case EventLogKind.DraftDeleted:
      return `:put_litter_in_its_place: ${
        e.actor.name ? e.actor.name : e.actor.email
      } deleted a draft of <${HOST}/resource/${detail.resourceId}|${
        detail.resourceName
      }>`;
    case EventLogKind.ResourceIssueReopened:
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
    case EventLogKind.ResourceIssueResolved:
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
    case EventLogKind.UserPermissionChanged:
      const modifiedUserDocument = await User.findById(
        ObjectId.createFromHexString((e.detail as any).modifiedUserId)
      );
      const modifiedUser = userDocumentToUser(modifiedUserDocument);

      const {
        isAdminOld,
        isAdminNew,
        isSuperAdminOld,
        isSuperAdminNew,
      } = e.detail as any;
      let message = "";
      if (!isAdminOld && !isSuperAdminOld && isAdminNew && !isSuperAdminNew) {
        message = "added Admin to";
      } else if (
        !isAdminOld &&
        !isSuperAdminOld &&
        isAdminNew &&
        isSuperAdminNew
      ) {
        message = "added Admin and Super Admin to";
      } else if (!isSuperAdminOld && isSuperAdminNew) {
        message = "added Super Admin to";
      } else if (isSuperAdminOld && !isSuperAdminNew && isAdminNew) {
        message = "removed Super Admin from";
      } else if (isSuperAdminOld && !isAdminNew) {
        message = "removed Admin and Super Admin from";
      } else if (isAdminOld && !isAdminNew) {
        message = "removed Admin from";
      }
      return `:lock: ${
        e.actor.name ? e.actor.name : e.actor.email
      } ${message} ${
        modifiedUser.name ? modifiedUser.name : modifiedUser.email
      }`;
    default:
      assertUnreachable(detail);
  }
}
export async function postEventLogMessage(e: TEventLog) {
  try {
    const text = await createTextForEventLog(e);
    // Use the `chat.postMessage` method to send a message from this app
    await webClient.chat.postMessage({
      /* eslint-disable @typescript-eslint/camelcase */
      as_user: false,
      // TODO (rhinodavid): Get Channel list and send to all (https://api.slack.com/methods/chat.postMessage#channels)
      channel: CHANNEL,
      // TODO (rhinodavid): Remove hardcoded URL
      // Issue now is that if you use the SERVER_HOST slack can't access `localhost`
      icon_url: `${HOST}/static/upswyngbot.svg`,
      text,
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
      icon_url: `${HOST}/static/upswyngbot.svg`,
      text: `🔔 DING. It's ${new Date().toLocaleString()}`,
      /* eslint-enable @typescript-eslint/camelcase */
    });
  } catch (e) {
    console.error(e.message);
  }
}
