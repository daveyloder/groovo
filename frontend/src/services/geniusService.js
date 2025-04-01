export const getGeniusLyrics = async (artist, title) => {
  const accessToken = import.meta.env.VITE_GENIUS_ACCESS_TOKEN;

  if (!accessToken) {
    console.error("Genius API key is missing!");
    return "Lyrics not available.";
  }

  try {
    // Search for the song on Genius
    const searchUrl = `https://api.genius.com/search?q=${encodeURIComponent(
      `${title} ${artist}`
    )}`;

    const searchResponse = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!searchResponse.ok) {
      throw new Error("Failed to fetch Genius search results");
    }

    const searchData = await searchResponse.json();

    if (!searchData.response.hits.length) {
      return "Lyrics not found on Genius.";
    }

    // Find the best matching song (ensure artist name matches)
    const bestMatch =
      searchData.response.hits.find((hit) =>
        hit.result.primary_artist.name
          .toLowerCase()
          .includes(artist.toLowerCase())
      ) || searchData.response.hits[0]; // Fallback to first result if no exact match

    return bestMatch.result.url; // Return the Genius lyrics page URL
  } catch (error) {
    console.error("Error fetching lyrics from Genius:", error);
    return "Lyrics not available.";
  }
};
