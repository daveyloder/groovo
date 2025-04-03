const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getSpotifyToken = async () => {
  try {
    const response = await fetch(`${API_URL}/api/spotify/token`, {
      method: "POST", // Ensure method is POST
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Spotify Token Fetch Error:", errorData);
      return null;
    }

    const data = await response.json();
    // console.log("Spotify Token:", data.access_token); // Debugging
    return data.access_token;
  } catch (error) {
    console.log("Network error:", error);
    return null;
  }
};
