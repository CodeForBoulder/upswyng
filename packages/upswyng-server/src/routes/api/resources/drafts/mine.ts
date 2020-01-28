import {
  DraftResource,
  resourceDocumentToResource,
} from "../../../../models/Resource";
import { isAdmin, requireLoggedIn } from "../../../../utility/authHelpers";

import { ObjectId } from "bson";
import { TUser } from "@upswyng/upswyng-types";

/**
 * API endpoint to get the drafts created by the user accessing the endpiont
 */
export async function get(req, res, _next) {
  let user: TUser;
  try {
    user = requireLoggedIn(req);
  } catch (e) {
    console.error(e);

    res.writeHead(401, {
      "Content-Type": "application/json",
    });
    return res.end(
      JSON.stringify({
        message: `Please log in to view your drafts.`,
      })
    );
  }
  try {
    const draftDocuments = await DraftResource.find({
      createdBy: ObjectId.createFromHexString(user._id),
    }).sort([["lastModifiedAt", -1]]);
    let drafts = draftDocuments.map(resourceDocumentToResource);
    if (!isAdmin(req)) {
      // don't allow non-admins to see who created a resource
      drafts = drafts.map(d => {
        const result = { ...d };
        delete result.createdBy;
        return result;
      });
    }
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ draftResources: drafts }));
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
