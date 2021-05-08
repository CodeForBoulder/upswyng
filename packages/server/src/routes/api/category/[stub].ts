import Category, { categoryDocumentToCategory } from "../../../models/Category";

export async function get(req, res, _next) {
  const { stub } = req.params;

  const categoryDocument = await Category.getByStub(stub);

  if (categoryDocument) {
    res.status(200).json({
      category: await categoryDocumentToCategory(categoryDocument),
    });
  } else {
    res.status(404).json({ message: `Category ${stub} not found` });
  }
}
