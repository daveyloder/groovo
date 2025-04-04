import React from "react";
import { Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";
import styles from "./Card.module.css";

const CardComponent = ({ track }) => {
  return (
    <>
      <Card key={track.id} className={styles.resultCard}>
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
          <i className="bi bi-bookmark-heart"></i>
          </CardText>
        </CardBody>
      </Card>
    </>
  );
};

export default CardComponent;
