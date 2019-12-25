import {
  DraftResource,
  TResourceDocument,
  resourceDocumentToResource,
} from "../../../../../models/Resource";
import { ObjectId } from "bson";
import { TUser } from "@upswyng/upswyng-types";
import { createOrUpdateResourceFromDraft } from "../../../../../models/Utility";
import { requireAdmin } from "../../../../../utility/authHelpers";
import EventLog from "../../../../../models/EventLog";
import diffResources from "../../../../../utility/diffResources";

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
      resourceDocumentToResource(draftToApprove)
    );
    await DraftResource.deleteByRecordId(draftToApprove._id);

    try {
      await new EventLog({
        actor: user.id,
        detail: {
          kind: "draft-approved",
          resourceId: draftToApprove.resourceId.toHexString(),
          resourceName: draftToApprove.name,
          newResource: !updatedResource,
          diff: updatedResource
            ? diffResources(
                resourceDocumentToResource(updatedResource),
                resourceDocumentToResource(draftToApprove)
              )
            : undefined,
        },
        kind: "draft-approved",
      }).save();
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
