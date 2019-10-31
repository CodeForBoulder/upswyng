import {
  DraftResource,
  TResourceDocument,
  resourceDocumentToResource,
} from "../../../../../models/Resource";
import { createOrUpdateResourceFromDraft } from "../../../../../models/Utility";
import { TResource } from "../../../../../../../src/types";
import { requireAdmin } from "../../../../../utility/authHelpers";

export async function post(req, res, next) {
  const { id: resourceId } = req.params; // _id of resource to be approved
  try {
    requireAdmin(req);
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
    draftToApprove = await DraftResource.getByRecordId(resourceId);

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
    const updateResource = await createOrUpdateResourceFromDraft(
      resourceDocumentToResource(draftToApprove)
    );
    await DraftResource.deleteByRecordId(draftToApprove._id);
    res.writeHead(204, {
      "Content-Type": "application/json",
    });

    return res.end(JSON.stringify({ resource: updateResource }));
  } catch (e) {
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
