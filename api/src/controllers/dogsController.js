const { Dog } = require("../db");

const createDog = async (image, name, height, weight, lifeExpectancy) => {
  await Dog.create({ image, name, height, weight, lifeExpectancy });
};

module.exports = { createDog };
