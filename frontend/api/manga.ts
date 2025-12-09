import { proxyFetch } from "./utils";

export default async function handler(req, res) {
  try {
    const mangaId = req.query.mangaId;
    if (!mangaId) {
      return res.status(400).json({ error: "Missing mangaId" });
    }

    const url =
      `https://api.mangadex.org/manga/${mangaId}` +
      `?includes[]=cover_art&includes[]=artist&includes[]=author`;

    const data = await proxyFetch(url);

    return res.status(200).json(data.data);
  } catch (err) {
    console.error("API /manga error:", err);
    return res.status(500).json({ error: "Proxy failed" });
  }
}
