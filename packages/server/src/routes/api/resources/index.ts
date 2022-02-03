import Resource, { resourceDocumentToResource } from "../../../models/Resource";
import Category from "../../../models/Category";
import { ObjectId } from "bson";

import { TCategoryDocument } from "../../../models/Category";

export async function get(_req, res, _next) {
  try {
    const idParam = _req.query.id;
    const resourceIds = idParam?.split(",");

    const categoryStubs = _req.query?.categories?.split(",");
    const categoryDocuments = await Category.getByStubs(categoryStubs);

    const subcategoryIds = categoryDocuments
      .map((categoryDocument: TCategoryDocument) => {
        return categoryDocument.subcategories;
      })
      .flat(1);

    const resourceDocuments = categoryStubs
      ? await Resource.getBySubcategoryIds(
          subcategoryIds as ObjectId[],
          resourceIds
        )
      : resourceIds
      ? await Resource.getByResourceIds(resourceIds)
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
