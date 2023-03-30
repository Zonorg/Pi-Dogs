import {
  GET_DOGS,
  GET_ALL_TEMPS,
  GET_DOG_NAME,
  GET_DOG_DETAIL,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
  FILTER_BY_ORIGIN,
  FILTER_BY_TEMPER,
  CREATE_DOG,
  CREATE_DOG_ERROR,
} from "./action-types";
import axios from "axios";

export const getDogs = () => {
  return async function (dispatch) {
    const info = await axios("http://localhost:3001/dogs");
    return dispatch({
      type: GET_DOGS,
      payload: info.data,
    });
  };
};

export const getAllTemperaments = () => {
  return async function (dispatch) {
    let info = await axios.get("http://localhost:3001/temperaments");
    let tempsList = info.data.map((element) => element.name);
    return dispatch({
      type: GET_ALL_TEMPS,
      payload: tempsList,
    });
  };
};

export const getDogByName = (name) => {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/dogs?breed=${name}`);
      return dispatch({
        type: GET_DOG_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDogDetail = (id) => {
  return async function (dispatch) {
    let dogId = await axios(`http://localhost:3001/dogs/${id}`);

    return dispatch({
      type: GET_DOG_DETAIL,
      payload: dogId.data,
    });
  };
};

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};

export const orderByWeight = (payload) => {
  return {
    type: ORDER_BY_WEIGHT,
    payload,
  };
};

export const filterByOrigin = (payload) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload,
  };
};

export const filterByTemper = (payload) => {
  return {
    type: FILTER_BY_TEMPER,
    payload,
  };
};

export const createDog = (payload) => {
  return async function (dispatch) {
    try {
      const newDog = await axios.post("http://localhost:3001/dogs", payload);
      dispatch({
        type: CREATE_DOG,
        payload: newDog.data,
      });
      return newDog.data;
    } catch (error) {
      console.error(error);
      const errorMessage = error.response.data;
      dispatch({
        type: CREATE_DOG_ERROR,
        payload: errorMessage, // Despachamos el error
      });
      throw new Error(errorMessage);
    }
  };
};
