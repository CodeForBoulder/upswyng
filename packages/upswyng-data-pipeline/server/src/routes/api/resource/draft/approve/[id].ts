import { DraftResource } from "../../../../../models/Resource";
import canonical from "canonical-instance";
import Resource from "../../../../../models/Resource";

export async function post(req, res, next) {
  const { id: resourceId } = req.params; // _id of resource to be approved
  let draftToApprove = null;
  try {
    draftToApprove = await DraftResource.getByRecordId(resourceId);
    if (!draftToApprove) {
      res.writeHead(404, {
        "Content-Type": "application/json"
      });

      res.end(
        JSON.stringify({
          message: `Draft resource not found`
        })
      );
    }
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

  const existingResource = Resource.getById(draftToApprove.id);

  if (!existingResource) {
      // create new resource based on draft
  } else {
      // update old resource
  }

  res.writeHead(204, {
    "Content-Type": "application/json"
  });

  res.end(JSON.stringify({}));
}
