import Resource from "../../../models/Resource";

export async function get(_req, res, _next) {
  try {
    const resources = await Resource.getAll();
    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    return res.end(JSON.stringify({ resources }));
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
