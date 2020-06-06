import Subcategory from "../../models/Subcategory";

export async function get(_req, res) {
  try {
    const subcategories = await Subcategory.getSubcategoryList();
    const collator = new Intl.Collator("en");
    const sortedSubcategories = subcategories.sort(
      (subCatA, subCatB) =>
        collator.compare(
          subCatA.parentCategory.name,
          subCatB.parentCategory.name
        ) || collator.compare(subCatA.name, subCatB.name)
    );
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ subcategories: sortedSubcategories }));
  } catch (e) {
    console.error(e);
    res.writeHead(500).end("Error fetching subcategories");
  }
}
