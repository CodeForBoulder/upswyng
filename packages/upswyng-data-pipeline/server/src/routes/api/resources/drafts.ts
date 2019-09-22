import {DraftResource} from "../../../models/Resource";

export async function get(_req, res, _next) {
  try {
    const draftResources = await DraftResource.getAll();
    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    return res.end(JSON.stringify({ draftResources }));
  } catch (e) {
    console.error(e);
    res.writeHead(500, {
      "Content-Type": "application/json"
    });

    return res.end(
      JSON.stringify({
        message: e.message
      })
    );
  }
}
