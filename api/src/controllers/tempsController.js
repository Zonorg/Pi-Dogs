const axios = require("axios");
const { API_KEY } = process.env;

const arrayFilter = (arr) =>
  arr.reduce((acc, elem) => {
    if (elem.temperament) {
      const temps = elem.temperament.split(",").map((temp) => temp.trim());
      acc.push(...temps);
    }
    return acc;
  }, []);

const getAllTemps = async () => {
  const apiDogsRaw = (
    await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
  ).data;

  const apiTemps = arrayFilter(apiDogsRaw);

  const uniqueTemps = [...new Set(apiTemps)].sort(); // Aquí se agrega el método sort()

  return { temperament: uniqueTemps };
};
module.exports = { getAllTemps };
