import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDog, getAllTemperaments } from "../../redux/actions";
import styles from "./Form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  // const temperaments = useSelector((state) => state.temperaments);

  const [input, setInput] = useState({
    name: "",
    weight: "",
    weight_min: "",
    weight_max: "",
    height: "",
    height_min: "",
    height_max: "",
    life_span: "",
    image: "",
    temperament: [],
  });

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, [dispatch]);

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleTemperamentChange = function (e) {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setInput((prevState) => ({
      ...prevState,
      temperament: selectedOptions,
    }));
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    const newDog = {
      name: input.name,
      weight: input.weight,
      weight_min: input.weight_min,
      weight_max: input.weight_max,
      height: input.height,
      height_min: input.height_min,
      height_max: input.height_max,
      life_span: input.life_span,
      image: input.image,
      temperament: input.temperament,
    };
    dispatch(createDog(newDog));
    setInput({
      name: "",
      weight: "",
      weight_min: "",
      weight_max: "",
      height: "",
      height_min: "",
      height_max: "",
      life_span: "",
      image: "",
      temperament: [],
    });
  };
  const [temperament, setTemperament] = useState("all");

  const temperaments = useSelector((state) =>
    [...state.temperaments].sort(function (a, b) {
      if (a < b) return -1;
      else return 1;
    })
  );

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>
        Name:
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={handleInputChange}
          className={styles.input}
          required
        />
      </label>
      <label className={styles.label}>
        Weight:
        <input
          type="number"
          name="weight"
          value={input.weight}
          onChange={handleInputChange}
          className={styles.input}
          required
        />
      </label>
      <label className={styles.label}>
        Height:
        <input
          type="number"
          name="height"
          value={input.height}
          onChange={handleInputChange}
          className={styles.input}
          required
        />
      </label>
      <label className={styles.label}>
        Life span:
        <input
          type="number"
          name="life_span"
          value={input.life_span}
          onChange={handleInputChange}
          className={styles.input}
          required
        />
      </label>
      <label className={styles.label}>
        Image:
        <input
          type="text"
          name="image"
          value={input.image}
          onChange={handleInputChange}
          className={styles.input}
          required
        />
      </label>
      <label className={styles.label}>
        Temperament:
        <select value={temperament} onChange={handleTemperamentChange}>
          <option value="all">Select Temperaments</option>
          {temperaments.map((temp) => {
            return (
              <option value={temp} key={temp}>
                {temp}
              </option>
            );
          })}
        </select>
      </label>
      <button type="submit" className={styles.button}>
        Create breed
      </button>
    </form>
  );
};

export default Form;
