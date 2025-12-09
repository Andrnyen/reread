import axios from "axios";

export default async function handler(req, res) {
  try {
    const endpoint = req.query.endpoint;

    if (!endpoint || typeof endpoint !== "string") {
      return res
        .status(400)
        .json({ error: "Missing or invalid endpoint parameter." });
    }

    const response = await axios.get(endpoint, {
      headers: {
        "User-Agent": "Mozilla/5.0 MangaReader Proxy",
      },
    });

    const normalized = {
      data: response.data?.data ?? [],
      total: response.data?.total ?? null,
      limit: response.data?.limit ?? null,
      offset: response.data?.offset ?? null,
    };

    return res.status(200).json(normalized);
  } catch (err: any) {
    console.error("Proxy error (manga-list):", err.message);

    return res.status(500).json({
      error: "Failed to fetch MangaDex data",
      details: err.message,
    });
  }
}
