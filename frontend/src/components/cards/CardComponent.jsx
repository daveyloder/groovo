import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";
import styles from "./Card.module.css";

const CardComponent = ({
  track,
  onClick,
  liked: initialLiked,
  onHeartClick: parentOnHeartClick,
  loggedInUsername,
}) => {
  const [liked, setLiked] = useState(initialLiked || false);

  useEffect(() => {
    setLiked(initialLiked || false);
  }, [initialLiked]);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    setLiked(!liked);
    parentOnHeartClick(track, !liked, loggedInUsername); // Pass track, liked status, and username
  };

  return (
    <>
      <Card
        key={track.id}
        className={`${styles.resultCard} ${styles.clickableCard}`}
        onClick={onClick}
        role="button"
        tabIndex={0}
      >
        <CardImg
          top
          width="100%"
          src={track.album.images[0]?.url}
          alt={track.name}
          className={styles.albumImage}
        />
        <CardBody>
          <CardTitle tag="h5">{track.name}</CardTitle>
          <CardText>
            Artist: {track.artists.map((a) => a.name).join(", ")}
          </CardText>
          <CardText>
            <i
              className={`bi ${
                liked ? "bi-bookmark-heart-fill" : "bi-bookmark-heart"
              }`}
              style={{ color: liked ? "red" : "gray", cursor: "pointer" }}
              onClick={handleHeartClick}
            ></i>
          </CardText>
        </CardBody>
      </Card>
    </>
  );
};

export default CardComponent;
