import EventLog, { eventLogDocumentToEventLog } from "../../../models/EventLog";
import User, { userDocumentToUser } from "../../../models/User";
import { requireAdmin, requireSuperAdmin } from "../../../utility/authHelpers";

import { ObjectId } from "bson";
import { TUser } from "@upswyng/upswyng-types";
import { postEventLogMessage } from "../../../utility/slackbot";

/**
 * Get a TUser by the user id
 */
export async function get(req, res, _next) {
  try {
    requireAdmin(req);
  } catch {
    res.writeHead(401, {
      "Content-Type": "application/json",
    });
    return res.end(
      JSON.stringify({
        message: `You are not authorized to view Users`,
      })
    );
  }

  try {
    const user = await User.findById(
      ObjectId.createFromHexString(req.params.user_id)
    );

    if (!user) {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });

      return res.end(
        JSON.stringify({
          message: `A user with the _id ${req.params.user_id} does not exist`,
        })
      );
    }

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    return res.end(
      JSON.stringify({
        user: userDocumentToUser(user),
      })
    );
  } catch (e) {
    res.writeHead(500, {
      "Content-Type": "application/json",
    });
    return res.end(
      JSON.stringify({
        message: `Error updating user ${req.params.user_id}: ${e.message}`,
      })
    );
  }
}

/**
 * API endpoint to set the Admin/SuperAdmin status of a User. Request body should have the following options:
 * {
 *   isAdmin?: boolean, // sets the `isAdmin` field to the given value
 *   isSuperAdmin?: boolean, // sets the `isSuperAdmin` field to the given value
 * }
 *
 * An Ok response will contain the updated User:
 * {
 *   user: TUser,
 * }
 *
 * An Error response will contain an error message:
 * {
 *   message: string,
 * }
 *
 */
export async function post(req, res, _next) {
  let actor: TUser;
  try {
    actor = requireSuperAdmin(req);
  } catch {
    res.writeHead(401, {
      "Content-Type": "application/json",
    });
    return res.end(
      JSON.stringify({
        message: `You are not authorized to update a User`,
      })
    );
  }

  try {
    const user = await User.findById(
      ObjectId.createFromHexString(req.params.user_id)
    );

    if (!user) {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });

      return res.end(
        JSON.stringify({
          message: `A user with the _id ${req.params.user_id} does not exist`,
        })
      );
    }

    const isAdminOld = user.isAdmin;
    const isSuperAdminOld = user.isSuperAdmin;

    if (typeof req.body.isAdmin === "boolean") {
      user.isAdmin = req.body.isAdmin;
    }

    if (typeof req.body.isSuperAdmin === "boolean") {
      user.isSuperAdmin = req.body.isSuperAdmin;
    }

    const updatedUser = await user.save();

    try {
      const newDocument = await new EventLog({
        actor: actor._id,
        detail: {
          isAdminNew: updatedUser.isAdmin,
          isAdminOld,
          isSuperAdminNew: updatedUser.isSuperAdmin,
          isSuperAdminOld,
          kind: "user_permission_changed",
          modifiedUserId: updatedUser._id.toHexString(),
        },
        kind: "user_permission_changed",
      }).save();
      await newDocument.populate("actor").execPopulate();
      await postEventLogMessage(eventLogDocumentToEventLog(newDocument));
    } catch (e) {
      console.error(
        `Error creating Event Log for update of user ${updatedUser._id} by admin ${actor._id}: ${e}`
      );
    }
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    return res.end(
      JSON.stringify({
        user: userDocumentToUser(updatedUser),
      })
    );
  } catch (e) {
    res.writeHead(500, {
      "Content-Type": "application/json",
    });
    return res.end(
      JSON.stringify({
        message: `Error updating user ${req.params.user_id}: ${e.message}`,
      })
    );
  }
}
