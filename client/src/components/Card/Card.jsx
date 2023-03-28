import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({ image, name, temperament, weight, height, id }) => {
  return (
    <div className={styles.containerCard}>
      <Link to={`/detail/${id}`}>
        <img className={styles.imgCard} src={image} alt={name} />
      </Link>
      <h3>{name}</h3>
      <h4>Temperament: {temperament}</h4>
      <h4>Weight (min-max): {weight} kg</h4>
    </div>
  );
};

export default Card;
