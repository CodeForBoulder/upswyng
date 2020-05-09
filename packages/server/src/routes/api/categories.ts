import Category from "../../models/Category";

export async function get(_req, res) {
  try {
    const categories = await Category.getCategoryList();
    return res.status(200).json({ categories });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: `Error fetching categories: ${e.message}`,
    });
  }
}
