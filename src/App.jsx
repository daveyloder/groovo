import { useState } from "react";
import NavbarComponent from "./components/navbar/NavbarComponent";
import ResultsComponent from "./components/results/ResultsComponent";
import { getSpotifyToken } from "./services/spotifyService";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (searchQuery) => {
    if (!searchQuery) return;

    try {
      const token = await getSpotifyToken();
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          searchQuery
        )}&type=track&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data.tracks.items);
      setSearchResults(data.tracks.items); // Store results in state
    } catch (error) {
      console.error("Error fetching Spotify data:", error);
    }
  };

  return (
    <>
      <NavbarComponent onSearch={handleSearch} />
      <ResultsComponent results={searchResults} />
    </>
  );
}

export default App;
