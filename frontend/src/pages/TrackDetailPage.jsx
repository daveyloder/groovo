import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Card, CardImg, Button, Spinner } from "reactstrap";
import { getSpotifyToken } from "../services/spotifyService";
import { getGeniusLyrics } from "../services/geniusService";
import styles from "./TrackDetail.module.css";

function TrackDetailPage() {
  const { trackId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [trackData, setTrackData] = useState(null);
  const [lyrics, setLyrics] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use the track data passed via navigation state if available
    if (location.state?.trackData) {
      setTrackData(location.state.trackData);
      fetchLyrics(location.state.trackData);
    } else {
      // If no state was passed, fetch the track data from Spotify API
      fetchTrackData();
    }
  }, [trackId]);

  const fetchTrackData = async () => {
    try {
      const token = await getSpotifyToken();
      const response = await fetch(
        `https://api.spotify.com/v1/tracks/${trackId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch track data");
      }

      const data = await response.json();
      setTrackData(data);
      fetchLyrics(data);
    } catch (error) {
      console.error("Error fetching track data:", error);
      setLoading(false);
    }
  };

  const fetchLyrics = async (track) => {
    try {
      // You'll need to implement or use a lyrics API service
      const artistName = track.artists[0].name;
      const trackName = track.name;

      const lyricsUrl = await getGeniusLyrics(artistName, trackName);

      setLyrics(lyricsUrl ? lyricsUrl : "Lyrics not available.");

      setLoading(false);
    } catch (error) {
      console.error("Error fetching lyrics:", error);
      setLyrics("Lyrics not available for this track.");
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}>
          Loading track details... <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.trackDetailContainer}>
      <Button className={styles.backButton} onClick={handleBack}>
        &larr; Back to Search Results
      </Button>

      {trackData && (
        <Row>
          <Col md={4}>
            <Card className={styles.albumCard}>
              <CardImg
                top
                width="100%"
                src={
                  trackData.album?.images?.[0]?.url ||
                  "https://via.placeholder.com/300"
                }
                alt={trackData.name}
              />
              <div className={styles.albumInfo}>
                <h5>{trackData.album?.name}</h5>
                <p>
                  Released:{" "}
                  {new Date(trackData.album?.release_date).toLocaleDateString()}
                </p>
              </div>
            </Card>

            {/* Preview Player Section
            <div className={styles.previewSection}>
              <h4>30-second Preview</h4>
              {trackData.preview_url ? (
                <div className={styles.previewPlayer}>
                  <Button
                    color={isPlaying ? "danger" : "success"}
                    className={styles.playButton}
                    onClick={handlePlayPause}
                  >
                    {isPlaying ? "Pause" : "Play"}
                  </Button>
                  <div className={styles.customAudioPlayer}>
                    <audio
                      ref={(element) => {
                        if (element && !audioPlayer) {
                          setAudioPlayer(element);
                        }
                      }}
                      src={trackData.preview_url}
                      controls
                      className={styles.hiddenAudio}
                    >
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </div>
              ) : (
                <Alert color="warning" className={styles.noPreviewAlert}>
                  No preview available for this track
                </Alert>
              )}
            </div> */}
          </Col>
          <Col md={8}>
            <div className={styles.trackInfo}>
              <h1>{trackData.name}</h1>
              {trackData.artists && (
                <h3>
                  {trackData.artists.map((artist) => artist.name).join(", ")}
                </h3>
              )}

              <div className={styles.trackMetadata}>
                <div className={styles.metadataItem}>
                  <span className={styles.metadataLabel}>Popularity:</span>
                  <div className={styles.popularityBar}>
                    <div
                      className={styles.popularityFill}
                      style={{ width: `${trackData.popularity}%` }}
                    ></div>
                    <span className={styles.popularityText}>
                      {trackData.popularity}/100
                    </span>
                  </div>
                </div>
                <div className={styles.metadataItem}>
                  <span className={styles.metadataLabel}>Duration:</span>
                  <span>
                    {Math.floor(trackData.duration_ms / 60000)}:
                    {String(
                      Math.floor((trackData.duration_ms % 60000) / 1000)
                    ).padStart(2, "0")}
                  </span>
                </div>
                {trackData.explicit && (
                  <div className={styles.explicitTag}>Explicit</div>
                )}
              </div>

              <div className={styles.lyricsContainer}>
                <h2>Lyrics</h2>
                <div className={styles.lyrics}>
                  {lyrics.includes("http") ? (
                    <a href={lyrics} target="_blank" rel="noopener noreferrer">
                      View Lyrics on Genius
                    </a>
                  ) : (
                    <p>{lyrics}</p>
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default TrackDetailPage;
