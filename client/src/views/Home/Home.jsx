import React from "react";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.containerHome}>
      <CardsContainer />
    </div>
  );
};

export default Home;
