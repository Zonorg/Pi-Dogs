import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from "./logo.png";
import SearchBar from "./SearchBar";

const NavBar = () => {
  const location = useLocation();

  return (
    <div className={styles.containerNav}>
      <Link to="/home">
        <img
          className={styles.logo}
          src={logo}
          alt="Logo"
          onClick={() => window.scrollTo(0, 0)}
        />
      </Link>
      <Link to="/create" onClick={() => window.scrollTo(0, 0)}>
        CREATE DOG
      </Link>
      {location.pathname === "/home" && <SearchBar />}
    </div>
  );
};

export default NavBar;
