export const config = { runtime: "edge" };

export default async function handler(req: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    const chapterId = searchParams.get("chapterId");

    if (!chapterId) {
      return new Response(JSON.stringify({ name: null }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Fetch chapter data including scanlation group
    const url = `https://api.mangadex.org/chapter/${chapterId}?includes[]=scanlation_group`;
    const chapterRes = await fetch(url);
    const chapter = await chapterRes.json();

    const groupRel = chapter.data?.relationships?.find(
      (r: any) => r.type === "scanlation_group"
    );

    const name = groupRel?.attributes?.name ?? null;

    return new Response(JSON.stringify({ name }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("API/group error:", err);
    return new Response(JSON.stringify({ name: null }), { status: 500 });
  }
}
