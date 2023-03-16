const { createDog } = require("../controllers/dogsController");

const getDogHandler = (req, res) => {
  const { name } = req.query;
  if (name) res.send(`Mostrando dog name ${name}`);
  else res.send("Todos los perros");
};

const getDogIdHandler = (req, res) => {
  const { id } = req.params;
  res.send(`Get Dog Id ${id}`);
};

const createDogHandler = async (req, res) => {
  try {
    const { image, name, height, weight, lifeExpectancy } = req.body;
    const newDog = await createDog(image, name, height, weight, lifeExpectancy);
    res.status(201).json(newDog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getDogHandler, getDogIdHandler, createDogHandler };
