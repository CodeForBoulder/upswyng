import { createDraftResource } from "../../../models/Utility";
import { ObjectId } from "bson";

/**
 * Creates a new draft resource. Resources and updates to resources
 * start as draft resource records. Draft resource updates are then merged
 * into the `Resource` collection.
 */
export async function post(req, res) {
  try {
    const { draftResource } = req.body;
    createObjectIds(draftResource);
    try {
      const newResource = await createDraftResource(draftResource);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ draftResource: newResource }));
    } catch (e) {
      if (
        // TODO: Make this less fragile
        e.message.includes(
          "The new resource is the same as the existing resource"
        )
      ) {
        res.writeHead(422, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({
            message: "The new resource is the same as an existing resource."
          })
        );
      } else {
        throw e;
      }
    }
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

function createObjectIds(resource) {
  Object.entries(resource).forEach(([k, v]) => {
    if (k === "id" || k === "_id") {
      resource[k] = ObjectId.createFromHexString(v as string);
    } else if (typeof v === "object") {
      createObjectIds(v);
    }
  });
}
