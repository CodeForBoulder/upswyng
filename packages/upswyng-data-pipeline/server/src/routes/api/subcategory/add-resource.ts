import { addResourceToSubcategory } from "../../../models/Utility";
import { ObjectId } from "bson";
import { requireAdmin } from "../../../utility/authHelpers";
import Resource from "../../../models/Resource";

/**
 * Add a resource to a subcategory. The body of the post request should have the form of:
 * {
 *    subcategoryId: string
 *    resourceId: string
 * }
 */
export async function post(req, res, next) {
  const { subcategoryId, resourceId } = req.body;
  try {
    requireAdmin(req);
  } catch (_e) {
    res.writeHead(401, {
      "Content-Type": "application/json",
    });
    res.end(
      JSON.stringify({
        message: `You are not authorized to add resources to a subcategory`,
      })
    );
    next();
    return;
  }

  let errorMessage = null;

  if (!subcategoryId && !resourceId) {
    errorMessage = "Request must include a subcategory stub and a resource ID";
  } else if (!subcategoryId) {
    errorMessage = "Request must include a subcategory stub";
  } else if (!resourceId) {
    errorMessage = "Request must include a resource ID";
  }

  if (errorMessage) {
    res.writeHead(400, {
      "Content-Type": "application/json",
    });
    res.end(
      JSON.stringify({
        message: errorMessage,
      })
    );
    return;
  }

  try {
    const resource = await Resource.getById(
      ObjectId.createFromHexString(resourceId)
    );
    if (!resource) {
      throw new Error(`Could not find resource with IDDD ${resourceId}`);
    }
    await addResourceToSubcategory(
      resource._id,
      ObjectId.createFromHexString(subcategoryId)
    );
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({}));
  } catch (e) {
    res.writeHead(400, {
      "Content-Type": "application/json",
    });
    res.end(
      JSON.stringify({
        message: e.message,
      })
    );
  }
}
