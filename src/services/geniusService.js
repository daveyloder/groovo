export const getGeniusLyrics = async (artist, title) => {
  const accessToken = import.meta.env.VITE_GENIUS_ACCESS_TOKEN;

  if (!accessToken) {
    console.error("Genius API key is missing!");
    return null;
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

    // Get the first matching song's URL
    const songPath = searchData.response.hits[0].result.url;

    return songPath; // Return the Genius lyrics page URL
  } catch (error) {
    console.error("Error fetching lyrics from Genius:", error);
    return "Lyrics not available.";
  }
};
