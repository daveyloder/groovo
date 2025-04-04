import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";
import { useNavigate } from "react-router-dom";
import styles from "./Results.module.css";

function ResultsComponent({ results }) {
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

  // Handle click on a card to navigate to track detail page
  const handleCardClick = (track) => {
    navigate(`/track/${track.id}`, {
      state: {
        trackData: track,
      },
    });
  };

  return (
    <div className={styles.resultsContainer}>
      {displayMessage && <p className={styles.noResults}>{displayMessage}</p>}
      {results &&
        results.length > 0 &&
        results.map((track) => {
          const albumImage =
            track.album?.images?.[0]?.url || "https://via.placeholder.com/150";

          return (
            <Card
              key={track.id}
              className={`${styles.resultCard} ${styles.clickableCard}`}
              onClick={() => handleCardClick(track)}
            >
              <CardImg
                top
                width="100%"
                src={albumImage}
                alt={track.name}
                className={styles.albumImage}
              />
              <CardBody>
                <CardTitle tag="h5">{track.name}</CardTitle>
                <CardText>
                  Artist:{" "}
                  {track.artists?.map((a) => a.name).join(", ") ||
                    "Unknown Artist"}
                    
                </CardText>
                <CardText>
                          <i className="bi bi-bookmark-heart"></i>
                          </CardText>
              </CardBody>
            </Card>
          );
        })}
    </div>
  );
}

export default ResultsComponent;
