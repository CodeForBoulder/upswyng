import EventLog, { eventLogDocumentToEventLog } from "../../models/EventLog";
import { EventLogKind, TUser } from "@upswyng/upswyng-types";

import { ObjectId } from "bson";
import Resource from "../../models/Resource";
import { createDraftResource } from "../../models/Utility";
import { postEventLogMessage } from "../../utility/slackbot";
import { requireLoggedIn } from "../../utility/authHelpers";

/**
 * Creates a new draft resource. Resources and updates to resources
 * start as draft resource records. Draft resource updates are then merged
 * into the `Resource` collection.
 */
export async function post(req, res, next) {
  let user: TUser | null = null;
  try {
    user = requireLoggedIn(req);
  } catch (_e) {
    res.writeHead(401, {
      "Content-Type": "application/json",
    });
    res.end(
      JSON.stringify({
        message: `You must be logged in to create a new resource.`,
      })
    );
    next();
    return;
  }
  try {
    const { draftResource } = req.body;
    draftResource.createdBy = user as TUser;
    delete draftResource._id;

    try {
      const newResource = await createDraftResource(draftResource);
      const existingResource = await Resource.getByResourceId(
        ObjectId.createFromHexString(newResource.resourceId)
      );
      try {
        const eventLog = await new EventLog({
          actor: user._id,
          detail: {
            draftId: newResource._id,
            kind: EventLogKind.DraftCreated,
            newResource: !existingResource,
            resourceId: newResource.resourceId,
            resourceName: newResource.name,
          },
          kind: EventLogKind.DraftCreated,
        }).save();
        await eventLog.populate("actor").execPopulate();
        await postEventLogMessage(eventLogDocumentToEventLog(eventLog));
      } catch (e) {
        console.error(
          `Error creating Event Log for new draft of ${newResource.name} (${newResource.resourceId}): ${e}`
        );
      }
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ draftResource: newResource }));
    } catch (e) {
      if (
        // TODO: Make this less fragile
        e.message.includes(
          "The new resource is the same as the existing resource"
        )
      ) {
        res.writeHead(422, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({
            message: "The new resource is the same as an existing resource.",
          })
        );
      } else {
        throw e;
      }
    }
  } catch (e) {
    console.error(e);
    res.writeHead(500, {
      "Content-Type": "application/json",
    });

    return res.end(
      JSON.stringify({
        message: `Error creating resource: ${e.message}`,
      })
    );
  }
}
