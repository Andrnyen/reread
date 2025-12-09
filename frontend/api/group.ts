import { proxyFetch } from "./utils";

export default async function handler(req, res) {
  try {
    const chapterId = req.query.chapterId;

    if (!chapterId) return res.status(400).json({ name: null });

    const chapterUrl = `https://api.mangadex.org/chapter/${chapterId}?includes%5B%5D=scanlation_group`;
    const chapter = await proxyFetch(chapterUrl);

    const groupRel = chapter?.data?.data?.relationships?.find(
      (r: any) => r.type === "scanlation_group"
    );

    const name = groupRel?.attributes?.name ?? null;

    return res.status(200).json({ name });
  } catch (err) {
    console.error("API /group error:", err);
    return res.status(500).json({ name: null });
  }
}
