import React from "react";
import { Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";
import styles from "./Card.module.css";

const CardComponent = ({ track, albumImage, onClick }) => {
  return (
    <>
      <Card
        key={track.id}
        className={`${styles.resultCard} ${styles.clickableCard}`}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault(); // prevent page scroll with space
            onClick();
          }
        }}
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
            {track.artists?.map((a) => a.name).join(", ") || "Unknown Artist"}
          </CardText>
          <CardText>
            <i className="bi bi-bookmark-heart"></i>
          </CardText>
        </CardBody>
      </Card>
    </>
  );
};

export default CardComponent;
