import { DraftResource } from "../../../../../models/Resource";
import { requireAdmin } from "../../../../../utility/authHelpers";

export async function post(req, res, next) {
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
  let deletedResource = null;
  try {
    deletedResource = await DraftResource.deleteByRecordId(id);
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

  if (deletedResource) {
    res.writeHead(204, {
      "Content-Type": "application/json"
    });

    res.end(JSON.stringify({}));
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
