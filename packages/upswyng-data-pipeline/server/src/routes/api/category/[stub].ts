import Category, { categoryDocumentToCategory } from "../../../models/Category";

export async function get(req, res, _next) {
  const { stub } = req.params;

  const categoryDocument = await Category.getByStub(stub);

  if (categoryDocument) {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({ category: categoryDocumentToCategory(categoryDocument) })
    );
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: `Category not found`,
      })
    );
  }
}
