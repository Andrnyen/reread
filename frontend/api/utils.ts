export async function proxyFetch(
  url: string
): Promise<{ error: string | null; data: any }> {
  try {
    const res = await fetch(url, { method: "GET" });

    // Handle upstream error
    if (!res.ok) {
      let text = "";
      try {
        text = await res.text();
      } catch {
        text = "No response body";
      }

      console.error("Upstream fetch error:", res.status, text);

      return {
        error: `Upstream error ${res.status}`,
        data: null,
      };
    }

    // Parse JSON body
    const json = await res.json();

    return {
      error: null,
      data: json,
    };
  } catch (err: any) {
    console.error("proxyFetch Exception:", err);

    return {
      error: err?.message || "Unknown proxy error",
      data: null,
    };
  }
}
