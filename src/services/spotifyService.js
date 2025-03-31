export const getSpotifyToken = async () => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_SECRET;

  if (!clientId || !clientSecret) {
    console.error("Spotify API keys are missing!");
    return null;
  }

  const authString = btoa(`${clientId}:${clientSecret}`);

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
    console.error("Spotify Token Fetch Error:", errorData);
    return null;
  }

  const data = await response.json();
  console.log("Spotify Token:", data.access_token); // Debugging
  return data.access_token;
};
