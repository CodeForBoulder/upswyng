import { DraftResource } from "../../models/Resource";

/**
 * Creates a new draft resource. Resources and updates to resources
 * start as draft resource records. Draft resource updates are then merged
 * into the `Resource` collection.
 */
export async function post(req, res) {
  try {
    const { draftResource } = req.body;
    const newResource = await DraftResource.create(draftResource);
    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ draftResource: newResource }));
  } catch (e) {
    console.error(e);
    res.writeHead(500, {
      "Content-Type": "application/json"
    });

    return res.end(
      JSON.stringify({
        message: `Error creating resource: ${e.message}`
      })
    );
  }
}
