import Subcategory, {
  subcategoryDocumentToSubcategory,
  TSubcategoryDocument,
} from "../../../models/Subcategory";
import { TSubcategory } from "@upswyng/upswyng-types";

export async function get(req, res, _next) {
  const { stub } = req.params;
  let subcategoryDocument: TSubcategoryDocument;
  let subcategory: TSubcategory;
  try {
    subcategoryDocument = await Subcategory.getByStub(stub);
    if (subcategoryDocument) {
      subcategory = subcategoryDocumentToSubcategory(subcategoryDocument);
      if (!subcategory) {
        console.error(
          "Could not convert subcategory document to subcategory after initial fetch.\n" +
            subcategoryDocument
        );
        throw new Error("Problem converting Subcategory for API");
      }
    }
  } catch (e) {
    res.writeHead(500, {
      "Content-Type": "application/json",
    });

    return res.end(
      JSON.stringify({
        message: e.message,
      })
    );
  }

  if (subcategoryDocument) {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        subcategory,
      })
    );
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: `Subcategory not found`,
      })
    );
  }
}
