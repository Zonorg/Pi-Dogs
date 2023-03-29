import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

// Componente Card que muestra la imagen, nombre, temperamento y peso de cada raza de perro
// Si la raza tiene más de un temperamento, se muestra separado por comas
// Si la raza tiene un solo temperamento, se muestra el nombre del temperament
const Card = ({ image, name, temperament, weight, id, temperaments }) => {
  if (temperaments) {
    temperaments = temperaments.map((temp) => temp.name).join(", ");
  }

  return (
    <div className={styles.containerCard}>
      <Link to={`/detail/${id}`}>
        <img className={styles.imgCard} src={image} alt={name} />
      </Link>
      <h3>{name}</h3>
      {temperaments ? (
        <h4>Temperament: {temperaments}</h4>
      ) : (
        <h4>Temperament: {temperament}</h4>
      )}
      <h4>Weight (min-max): {weight} kg</h4>
    </div>
  );
};

export default Card;
