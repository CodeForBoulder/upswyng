import Category from "../../models/Category";

export async function get(_req, res) {
  try {
    const categories = await Category.getCategoryList();
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({categories}));
  } catch (e) {
    res.writeHead(500).end("Error fetching categories");
  }
}
