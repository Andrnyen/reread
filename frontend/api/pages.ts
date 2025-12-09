export const config = { runtime: "edge" };

export default async function handler(req: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    const chapterId = searchParams.get("chapterId");

    if (!chapterId) {
      return new Response(JSON.stringify({ error: "chapterId required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const url = `https://api.mangadex.org/at-home/server/${chapterId}`;

    const result = await fetch(url);
    const data = await result.json();

    if (!data?.chapter) {
      return new Response(JSON.stringify({ error: "Invalid chapter data" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        hash: data.chapter.hash,
        pages: data.chapter.data,
        pagesSaver: data.chapter.dataSaver,
        baseUrl: data.baseUrl,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("API/pages error:", err);
    return new Response(JSON.stringify({ error: "Unexpected server error" }), {
      status: 500,
    });
  }
}
