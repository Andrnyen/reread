export async function proxyFetch(url: string) {
  try {
    const res = await fetch(url, { method: "GET" });

    if (!res.ok) {
      const text = await res.text();
      console.error("Proxy upstream error:", res.status, text);

      return {
        error: `Upstream error ${res.status}`,
        data: null,
      };
    }

    const json = await res.json();

    return {
      error: null,
      data: json,
    };
  } catch (err: any) {
    console.error("ProxyFetch Error:", err);

    return {
      error: err.message || "Unknown proxy error",
      data: null,
    };
  }
}
