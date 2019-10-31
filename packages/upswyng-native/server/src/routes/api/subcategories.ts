import Subcategory from "../../models/Subcategory";

export async function get(req, res) {
  try {
    const subcategories = await Subcategory.getSubcategoryList();
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ subcategories }));
  } catch (e) {
    console.error(e);
    res.writeHead(500).end("Error fetching subcategories");
  }
}
