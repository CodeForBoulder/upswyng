import Alert, {
  alertDocumentToFullAlert,
  fullAlertToAlert,
} from "../../../models/Alert";
import { NextFunction, Request, Response } from "express";
import { TAlert, TAlertFull } from "@upswyng/upswyng-types";

import { ParamsDictionary } from "express-serve-static-core";
import { body } from "express-validator";
import { compose } from "compose-middleware";
import { isAdmin } from "../../../utility/authHelpers";

interface TRequest extends ParamsDictionary {
  includeCancelled: string | null; // boolean, default true
  includeUnapproved: string | null; // boolean, default false
  start: string | null; // serialized Date (optional)
  end: string | null; // serialized Date (optional)
}

/**
 * API endpoint to get a list of Alerts.
 * Returns the full alert (TAlertFull with user who created) if the user is a signed-in
 * admin. Otherwise, returns TAlert
 * Request body may have a `start` and `end` date. If not supplied,
 * the endpoint will return the last 7 days.
 * {
 *   includeCancelled: boolean | null, // default true
 *   includeUnapproved: boolean | null, // default false
 *   start: Date,
 *   end: Date, // default now if start is defined
 * }
 *
 * The response has the shape of:
 * {
 *   count: number, // The total number of alerts in the time frame
 *   alerts: TAlertFull[]
 * }
 */
export const post = compose([
  body("start")
    .toDate()
    .exists(),
  body("end")
    .toDate()
    .exists(),
  body("includeCancelled").toBoolean(),
  body("includeUnapproved").toBoolean(),

  async (req: Request<TRequest>, res: Response, _next: NextFunction) => {
    const admin = isAdmin(req);

    const now = new Date();
    const start: Date | null =
      req.body.start || new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const end: Date = req.body.end || new Date();

    const includeCancelled = req.body.includeCancelled !== false ? true : false;
    const includeUnapproved = !!req.body.includeUnapproved;
    if (start >= end) {
      return res.status(422).json({
        message: `The start date, ${start}, is before the end date, ${end}`,
      });
    }

    try {
      const alertsDocuments = await Alert.find({
        end: { $gte: start },
        start: { $lte: end },
        isCancelled: { $in: [false, includeCancelled] },
        isApproved: { $in: [true, !includeUnapproved] },
      });
      let alerts: TAlert[] | TAlertFull[] = await Promise.all(
        alertsDocuments.map(alertDocumentToFullAlert)
      );

      if (!admin) {
        // remove sensitive fields from the response if the user is not logged
        // in as an admin
        alerts = (alerts as TAlertFull[]).map(fullAlertToAlert);
      }

      return res.status(200).json({ alerts, count: alerts.length });
    } catch (e) {
      console.error(`Problem while fetching alerts at /api/alert: ${e}`);
      return res.status(500).json({
        message: `There was an error fetching the alerts: ${e.message}`,
      });
    }
  },
]);
