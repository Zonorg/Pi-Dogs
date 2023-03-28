import {
  GET_DOGS,
  GET_DOG_NAME,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
  FILTER_BY_ORIGIN,
  GET_ALL_TEMPS,
  FILTER_BY_TEMPER,
  GET_DOG_DETAIL,
  CREATE_DOG,
} from "./action-types";

const initialState = {
  dogs: [],
  dogDetail: {},
  temperaments: [],
  allDogs: [],
};

export default function reducer(state = initialState, action) {
  let aux = [];

  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };

    case GET_DOG_NAME:
      return {
        ...state,
        dogs: action.payload,
      };

    case GET_DOG_DETAIL:
      return {
        ...state,
        dogDetail: action.payload,
      };

    case ORDER_BY_NAME:
      let ordered =
        action.payload === "a-z"
          ? state.dogs.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: ordered,
      };

    case ORDER_BY_WEIGHT:
      const orderBy = action.payload === "max" ? "desc" : "asc"; // Determinar la dirección de ordenamiento según la acción
      const dogs = state.dogs.slice(); // Clonar el array de perros para no modificar el estado actual
      dogs.sort((a, b) => {
        // Ordenar los perros según el peso y la dirección de ordenamiento
        const weightA = parseInt(a.weight.split(" - ")[0]);
        const weightB = parseInt(b.weight.split(" - ")[0]);
        return orderBy === "asc" ? weightA - weightB : weightB - weightA;
      });
      return {
        ...state,
        dogs: dogs,
        orderBy: orderBy, // Actualizar la dirección de ordenamiento actual
      };

    case GET_ALL_TEMPS:
      return {
        ...state,
        temperaments: action.payload,
      };

    case FILTER_BY_ORIGIN:
      const filteredOrigin =
        action.payload === "dbb"
          ? state.allDogs.filter((inst) => inst.from_DB)
          : state.allDogs.filter((inst) => !inst.from_DB);
      return {
        ...state,
        dogs: action.payload === "All" ? state.allDogs : filteredOrigin,
      };

    case FILTER_BY_TEMPER:
      let dogsWithChosenTemps =
        action.payload === "all"
          ? state.allDogs
          : state.allDogs?.filter((dog) => {
              if (!dog.temperament) return undefined;
              return dog.temperament.includes(action.payload);
            });
      return {
        ...state,
        dogs: dogsWithChosenTemps,
      };

    case CREATE_DOG:
      return {
        ...state,
        dogDetail: action.payload,
      };
    default:
      return state;
  }
}
