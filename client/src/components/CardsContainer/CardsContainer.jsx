import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByOrigin,
  getDogs,
  orderByName,
  orderByWeight,
  filterByTemper,
  getAllTemperaments,
} from "../../redux/actions";
import Card from "../Card/Card";
import Pagination from "../../utilities/Pagination/Pagination";
import styles from "./CardsContainer.module.css";

const CardsContainer = () => {
  //Conectamos con el store y obtenemos el estado global.
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const [order, setOrder] = useState("");
  const [temperament, setTemperament] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);

  const numOfLastDog = currentPage * dogsPerPage;
  const numOfFirstDog = numOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(numOfFirstDog, numOfLastDog);

  const pagination = (page) => {
    setCurrentPage(page);
  };

  const temperaments = useSelector((state) =>
    [...state.temperaments].sort(function (a, b) {
      if (a < b) return -1;
      else return 1;
    })
  );

  const handleOrderName = (event) => {
    dispatch(orderByName(event.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${event.target.value}`);
  };

  const handleOrderWeight = (event) => {
    dispatch(orderByWeight(event.target.value));
    setCurrentPage(1);
    setOrder(`Ordered by ${event.target.value}`);
  };

  function handleFilter(event) {
    const value = event.target.value;
    if (value === "a-z" || value === "z-a") {
      handleOrderName(event);
    } else if (value === "min" || value === "max") {
      handleOrderWeight(event);
    }
  }

  const handleFilterByOrigin = (event) => {
    dispatch(filterByOrigin(event.target.value));
    setCurrentPage(1);
    setOrder(`Filtered by ${event.target.value}`);
  };

  const handleFilterByTemperament = (event) => {
    setTemperament(event.target.value);
    dispatch(filterByTemper(event.target.value));
    setCurrentPage(1);
    setOrder(`Filtered by ${event.target.value}`);
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getAllTemperaments());
  }, [dispatch]);

  return (
    <>
      <section>
        <select
          defaultValue=""
          onChange={(event) => {
            handleFilter(event);
          }}
        >
          <option value="" disabled hidden>
            Filter and Order by
          </option>
          <option value="a-z">A to Z</option>
          <option value="z-a">Z to A</option>
          <option value="min">Lightest to heaviest</option>
          <option value="max">Heaviest to lightest</option>
        </select>

        <select
          onChange={(event) => {
            handleFilterByOrigin(event);
          }}
        >
          <option value="All">All breeds</option>
          <option value="api">Api breeds</option>
          <option value="from_DB">My breeds</option>
        </select>

        <select
          value={temperament}
          onChange={(event) => {
            handleFilterByTemperament(event);
          }}
        >
          <option value="all">Temperaments</option>
          {temperaments.map((temp) => {
            return (
              <option value={temp} key={temp}>
                {temp}
              </option>
            );
          })}
        </select>
      </section>

      <div className={styles.cardsContainer}>
        {currentDogs?.map((dog) => {
          return (
            <div key={dog.id}>
              <Card
                id={dog.id}
                key={dog.id}
                image={dog.image}
                name={dog.name}
                temperament={dog.temperament}
                temperaments={dog.temperaments}
                weight={dog.weight}
              />
            </div>
          );
        })}
      </div>
      <Pagination
        dogsPerPage={dogsPerPage}
        dogs={dogs.length}
        pagination={pagination}
        currentPage={currentPage}
      />
    </>
  );
};

export default CardsContainer;
