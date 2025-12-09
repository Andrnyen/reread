export const config = { runtime: "edge" };

export default async function handler(req: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    const mangaId = searchParams.get("mangaId");

    if (!mangaId) {
      return new Response(JSON.stringify({ error: "Missing mangaId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const url =
      `https://api.mangadex.org/manga/${mangaId}` +
      `?includes[]=cover_art&includes[]=artist&includes[]=author`;

    const apiRes = await fetch(url);
    const data = await apiRes.json();

    return new Response(JSON.stringify(data.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("API/manga error:", err);
    return new Response(JSON.stringify({ error: "Proxy failed" }), {
      status: 500,
    });
  }
}
