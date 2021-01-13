import Resource, { resourceDocumentToResource } from "../../../models/Resource";
import { ObjectId } from "bson";

export async function get(_req, res, _next) {
  try {
    const idParam = _req.query.id;
    const resourceIds = idParam?.split(",")?.map(ObjectId.createFromHexString);
    const resourceDocuments = resourceIds
      ? await Resource.getByRecordIds(resourceIds)
      : await Resource.getAll();
    const resources = await Promise.all(
      resourceDocuments.map(resourceDocumentToResource)
    );

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    return res.end(JSON.stringify({ resources }));
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
