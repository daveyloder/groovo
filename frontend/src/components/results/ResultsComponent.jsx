import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";
import { useNavigate } from "react-router-dom";
import styles from "./Results.module.css";
import CardComponent from "../cards/CardComponent"; // Ensure you import CardComponent

function ResultsComponent({
  results,
  loggedInUsername,
  isTrackFavorite,
  onHeartClick,
}) {
  const [displayMessage, setDisplayMessage] = useState(
    "Please search using navbar search"
  );
  const navigate = useNavigate();

  // Update message when results change
  useEffect(() => {
    if (results === undefined || results === null) {
      setDisplayMessage("Please search using navbar search");
    } else if (Array.isArray(results) && results.length === 0) {
      setDisplayMessage("No results found");
    } else {
      setDisplayMessage(""); // Hide message when results exist
    }
  }, [results]);

  return (
    <div className={styles.resultsContainer}>
      {displayMessage && <p className={styles.noResults}>{displayMessage}</p>}
      {results &&
        results.length > 0 &&
        results.map((track) => (
          <CardComponent
            key={track.id}
            track={track}
            liked={isTrackFavorite(track.id)}
            onHeartClick={(track, isLiked) =>
              onHeartClick(track, isLiked, loggedInUsername)
            }
            loggedInUsername={loggedInUsername}
            onClick={() =>
              navigate(`/track/${track.id}`, { state: { trackData: track } })
            }
          />
        ))}
    </div>
  );
}

export default ResultsComponent;
