import Subcategory from "../../../models/Subcategory";

export async function get(req, res, next) {
  const { stub } = req.params;
  let subcategory = null;
  try {
    subcategory = await Subcategory.getByStub(stub);
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

  if (subcategory) {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    res.end(JSON.stringify({ subcategory }));
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json"
    });

    res.end(
      JSON.stringify({
        message: `Subcategory not found`
      })
    );
  }
}
