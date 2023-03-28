const { DataTypes } = require("sequelize");
const Dog = require("./Dog");
const Temperament = require("./Temperament");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dogTemperament",
    {
      dogId: {
        type: DataTypes.UUID,
        refereces: {
          model: Dog,
          key: "id",
        },
      },

      temperamentId: {
        type: DataTypes.INTEGER,
        refereces: {
          model: Temperament,
          key: "id",
        },
      },
    },
    { timestamps: false }
  );
};
