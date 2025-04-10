import React from "react";
import { Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";
import styles from "./Card.module.css";

const CardComponent = ({ track, onClick, liked, onHeartClick }) => {
  return (
    <>
      <Card
        key={track.id}
        className={`${styles.resultCard} ${styles.clickableCard}`}
        onClick={onClick} // ← Add this line
        role="button" // (optional, helps with accessibility)
        tabIndex={0} // (optional, makes it focusable for keyboard users)
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
              className={`bi ${liked ? "bi-bookmark-heart-fill" : "bi-bookmark-heart"}`}
              style={{ color: liked ? "red" : "gray", cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                onHeartClick();
              }}
            ></i>
          </CardText>
        </CardBody>
      </Card>
    </>
  );
};

export default CardComponent;
