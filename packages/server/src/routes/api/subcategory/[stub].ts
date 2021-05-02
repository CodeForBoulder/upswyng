import Subcategory, {
  TSubcategoryDocument,
  subcategoryDocumentToSubcategory,
} from "../../../models/Subcategory";

import { TSubcategory } from "@upswyng/types";
import sortByOpen from "../../../utility/sortByOpen";

export async function get(req, res, _next) {
  const { stub } = req.params;
  let subcategoryDocument: TSubcategoryDocument;
  let subcategory: TSubcategory;
  try {
    subcategoryDocument = await Subcategory.getByStub(stub);
    if (subcategoryDocument) {
      subcategory = await subcategoryDocumentToSubcategory(subcategoryDocument);
      if (!subcategory) {
        console.error(
          "Could not convert subcategory document to subcategory after initial fetch.\n" +
            subcategoryDocument
        );
        throw new Error("Problem converting Subcategory for API");
      }
    }
    subcategory = sortByOpen(subcategory);
  } catch (e) {
    res.status(500).json({ message: e.message });
    return;
  }

  if (subcategoryDocument) {
    res.status(200).json({ subcategory });
  } else {
    res.status(404).json({ message: `Subcategory not found` });
  }
}
