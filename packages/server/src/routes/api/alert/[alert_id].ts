import Alert, {
  alertDocumentToFullAlert,
  fullAlertToAlert,
} from "../../../models/Alert";

import { ObjectId } from "bson";
import getUserFromRawUsers from "../../../utility/getUserFromRawUsers";

/**
 * Get a single alert by ID. ex: /api/alert/5e6e9b2a8746d64922c6a412
 *
 * Successful response (200):
 * {
 *   alert: TAlert | TAlertFull; // admins will get TAlertFull
 * }
 *
 * Error response (4xx or 5xx):
 * {
 *   message: string; // human readable error message
 * }
 */
export async function get(req, res, _next) {
  const { alert_id: _id } = req.params;

  if (!_id) {
    return res.status(400).json({ message: "No ID was provided" });
  }

  let id: ObjectId;

  try {
    id = ObjectId.createFromHexString(_id);
  } catch (_) {
    return res
      .status(400)
      .json({ message: `${_id} is not a valid bson object ID` });
  }

  const user = getUserFromRawUsers(req);
  const isAdmin = !!user || (user && user.isAdmin);

  const alert = await Alert.findById(id);

  if (!alert) {
    return res
      .status(404)
      .json({ message: `There is no alert with ID: ${id.toHexString()}` });
  }

  return res.status(200).json({
    alert: isAdmin
      ? await alertDocumentToFullAlert(alert)
      : fullAlertToAlert(await alertDocumentToFullAlert(alert)),
  });
}
