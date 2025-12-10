app.get("/proxyImage", async (req, res) => {
  try {
    const { hash, file } = req.query;

    if (!hash || !file) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    const url = `https://uploads.mangadex.org/data/${hash}/${file}`;

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).send("Image fetch failed");
    }

    res.set("Content-Type", response.headers.get("content-type"));
    response.body.pipe(res);
  } catch (err) {
    console.error("Proxy image error:", err);
    res.status(500).send("Proxy server error");
  }
});
