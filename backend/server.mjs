import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fetch from "node-fetch";

dotenv.config();
console.log("SPOTIFY_CLIENT_ID:", process.env.SPOTIFY_CLIENT_ID); // Debugging
console.log("SPOTIFY_SECRET:", process.env.SPOTIFY_SECRET);

const app = express();
app.use(cors());
app.use(express.json());
// Route to post and get spotify token
app.post("/api/spotify/token", async (req, res) => {
  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_SECRET;

    if (!clientId || !clientSecret) {
      return res.status(500).json({ error: "Spotify API keys are missing!" });
    }

    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64"
    );

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${authString}`,
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res
        .status(500)
        .json({ error: "Failed to fetch token", details: errorData });
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error("Error fetching Spotify token:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});
// Route to get lyrics from Genius API
app.get("/api/genius/lyrics", async (req, res) => {
  const { artist, title } = req.query; // Extract query params

  if (!artist || !title) {
    return res.status(400).json({ error: "Artist and title are required" });
  }

  const accessToken = process.env.GENIUS_ACCESS_TOKEN;

  if (!accessToken) {
    return res.status(500).json({ error: "Genius API key is missing!" });
  }

  try {
    const searchUrl = `https://api.genius.com/search?q=${encodeURIComponent(
      `${title} ${artist}`
    )}`;

    const searchResponse = await fetch(searchUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!searchResponse.ok) {
      throw new Error("Failed to fetch Genius search results");
    }

    const searchData = await searchResponse.json();

    if (!searchData.response.hits.length) {
      return res.json({
        lyricsUrl: null,
        message: "Lyrics not found on Genius.",
      });
    }

    // Find the best matching song

    const bestMatch =
      searchData.response.hits.find((hit) =>
        hit.result.primary_artist.name
          .toLowerCase()
          .includes(artist.toLowerCase())
      ) || searchData.response.hit[0];

    return res.json({ lyricsUrl: bestMatch.result.url });
  } catch (error) {
    console.error("Error fetching lyrics from Genius:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
