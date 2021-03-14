import {
  DraftResource,
  TResourceDocument,
  resourceDocumentToResource,
} from "../../../../../models/Resource";
import EventLog, {
  eventLogDocumentToEventLog,
} from "../../../../../models/EventLog";
import { EventLogKind, TUser } from "@upswyng/types";

import { ObjectId } from "bson";
import algoliaIndex from "../../../../../utility/algoliaIndex";
import { createOrUpdateResourceFromDraft } from "../../../../../models/Utility";
import diffResources from "../../../../../utility/diffResources";
import { postEventLogMessage } from "../../../../../utility/slackbot";
import { requireAdmin } from "../../../../../utility/authHelpers";

export async function post(req, res, next) {
  const { _id } = req.params; // _id of resource to be approved
  let user: TUser;
  try {
    user = requireAdmin(req);
  } catch (_e) {
    res.writeHead(401, {
      "Content-Type": "application/json",
    });
    res.end(
      JSON.stringify({
        message: `You are not authorized to approve drafts.`,
      })
    );
    next();
    return;
  }

  let draftToApprove: TResourceDocument | null = null;
  try {
    draftToApprove = await DraftResource.getByRecordId(
      ObjectId.createFromHexString(_id)
    );

    if (!draftToApprove) {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({
          message: `Draft resource not found`,
        })
      );
    }
  } catch (e) {
    console.error("Error approving draft resource:\n", e.message);
    res.writeHead(500, {
      "Content-Type": "application/json",
    });

    return res.end(
      JSON.stringify({
        message: e.message,
      })
    );
  }
  try {
    const updatedResource = await createOrUpdateResourceFromDraft(
      await resourceDocumentToResource(draftToApprove)
    );
    await DraftResource.deleteByRecordId(draftToApprove._id);

    try {
      if (draftToApprove.deleted) {
        await algoliaIndex.deleteObject(updatedResource._id.toHexString());
      } else {
        const updatedResourceObject = await resourceDocumentToResource(
          updatedResource
        );
        await algoliaIndex.saveObject({
          objectID: updatedResourceObject._id,
          name: updatedResourceObject.name,
          description: updatedResourceObject.description,
          subcategories: updatedResourceObject.subcategories
            .map(s => s.name)
            .join(","),
        });
      }
    } catch (e) {
      console.error(
        `Error updating resource in algolia index after approval of draft ${_id}: ${e}`
      );
    }

    try {
      const newDocument = await new EventLog({
        actor: user._id,
        detail: {
          kind: EventLogKind.DraftApproved,
          resourceId: draftToApprove.resourceId.toHexString(),
          resourceName: draftToApprove.name,
          newResource: !updatedResource,
          diff: updatedResource
            ? diffResources(
                await resourceDocumentToResource(updatedResource),
                await resourceDocumentToResource(draftToApprove)
              )
            : undefined,
        },
        kind: EventLogKind.DraftApproved,
      }).save();
      await newDocument.populate("actor").execPopulate();
      await postEventLogMessage(eventLogDocumentToEventLog(newDocument));
    } catch (e) {
      console.error(
        `Error creating Event Log for approval of draft ${_id}: ${e}`
      );
    }
    res.writeHead(204, {
      "Content-Type": "application/json",
    });

    return res.end(JSON.stringify({}));
  } catch (e) {
    console.error(e);
    res.writeHead(500, {
      "Content-Type": "application/json",
    });

    return res.end(
      JSON.stringify({
        message: "Error updating with draft: " + e.message,
      })
    );
  }
}
