import User, { userDocumentToUser } from "../../../models/User";

import { ObjectId } from "bson";
import { requireSuperAdmin } from "../../../utility/authHelpers";

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
  try {
    requireSuperAdmin(req);
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

    if (typeof req.body.isAdmin === "boolean") {
      user.isAdmin = req.body.isAdmin;
    }

    if (typeof req.body.isSuperAdmin === "boolean") {
      user.isSuperAdmin = req.body.isSuperAdmin;
    }

    const updatedUser = await user.save();

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
