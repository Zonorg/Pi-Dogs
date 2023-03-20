const { getAllTemps } = require("../controllers/tempsController");

const getTempsHandler = async (req, res) => {
  try {
    const results = await getAllTemps();
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getTempsHandler };
