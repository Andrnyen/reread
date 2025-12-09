import { proxyFetch } from "./utils";

export default async function handler(req, res) {
  try {
    const mangaId = req.query.mangaId;
    if (!mangaId) return res.status(400).json({ error: "Missing mangaId" });

    const url = `https://api.mangadex.org/manga/${mangaId}/aggregate?translatedLanguage[]=en`;

    const data = await proxyFetch(url);

    res.status(200).json(data.data);
  } catch (err) {
    console.error("API /volumes error:", err);
    res.status(500).json({ error: "Proxy failed" });
  }
}
