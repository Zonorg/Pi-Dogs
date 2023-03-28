import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogByName } from "../../redux/actions";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    dispatch(getDogByName(value));
  };

  return (
    <div className={styles.containerSearch}>
      <input
        placeholder="Search Breed"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
