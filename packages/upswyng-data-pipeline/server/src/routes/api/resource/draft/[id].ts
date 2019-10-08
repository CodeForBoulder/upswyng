import { DraftResource } from "../../../../models/Resource";
import { ObjectId } from "bson";
import { requireAdmin } from "../../../../utility/authHelpers";

export async function get(req, res, next) {
  try {
    requireAdmin(req);
  } catch (_e) {
    res.writeHead(401, {
      "Content-Type": "application/json"
    });
    res.end(
      JSON.stringify({
        message: `You are not authorized to delete drafts.`
      })
    );
    next();
    return;
  }
  
  const { id } = req.params;
  let draftResource = null;
  try {
    draftResource = await DraftResource.getByRecordId(
      ObjectId.createFromHexString(id)
    );
  } catch (e) {
    res.writeHead(500, {
      "Content-Type": "application/json"
    });

    return res.end(
      JSON.stringify({
        message: e.message
      })
    );
  }

  if (draftResource) {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });
    res.end(JSON.stringify({ draftResource }));
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json"
    });

    res.end(
      JSON.stringify({
        message: `Resource not found`
      })
    );
  }
}
