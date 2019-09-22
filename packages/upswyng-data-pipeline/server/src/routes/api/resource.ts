import Category from "../../models/Category";
import { DraftResource } from "../../models/Resource";

/**
 * Creates a new draft resource. Resources and updates to resources
 * start as draft resource records. Draft resource updates are then merged
 * into the `Resource` collection.
 */
export async function post(req, res) {
  const { resource } = req.body;
  try {
    const draftResource = await DraftResource.create(resource);
    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ resource: draftResource }));
  } catch (e) {
    console.error(e);
    res.writeHead(500).end("Error creating resource");
  }
}
