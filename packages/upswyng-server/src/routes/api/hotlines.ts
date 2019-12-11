import Hotline from "../../models/Hotline";

export async function get(_req, res) {
  try {
    const hotlines = await Hotline.getAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ hotlines }));
  } catch (e) {
    console.error(e);

    res.writeHead(500, {
      "Content-Type": "application/json",
    });

    return res.end(
      JSON.stringify({
        message: `Error fetching hotlines: ${e.message}`,
      })
    );
  }
}
