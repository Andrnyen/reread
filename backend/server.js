import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import morgan from "morgan";

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));

// Generic MangaDex proxy
app.get("/proxy", async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: "Missing ?url=" });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 Reread-Proxy",
        Accept: "application/json",
      },
    });

    const status = response.status;
    const data = await response.json().catch(() => null);

    return res.status(status).json(data);
  } catch (err) {
    console.error("Proxy Error:", err);
    return res
      .status(500)
      .json({ error: "Proxy failed", details: err.message });
  }
});

// Health check
app.get("/", (req, res) => res.send("Reread Proxy Running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
