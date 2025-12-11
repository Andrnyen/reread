import { proxyFetch } from "./utils";

export default async function handler(req, res) {
  try {
    const chapterId = req.query.chapterId;

    if (!chapterId) {
      return res.status(400).json({ error: "chapterId is required" });
    }

    const url = `https://api.mangadex.org/at-home/server/${chapterId}`;

    const { error, data } = await proxyFetch(url);

    if (error) {
      console.error("At-home fetch failed:", error);
      return res.status(500).json({ error: "Failed to fetch pages" });
    }

    if (!data?.chapter) {
      console.error("Invalid at-home response:", data);
      return res.status(500).json({ error: "Invalid chapter data" });
    }

    const baseUrl = data.baseUrl;
    const hash = data.chapter.hash;
    const pages = data.chapter.data;

    return res.status(200).json({
      baseUrl,
      hash,
      pages,
    });
  } catch (err) {
    console.error("API /pages error:", err);
    return res.status(500).json({ error: "Unexpected server error" });
  }
}
