import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDog, getAllTemperaments } from "../../redux/actions";
import Validate from "./Validate.jsx";
import styles from "./Form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const [inputs, setInputs] = useState({
    name: "",
    height: "",
    life_span: "",
    image: "",
    weightMin: "0",
    weightMax: "0",
    temperaments: [],
  });

  const [error, setErrors] = useState({});

  const handleInputs = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
    setErrors(
      Validate({
        ...inputs,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleTemperamentChoices = (event) => {
    setInputs({
      ...inputs,
      temperaments: [...inputs.temperaments, event.target.value],
    });
  };

  const handleDelete = (temp) => {
    setInputs({
      ...inputs,
      temperaments: inputs.temperaments.filter((inst) => inst !== temp),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createDog(inputs));
    alert("Dog successfully added");
    setInputs({
      name: "",
      height: "",
      life_span: "",
      image: "",
      weightMin: "",
      weightMax: "",
      temperaments: [],
    });
  };

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, []);

  return (
    <div>
      <h1>Create a new Dog:</h1>
      <form>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={inputs.name}
            placeholder={"Dog's name"}
            onChange={(event) => handleInputs(event)}
          />
          {error.name && <strong>{error.name}</strong>}
        </div>

        <div>
          <label>Image:</label>
          <input
            type="text"
            name="image"
            value={inputs.image}
            placeholder={"Dog's image URL"}
            onChange={(event) => handleInputs(event)}
          />
          {error.image && <strong>{error.image}</strong>}
        </div>

        <div>
          <h4>Weight:</h4>
          <label>Min: </label>
          <input
            type="number"
            name="weightMin"
            value={inputs.weightMin}
            onChange={(event) => handleInputs(event)}
          />
          {error.weightMin && <strong>{error.weightMin}</strong>}

          <label>Max: </label>
          <input
            type="number"
            name="weightMax"
            value={inputs.weightMax}
            onChange={(event) => handleInputs(event)}
          />
        </div>

        <div>
          <label>Height(en centímetros):</label>
          <input
            type="text"
            name="height"
            value={inputs.height}
            placeholder={"Por ejemplo: 40 - 65"}
            onChange={(event) => handleInputs(event)}
          />
          {error.height && <strong>{error.height}</strong>}
        </div>

        <div>
          <label>Life Span: </label>
          <input
            type="number"
            name="life_span"
            value={inputs.life_span}
            placeholder={"Por ejemplo: 12 - 17"}
            onChange={(event) => handleInputs(event)}
          />
          {error.life_span && <strong>{error.life_span}</strong>}
        </div>

        <h5>Temperaments:</h5>
        <select
          value={temperaments}
          onChange={(event) => handleTemperamentChoices(event)}
        >
          <option value="all"></option>
          {temperaments.map((temp) => {
            return (
              <option value={temp} key={temp}>
                {temp}
              </option>
            );
          })}
        </select>
        <h4>Mi perro es:</h4>
        <ul>
          <li>{inputs.temperaments.map((temp) => temp + " ,")}</li>
        </ul>
        <button
          type="submit"
          onClick={(event) => handleSubmit(event)}
          disabled={
            error.name ||
            error.image ||
            error.weightMax ||
            error.weightMin ||
            error.height ||
            error.life_span ||
            error.temperaments ||
            !inputs.name
          }
        >
          Add my dog
        </button>
      </form>
      {inputs.temperaments.map((temp) => (
        <div>
          <p>{temp}</p>
          <button
            onClick={() => {
              handleDelete(temp);
            }}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default Form;
