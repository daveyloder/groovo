export const getGeniusLyrics = async (artist, title) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/genius/lyrics?artist=${encodeURIComponent(
        artist
      )}&title=${encodeURIComponent(title)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Genius lyrics");
    }

    const data = await response.json();

    if (!data.lyricsUrl) {
      return "Lyrics not found.";
    }

    return data.lyricsUrl; // Genius lyrics page URL
  } catch (error) {
    console.error("Error fetching lyrics:", error);
    return "Lyrics not available.";
  }
};
