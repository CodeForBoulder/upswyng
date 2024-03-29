import { DraftResource } from "../../../models/Resource";
import { isAdmin } from "../../../utility/authHelpers";

/**
 * Get all draft resources. Include the `include-deleted` query parameter to
 * get deleted resources.
 */
export async function get(req, res, _next) {
  const includeDeleted = req.query["include-deleted"] !== undefined || false;
  try {
    const draftResources = await DraftResource.getAll(includeDeleted);
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    if (!isAdmin(req)) {
      // don't allow non-admins to see who created a resource
      return res.end(
        JSON.stringify({
          draftResources: draftResources.map(d => {
            const result = { ...d };
            delete result.createdBy;
            return result;
          }),
        })
      );
    }

    return res.end(JSON.stringify({ draftResources }));
  } catch (e) {
    console.error(e);
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
