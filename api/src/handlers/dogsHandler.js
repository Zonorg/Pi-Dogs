const {
  getAllDogs,
  searchDogByName,
  getDogById,
  createDog,
} = require("../controllers/dogsController");

// get /dogs y /dogs?breed="..."
const getDogHandler = async (req, res) => {
  const { breed } = req.query;

  try {
    const results = breed ? await searchDogByName(breed) : await getAllDogs();
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get /dogs/{id}
const getDogIdHandler = async (req, res) => {
  const { id } = req.params;

  const source = isNaN(id) ? "bdd" : "api";

  try {
    const dog = await getDogById(id, source);
    res.status(200).json(dog);
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

// post /dogs
const createDogHandler = async (req, res) => {
  const { image, name, height, weight, life_span, temperament } = req.body;
  try {
    const newDog = await createDog(
      image,
      name,
      height,
      weight,
      life_span,
      temperament
    );
    res.status(201).json(newDog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getDogHandler, getDogIdHandler, createDogHandler };
