import axios from "axios";

export default async function handler(req, res) {
  try {
    const endpoint = req.query.endpoint;

    let url = "";

    if (endpoint === "popular") {
      url =
        "https://api.mangadex.org/manga?limit=30&includes[]=cover_art&contentRating[]=safe&order[followedCount]=desc";
    } else if (endpoint === "latest") {
      url =
        "https://api.mangadex.org/manga?limit=30&includes[]=cover_art&contentRating[]=safe&order[latestUploadedChapter]=desc";
    } else {
      return res.status(400).json({ error: "Unknown endpoint" });
    }

    const response = await axios.get(url, {
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
