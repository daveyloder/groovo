import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavbarComponent from "./components/navbar/NavbarComponent";
import ResultsComponent from "./components/results/ResultsComponent";
import TrackDetailPage from "./pages/TrackDetailPage";
import Footer from "./components/footer/FooterCompontent";
import { getSpotifyToken } from "./services/spotifyService";
import Header from "./components/headers/HeaderComponent";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (searchQuery) => {
    if (!searchQuery) return;

    try {
      const token = await getSpotifyToken();
      // First get the search results
      const searchResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          searchQuery
        )}&type=track&limit=10&market=US&is_playable=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const searchData = await searchResponse.json();

      // Then fetch detailed track info for each result to get potentially more complete data
      const trackPromises = searchData.tracks.items.map(async (track) => {
        // Try multiple markets to increase chance of finding a preview
        const markets = ["US", "GB", "IT", "ES", "FR", "DE"];

        // Try each market until we find a preview or exhaust all options
        for (const market of markets) {
          const trackResponse = await fetch(
            `https://api.spotify.com/v1/tracks/${track.id}?market=${market}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const trackData = await trackResponse.json();

          if (trackData.preview_url) {
            // Found a preview, use this version of the track
            return trackData;
          }
        }

        // No preview found in any market, return the original track
        return track;
      });

      const enrichedResults = await Promise.all(trackPromises);
      console.log(enrichedResults);
      setSearchResults(enrichedResults);
    } catch (error) {
      console.error("Error fetching Spotify data:", error);
    }
  };

  return (
    <>
      <NavbarComponent />

      <div>
        <h1>Welcome to Groovo!</h1>
      </div>
    </>
  );
}

export default App;
