import {
  JobKind,
  TJobCheckNewAlertsData,
  TJobCheckNewAlertsResult,
} from "./workerTypes";

import Alert from "../models/Alert";
import EventLog from "../models/EventLog";
import { Job } from "bullmq";
import { eventLogDocumentToEventLog } from "../models/EventLog";
import moment from "moment";
import { postEventLogMessage } from "../utility/slackbot";

/**
 * Check the Alerts for any which have recently become active, and push
 * a notification out to users
 */
export async function processJobCheckNewAlerts(
  job: Job<TJobCheckNewAlertsData, TJobCheckNewAlertsResult>
): Promise<TJobCheckNewAlertsResult> {
  console.info(`${job.name}[${job.id}]\t: Checking for new alerts`);

  const now = new Date();

  const activeAlerts = await Alert.genActiveAlerts(now);

  const unprocessedAlerts = activeAlerts.filter(
    a =>
      !a.wasProcessed &&
      a.start >= // don't do anything about really old alerts
        moment(now)
          .subtract(3, "hours")
          .toDate()
  );

  console.info(
    `${job.name}[${job.id}]\t: Found ${unprocessedAlerts.length} alerts which have not been processed`
  );

  let alertsProcessed = []; // Array<alert IDs>

  unprocessedAlerts.forEach(async (alert, i, { length: count }) => {
    try {
      console.info(`Processing alert ${alert._id.toHexString()}`);
      alert.wasProcessed = true;
      await alert.save();
      alertsProcessed = [...alertsProcessed, alert._id.toHexString()];
      console.debug(`Simulate ${alert} sent to web`);
      console.info(`Finished processing alert ${alert._id.toHexString()}`);
      try {
        const eventLogDocument = await new EventLog({
          actor: process.env.BOT_USER_ID,
          detail: {
            kind: "alert_live",
            alertId: alert._id,
            alertTitle: alert.title,
          },
          kind: "alert_live",
        }).save();
        const eventLog = eventLogDocumentToEventLog(eventLogDocument);
        await postEventLogMessage(eventLog);
      } catch (e) {
        console.error(
          `Error creating Event Log \`alert_live\` for Alert ${alert._id}: ${e}`
        );
      }
      await job.updateProgress(((i + 1) / count) * 100);
    } catch (e) {
      throw e;
    }
  });

  await job.updateProgress(100);

  return { alertsProcessed, jobName: job.name, kind: JobKind.CheckNewAlerts };
}
