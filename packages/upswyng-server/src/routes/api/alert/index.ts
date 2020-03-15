import Alert, {
  alertDocumentToFullAlert,
  fullAlertToAlert,
} from "../../../models/Alert";
import { NextFunction, Request, Response } from "express";

import { ObjectId } from "bson";
import { ParamsDictionary } from "express-serve-static-core";
import { TAlertDocument } from "../../../models/Alert";
import { body } from "express-validator";
import { compose } from "compose-middleware";
import { requireAdmin } from "../../../utility/authHelpers";

interface TRequest extends ParamsDictionary {
  _id: string | null; // if included, will try to update an existing alert
  category: string | null;
  color: string; // hex string
  detail: string | null; // markdown string
  end: string; // serialized Date
  icon: string; // fontawesome identifier; ex: "fas fa-snowflake"
  isApproved: string; // boolean
  isCancelled: string; // boolean
  start: string; // serialized Date
  title: string;
}

/**
 * API endpoint to create an alert. Requires admin permissions.
 *
 * Successful response (201):
 * {}
 *
 * Error response (4xx | 5xx):
 * {
 *   message: string; // human readable error message
 * }
 */
export const post = compose([
  body("color").exists(),
  body("end")
    .toDate()
    .exists(),
  body("icon").exists(),
  body("isApproved").toBoolean(),
  body("isCancelled").toBoolean(),
  body("start")
    .toDate()
    .exists(),
  body("title").exists(),
  async (req: Request<TRequest>, res: Response, _next: NextFunction) => {
    let user;
    try {
      user = requireAdmin(req);
    } catch (_e) {
      return res.status(401).json({
        message: `You are not authorized to create alerts`,
      });
    }
    const id = req.body._id;
    let existingAlert;
    if (id) {
      try {
        existingAlert = Alert.findById(ObjectId.createFromHexString(id));
      } catch (e) {
        return res
          .status(500)
          .json({ message: `Error finding exist alert: ${e.message}` });
      }
      if (!existingAlert) {
        return res
          .status(400)
          .json({ message: `Could not find alert with ID: ${id}` });
      }
    }

    const start: Date = req.body.start;
    const end: Date = req.body.end;

    try {
      const alert: TAlertDocument = existingAlert || new Alert();
      if (!existingAlert) {
        alert.createdBy = user._id;
      }
      alert.category = req.body.category || null;
      alert.color = req.body.color;
      alert.detail = req.body.detail || null;
      alert.end = end;
      alert.icon = req.body.icon;
      alert.isApproved = req.body.isApproved;
      alert.isCancelled = req.body.isCancelled;
      alert.lastModifiedBy = user._id;
      alert.start = start;
      alert.title = req.body.title;
      await alert.save();
      return res.status(!existingAlert ? 201 : 204).json({});
    } catch (e) {
      return res
        .status(500)
        .json({ message: `Error creating alert: ${e.message}` });
    }
  },
]);
