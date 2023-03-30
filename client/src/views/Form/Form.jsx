import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDog, getAllTemperaments } from "../../redux/actions";
import { validateInput } from "./Validate";
import golden from "./golden.png"
import styles from "./Form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [setErrorMessage] = useState("");

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
    temperament: "",
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
    const newTemperament = e.target.value.trim();

    if (newTemperament && !input.temperament.includes(newTemperament)) {
      setInput({
        ...input,
        temperament: input.temperament
          ? input.temperament + ", " + newTemperament
          : newTemperament,
      });
    }
  };

  const handleSubmit = async function (e) {
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
      temperament: input.temperament,
    };

    try {
      await dispatch(createDog(newDog));
      setInput({
        name: "",
        weight_min: "",
        weight_max: "",
        height_min: "",
        height_max: "",
        life_span_min: "",
        life_span_max: "",
        image: "",
        temperament: "",
      });
      setErrors({});
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>Create a new breed!</h3>
      <img className={styles.imgForm} src={golden} alt="Golden" />

      <label className={styles.label}>
        Image:
        <input
          type="text"
          name="image"
          value={input.image}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="Insert an image URL"
        />
        {errors.image && <p className={styles.error}>{errors.image}</p>}
      </label>
      <label className={styles.label}>
        Name:
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="Insert the name of the new breed"
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </label>
      <label className={styles.label}>
        Height (min):
        <input
          type="number"
          name="height_min"
          value={input.height_min}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="Insert minimum height"
        />
        {errors.height_min && (
          <p className={styles.error}>{errors.height_min}</p>
        )}
      </label>
      <label className={styles.label}>
        Weight (min):
        <input
          type="number"
          name="weight_min"
          value={input.weight_min}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="Insert minimum weight"
        />
        {errors.weight_min && (
          <p className={styles.error}>{errors.weight_min}</p>
        )}
      </label>
      <label className={styles.label}>
        Height (max):
        <input
          type="number"
          name="height_max"
          value={input.height_max}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="Insert maximum height"
        />
        {errors.height_max && (
          <p className={styles.error}>{errors.height_max}</p>
        )}
      </label>
      <label className={styles.label}>
        Weight (max):
        <input
          type="number"
          name="weight_max"
          value={input.weight_max}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="Insert maximum weight"
        />
        {errors.weight_max && (
          <p className={styles.error}>{errors.weight_max}</p>
        )}
      </label>
      <label className={styles.label}>
        Life Span (min):
        <input
          type="number"
          name="life_span_min"
          value={input.life_span_min}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="Insert minimum life span"
        />
        {errors.life_span_min && (
          <p className={styles.error}>{errors.life_span_min}</p>
        )}
      </label>
      <label className={styles.label}>
        Select Temperaments:
        <select
          className={styles.selectTemperaments}
          onChange={handleTemperamentChange}
        >
          <option value="">Select Temperaments</option>
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
        Life Span (max):
        <input
          type="number"
          name="life_span_max"
          value={input.life_span_max}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="Insert maximum life span"
        />
        {errors.life_span_max && (
          <p className={styles.error}>{errors.life_span_max}</p>
        )}
      </label>
      <label className={styles.label}>
        <p className={styles.tempsSelected}>
          {input.temperament ? input.temperament : "No temperament selected"}
        </p>
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
