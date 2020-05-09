import {
  DraftResource,
  TResourceDocument,
  resourceDocumentToResource,
} from "../../../../models/Resource";

import { ObjectId } from "bson";
import { TResource } from "@upswyng/types";
import { isAdmin } from "../../../../utility/authHelpers";

export async function get(req, res, _next) {
  const { _id } = req.params;
  let draftResourceDocument: TResourceDocument;
  let draftResource: TResource;
  try {
    draftResourceDocument = await DraftResource.getByRecordId(
      ObjectId.createFromHexString(_id)
    );
    if (!draftResourceDocument) {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });

      return res.end(
        JSON.stringify({
          message: `Draft with ID ${_id} not found`,
        })
      );
    }

    draftResource = await resourceDocumentToResource(draftResourceDocument);

    if (!isAdmin(req)) {
      // don't allow non-admins to see who created a resource
      delete draftResource.createdBy;
    }
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ draftResource }));
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
}
