import {
  DraftResource,
  TResourceDocument,
} from "../../../../../models/Resource";
import EventLog, {
  eventLogDocumentToEventLog,
} from "../../../../../models/EventLog";
import { EventLogKind, TUser } from "@upswyng/upswyng-types";

import { ObjectId } from "bson";
import { postEventLogMessage } from "../../../../../utility/slackbot";
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
      const newDocument = await new EventLog({
        actor: user._id,
        detail: {
          kind: EventLogKind.DraftDeleted,
          resourceId: deletedResource.resourceId.toHexString(),
          resourceName: deletedResource.name,
        },
        kind: EventLogKind.DraftDeleted,
      }).save();
      await newDocument.populate("actor").execPopulate();
      await postEventLogMessage(eventLogDocumentToEventLog(newDocument));
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
