const axios = require("axios");
const { Dog } = require("../db");
const { Temperament } = require("../db");
const Sequelize = require("sequelize");

const { URL_API } = process.env;

const arrayFilter = (arr) =>
  arr.map((elem) => {
    return {
      id: elem.id,
      name: elem.name,
      height: elem.height.metric,
      weight: elem.weight.metric,
      temperament: elem.temperament,
      life_span: elem.life_span,
      image: elem.image.url,
      created: false,
    };
  });

// const getAllDogs = async () => {
//   const databaseDogs = await Dog.findAll();

//   const apiDogsRaw = (await axios.get(URL_API)).data;

//   const apiDogs = arrayFilter(apiDogsRaw);

//   return [...databaseDogs, ...apiDogs]; //Mostramos todo lo que hay en databaseDogs mas apiDogsRaw
// };

const getAllDogs = async () => {
  let databaseDogs = await Dog.findAll({
    include: {
      model: Temperament,
      through: {
        attributes: [],
      },
    },
  });

  let apiDogs = [];
  try {
    const response = await axios.get(URL_API);
    apiDogs = arrayFilter(response.data);
  } catch (error) {
    console.error(error);
  }

  let dogs = [...databaseDogs, ...apiDogs];

  const dogsWithTemperament = await Promise.all(
    dogs.map(async (dog) => {
      if (dog.Temperament) {
        const temperament = dog.Temperament.map((t) => t.name);
        return {
          ...dog,
          temperament,
        };
      }
      return dog;
    })
  );

  return dogsWithTemperament;
};

const searchDogByName = async (name) => {
  const Op = Sequelize.Op;
  const databaseDogs = await Dog.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } }, //Op like se usa para traer en este caso desde la bdd el nombre independientemente de mayusculas o minusculas
  });

  const apiDogsRaw = (await axios.get(URL_API)).data;

  const apiDogs = arrayFilter(apiDogsRaw);

  const filteredApi = apiDogs.filter((dog) =>
    dog.name.toLowerCase().includes(name.toLowerCase())
  );

  return [...filteredApi, ...databaseDogs];
};

//Busca por id en la api y en la bdd
//Al no tener la url de la imagen en el detail de la api, se la agregamos al id
//Si el source es numerico es igual a api, si no es igual a bdd
const getDogById = async (id, source) => {
  const dogData =
    source === "api"
      ? (await axios.get(`${URL_API}/${id}`)).data
      : await Dog.findByPk(id, { include: Temperament });

  const imageUrl =
    source === "api"
      ? `https://cdn2.thedogapi.com/images/${dogData.reference_image_id}.jpg`
      : null;

  const dog = {
    id: dogData.id,
    name: dogData.name,
    height: dogData.height.metric,
    temperament: dogData.temperament,
    weight: dogData.weight.metric,
    life_span: dogData.life_span,
    image: imageUrl,
  };
  if (source === "bdd") {
    return dogData;
  } else {
    return dog;
  }
};

const createDog = async (
  image,
  name,
  height,
  weight,
  life_span,
  temperament
) => {
  const dog = await Dog.create({ image, name, height, weight, life_span });

  const temps = temperament.split(",").map((t) => t.trim());

  const tempInstances = await Promise.all(
    temps.map((temp) => {
      return Temperament.findAll({ where: { name: temp } });
    })
  ).then((results) => {
    return results.flat();
  });

  await dog.addTemperaments(tempInstances);

  return dog;
};

const deleteDog = async (id) => {
  const dog = await Dog.findByPk(id);
  if (!dog) {
    throw new Error(`Dog with id ${id} not found`);
  }
  await dog.destroy();
};

module.exports = {
  getAllDogs,
  searchDogByName,
  getDogById,
  createDog,
  deleteDog,
};
