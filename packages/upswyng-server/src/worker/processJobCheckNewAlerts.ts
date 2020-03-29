import Alert, { alertDocumentToFullAlert } from "../models/Alert";
import {
  TJobCheckNewAlertsData,
  TJobCheckNewAlertsResult,
} from "./workerTypes";

import { Job } from "bullmq";
import { TAlert } from "@upswyng/upswyng-types";
import axios from "axios";
import moment from "moment";

/**
 * Check the Alerts for any which have recently become active, and push
 * a notification out to users
 */
export async function processesJobCheckNewAlerts(
  job: Job<TJobCheckNewAlertsData, TJobCheckNewAlertsResult>
): Promise<TJobCheckNewAlertsResult> {
  console.info(`${job.name}[${job.id}]\t: Checking for new alerts`);

  const now = new Date();

  const activeAlerts = await Alert.genActiveAlerts(now);

  const unsentAlertWeb = activeAlerts.filter(
    a =>
      !a.notificationSentWeb &&
      a.start >= // don't do anything about really old alerts
        moment(now)
          .subtract(3, "hours")
          .toDate()
  );

  console.info(
    `${job.name}[${job.id}]\t: Found ${unsentAlertWeb.length} alerts which have not been sent as web notifiactions`
  );

  let alertsProcessed = []; // Array<alert IDs>

  unsentAlertWeb.forEach(async alert => {
    try {
      alert.notificationSentWeb = true;
      await alert.save();
      alertsProcessed = [...alertsProcessed, alert._id];
      console.debug(`Simulate ${alert} sent to web`);
    } catch (e) {
      throw e;
    }
  });

  return { alertsProcessed, jobName: job.name, kind: "check_new_alerts" };
}
