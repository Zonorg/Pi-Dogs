const axios = require("axios");
const { Temperament } = require("../db");
const { URL_API } = process.env;

//Controlador para lograr hacer un get a la api, filtrar los temperamentos, ordenarlos alfabeticamente
//y asignarles un id incremental

// en getAllTemps traigo todos los temperamentos de la api y los guardo en un array
// asigno cada temperamento un id incremental y de forma alfabética
// si el temperamento ya existe en la db, no lo guarda
const getAllTemps = async () => {
  const apiDogsRaw = (await axios.get(URL_API)).data;

  const tempMap = new Map();
  apiDogsRaw.forEach((elem) => {
    if (elem.temperament) {
      const temps = elem.temperament.split(",").map((temp) => temp.trim());
      temps.forEach((temp) => {
        if (!tempMap.has(temp)) {
          tempMap.set(temp, tempMap.size + 1);
        }
      });
    }
  });

  const apiTemps = Array.from(tempMap, ([name, id]) => ({ id, name }));

  const uniqueTemps = apiTemps.sort((a, b) => {
    // ordenar alfabéticamente
    const nameComparison = a.name.localeCompare(b.name);
    if (nameComparison !== 0) {
      return nameComparison;
    }
    // ordenar por id de menor a mayor
    return a.id - b.id;
  });

  // Reasignar los IDs de menor a mayor
  let id = 1;
  uniqueTemps.forEach((temp) => {
    temp.id = id;
    id++;
  });

  return uniqueTemps;
};

//Guarda los temperamentos en la db
//Si el temperamento ya existe, no lo guarda
const saveTemperaments = async () => {
  const temps = await getAllTemps();
  await Temperament.bulkCreate(temps, { ignoreDuplicates: true });
  console.log("Temperaments saved successfully!");
};

module.exports = { getAllTemps, saveTemperaments };
