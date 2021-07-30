import Category, { categoryDocumentToCategory } from "../../../models/Category";

export async function get(req, res, _next) {
  const { stub } = req.params;

  let categoryDocument;
  try {
    if (req.query.latitude && req.query.longitude) {
      categoryDocument = await Category.getByStubLocation(stub, {
        latitude: parseInt(req.query.latitude, 10),
        longitude: parseInt(req.query.longitude, 10),
      });
    } else {
      categoryDocument = await Category.getByStub(stub);
    }

    if (categoryDocument) {
      console.log(
        `\n  categoryDocument:\n\n\n\t${JSON.stringify(categoryDocument)}\n\n`
      );

      res.status(200).json({
        category: await categoryDocumentToCategory(categoryDocument),
        categoryDocument,
      });
    } else {
      res.status(404).json({ message: `Category ${stub} not found` });
    }
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: `Error retrieving category: ${e.message}` });
  }
}
