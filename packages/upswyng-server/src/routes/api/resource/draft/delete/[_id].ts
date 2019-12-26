import {
  DraftResource,
  TResourceDocument,
} from "../../../../../models/Resource";

import EventLog from "../../../../../models/EventLog";
import { ObjectId } from "bson";
import { TUser } from "@upswyng/upswyng-types";
import { requireAdmin } from "../../../../../utility/authHelpers";

export async function post(req, res, next) {
  let user: TUser;
  try {
    user = requireAdmin(req);
  } catch (_e) {
    res.writeHead(401, {
      "Content-Type": "application/json",
    });
    res.end(
      JSON.stringify({
        message: `You are not authorized to delete drafts.`,
      })
    );
    next();
    return;
  }

  const { _id } = req.params;
  let deletedResource: TResourceDocument | null = null;
  try {
    deletedResource = await DraftResource.deleteByRecordId(
      ObjectId.createFromHexString(_id)
    );
  } catch (e) {
    res.writeHead(500, {
      "Content-Type": "application/json",
    });

    return res.end(
      JSON.stringify({
        message: e.message,
      })
    );
  }

  if (deletedResource) {
    try {
      await new EventLog({
        actor: user._id,
        detail: {
          kind: "draft_deleted",
          resourceId: deletedResource.resourceId.toHexString(),
          resourceName: deletedResource.name,
        },
        kind: "draft_deleted",
      }).save();
    } catch (e) {
      console.error(`Error saving event log when deleting draft ${_id}`);
    }
    res.writeHead(204, {
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify({}));
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: `Resource not found`,
      })
    );
  }
}
