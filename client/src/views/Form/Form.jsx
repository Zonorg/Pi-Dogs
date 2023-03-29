import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDog, getAllTemperaments } from "../../redux/actions";
import styles from "./Form.module.css";
import { validateInput } from "./Validate";

const Form = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [temperament] = useState([]);

  const temperaments = useSelector((state) =>
    [...state.temperaments].sort(function (a, b) {
      if (a < b) return -1;
      else return 1;
    })
  );

  const [input, setInput] = useState({
    name: "",
    weight_min: "",
    weight_max: "",
    height_min: "",
    height_max: "",
    life_span_min: "",
    life_span_max: "",
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
      temperament: selectedOptions.join(", "), // uno los valores seleccionados en una cadena separada por comas
    }));
  };
  const handleSubmit = function (e) {
    e.preventDefault();
    // Validacion de los inputs
    const errors = validateInput(input);
    setErrors(errors);

    // Si hay errores no envia el formulario
    if (Object.keys(errors).length > 0) {
      return;
    }

    const newDog = {
      name: input.name,
      weight: `${input.weight_min} - ${input.weight_max}`,
      height: `${input.height_min} - ${input.height_max}`,
      life_span: `${input.life_span_min} - ${input.life_span_max} years`,
      image: input.image,
      temperament: input.temperament, // enviar la cadena separada por comas
    };

    dispatch(createDog(newDog));
    setInput({
      name: "",
      weight_min: "",
      weight_max: "",
      height_min: "",
      height_max: "",
      life_span_min: "",
      life_span_max: "",
      image: "",
      temperament: [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>Create a new breed!</h3>
      <label className={styles.label}>
        Name:
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={handleInputChange}
          className={styles.input}
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </label>
      <label className={styles.label}>
        Image:
        <input
          type="text"
          name="image"
          value={input.image}
          onChange={handleInputChange}
          className={styles.input}
        />
        {errors.image && <p className={styles.error}>{errors.image}</p>}
      </label>
      <label className={styles.label}>
        Weight (minimum):
        <input
          type="number"
          name="weight_min"
          value={input.weight_min}
          onChange={handleInputChange}
          className={styles.input}
        />
        {errors.weight_min && (
          <p className={styles.error}>{errors.weight_min}</p>
        )}
      </label>
      <label className={styles.label}>
        Weight (maximum):
        <input
          type="number"
          name="weight_max"
          value={input.weight_max}
          onChange={handleInputChange}
          className={styles.input}
        />
        {errors.weight_max && (
          <p className={styles.error}>{errors.weight_max}</p>
        )}
      </label>
      <label className={styles.label}>
        Height (minimum):
        <input
          type="number"
          name="height_min"
          value={input.height_min}
          onChange={handleInputChange}
          className={styles.input}
        />
        {errors.height_min && (
          <p className={styles.error}>{errors.height_min}</p>
        )}
      </label>
      <label className={styles.label}>
        Height (maximum):
        <input
          type="number"
          name="height_max"
          value={input.height_max}
          onChange={handleInputChange}
          className={styles.input}
        />
        {errors.height_max && (
          <p className={styles.error}>{errors.height_max}</p>
        )}
      </label>
      <label className={styles.label}>
        Life Span (minimum):
        <input
          type="number"
          name="life_span_min"
          value={input.life_span_min}
          onChange={handleInputChange}
          className={styles.input}
        />
        {errors.life_span_min && (
          <p className={styles.error}>{errors.life_span_min}</p>
        )}
      </label>
      <label className={styles.label}>
        Life span (maximum):
        <input
          type="number"
          name="life_span_max"
          value={input.life_span_max}
          onChange={handleInputChange}
          className={styles.input}
        />
        {errors.life_span_max && (
          <p className={styles.error}>{errors.life_span_max}</p>
        )}
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
      <label className={styles.label}>
        Temperament:
        <input
          type="text"
          name="temperament"
          value={input.temperament}
          onChange={handleInputChange}
          className={styles.input}
        />
        {errors.temperament && (
          <p className={styles.error}>{errors.temperament}</p>
        )}
      </label>
      <button type="submit" className={styles.button}>
        Create breed
      </button>
    </form>
  );
};

export default Form;
