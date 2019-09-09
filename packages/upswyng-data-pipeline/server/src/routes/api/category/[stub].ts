import Category from "../../../models/Category";

export async function get(req, res, next) {
  const { stub } = req.params;

  const category = await Category.getByStub(stub);

  if (category) {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    res.end(JSON.stringify({ category }));
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json"
    });

    res.end(
      JSON.stringify({
        message: `Category not found`
      })
    );
  }
}
