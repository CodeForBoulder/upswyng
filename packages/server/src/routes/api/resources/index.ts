import Resource, { resourceDocumentToResource } from "../../../models/Resource";
import Category from "../../../models/Category";
import { ObjectId } from "bson";
import { TCategory } from "@upswyng/types";
import { TResource } from "@upswyng/types";
import { TSubcategory } from "@upswyng/types";

export async function get(_req, res, _next) {
  try {
    const idParam = _req.query.id;
    const resourceIds = idParam?.split(",") || [];
    const categoryFilters = _req.query?.categories?.split(",") || [];

    const getCategories = async () => {
      return Promise.all(
        categoryFilters.map(async (stub: string) => {
          return await Category.getByStub(stub);
        })
      );
    };

    const categories = await getCategories();
    const resourceIdsFromCategories = [
      ...new Set(
        categories
          .map((category: TCategory) => {
            return category?.subcategories.map((subcategory: TSubcategory) => {
              return subcategory?.resources.map((resource: TResource) =>
                resource.resourceId.toString()
              );
            });
          })
          .flat(2)
      ),
    ];

    const allIds =
      categories.length > 0 && resourceIds.length > 0
        ? resourceIds.filter((id: string) => {
            return resourceIdsFromCategories.includes(id);
          })
        : [...new Set([...resourceIds, ...resourceIdsFromCategories])];
    const allResourceIds = allIds.map(ObjectId.createFromHexString);

    const resourceDocuments =
      allResourceIds.length > 0
        ? await Resource.getByResourceIds(allResourceIds)
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
