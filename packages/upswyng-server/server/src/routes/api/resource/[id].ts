import Resource from "../../../models/Resource";
import { ObjectId } from "bson";
import { isAdmin } from "../../../utility/authHelpers";

export async function get(req, res, next) {
  const { id } = req.params;
  let resource = null;
  try {
    resource = await Resource.getById(ObjectId.createFromHexString(id));
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

  if (resource) {
    if (!isAdmin(req)) {
      // don't let non-admins see the resource creator
      delete resource.createdBy;
    }
    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    res.end(JSON.stringify({ resource }));
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
