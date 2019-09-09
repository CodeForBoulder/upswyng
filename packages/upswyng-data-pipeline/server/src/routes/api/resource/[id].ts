import Resource from "../../../models/Resource";

export async function get(req, res, next) {
  const { id } = req.params;
  let resource = null;
  try {
    resource = await Resource.getById(id);
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
