export const config = { runtime: "edge" };

export default async function handler(req: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get("endpoint");

    if (!endpoint) {
      return new Response(JSON.stringify({ error: "Missing endpoint" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await fetch(endpoint, {
      headers: { "User-Agent": "Mozilla/5.0 MangaReader Proxy" },
    });

    const json = await response.json();

    const normalized = {
      data: json?.data?.data ?? [],
      total: json?.data?.total ?? null,
      limit: json?.data?.limit ?? null,
      offset: json?.data?.offset ?? null,
    };

    return new Response(JSON.stringify(normalized), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Proxy error (manga-list):", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
