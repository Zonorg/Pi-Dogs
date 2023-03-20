const axios = require("axios");
const { Dog } = require("../db");
const Sequelize = require("sequelize");
const { API_KEY } = process.env;

const arrayFilter = (arr) =>
  arr.map((elem) => {
    return {
      id: elem.id,
      image: elem.image,
      name: elem.name,
      height: elem.height,
      weight: elem.weight,
      life_span: elem.life_span,
      created: false,
    };
  });

const getAllDogs = async () => {
  const databaseDogs = await Dog.findAll();

  const apiDogsRaw = (
    await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
  ).data;

  const apiDogs = arrayFilter(apiDogsRaw);

  return [...databaseDogs, ...apiDogs]; //Mostramos todo lo que hay en databaseDogs mas apiDogsRaw
};

const searchDogByName = async (name) => {
  const Op = Sequelize.Op;
  const databaseDogs = await Dog.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } }, //Op like se usa para traer en este caso desde la bdd el nombre independientemente de mayusculas o minusculas
  });

  const apiDogsRaw = (
    await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
  ).data;

  const apiDogs = arrayFilter(apiDogsRaw);

  const filteredApi = apiDogs.filter((dog) =>
    dog.name.toLowerCase().includes(name.toLowerCase())
  );

  return [...filteredApi, ...databaseDogs];
};

const getDogById = async (id, source) => {
  const dog =
    source === "api"
      ? (
          await axios.get(
            `https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`
          )
        ).data
      : await Dog.findByPk(id);

  return dog;
};

const createDog = async (image, name, height, weight, life_span) => {
  await Dog.create({ image, name, height, weight, life_span });
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
