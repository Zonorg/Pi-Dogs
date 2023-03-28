import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getAllTemperaments, createDog } from "../../redux/actions";

const Form = ({ createDog, getAllTemperaments, temperaments }) => {
  const [formData, setFormData] = useState({
    name: "",
    weightMin: "",
    weightMax: "",
    heightMin: "",
    heightMax: "",
    life: "",
    image: "",
    temperament: [],
  });

  const {
    name,
    weightMin,
    weightMax,
    heightMin,
    heightMax,
    life,
    image,
    temperament,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onTemperamentChange = (e) =>
    setFormData({
      ...formData,
      temperament: [...formData.temperament, e.target.value],
    });

  useEffect(() => {
    getAllTemperaments();
  }, [getAllTemperaments]);

  const onSubmit = (e) => {
    e.preventDefault();
    createDog(formData);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          required
        />

        <label>Weight Range (min - max):</label>
        <input
          type="number"
          name="weightMin"
          value={weightMin}
          onChange={onChange}
          required
        />
        <input
          type="number"
          name="weightMax"
          value={weightMax}
          onChange={onChange}
          required
        />

        <label>Height Range (min - max):</label>
        <input
          type="number"
          name="heightMin"
          value={heightMin}
          onChange={onChange}
          required
        />
        <input
          type="number"
          name="heightMax"
          value={heightMax}
          onChange={onChange}
          required
        />

        <label>Life Expectancy:</label>
        <input
          type="text"
          name="life"
          value={life}
          onChange={onChange}
          required
        />

        <label>Image URL:</label>
        <input
          type="url"
          name="image"
          value={image}
          onChange={onChange}
          required
        />

        <label>Temperament:</label>
        <select name="temperament" onChange={onTemperamentChange}>
          {temperaments.map((temp) => (
            <option key={temp} value={temp}>
              {temp}
            </option>
          ))}
        </select>

        <button type="submit">Create Dog</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  temperaments: state.temperaments.temperamentsList,
});

export default connect(mapStateToProps, { createDog, getAllTemperaments })(
  Form
);
