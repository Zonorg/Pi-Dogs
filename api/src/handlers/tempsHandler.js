const {
  getAllTemps,
  saveTemperaments,
} = require("../controllers/tempsController");

// get /temps
const getTempsHandler = async (req, res) => {
  try {
    const results = await getAllTemps();
    await saveTemperaments();
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getTempsHandler };
