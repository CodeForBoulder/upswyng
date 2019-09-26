import Resource, { DraftResource } from "../../../../../models/Resource";
import { TResource } from "../../../../../../../src/types";

export async function post(req, res, next) {
  const { id: resourceId } = req.params; // _id of resource to be approved
  let draftToApprove: TResource | null = null;
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
  try {
    const updateResource = await Resource.createOrUpdateFromDraft(
      draftToApprove
    );
    await DraftResource.deleteByRecordId(draftToApprove._id);

    res.writeHead(204, {
      "Content-Type": "application/json"
    });

    res.end(JSON.stringify({ resource: updateResource }));
  } catch (e) {
    res.writeHead(500, {
      "Content-Type": "application/json"
    });

    return res.end(
      JSON.stringify({
        message: "Error updating with draft: " + e.message
      })
    );
  }
}
