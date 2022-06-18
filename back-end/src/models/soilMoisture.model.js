const db = require("./db");
const Sequelize = require("sequelize");

const SoilMoisture = db.define("soilMoisture", {
  value: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

module.exports = SoilMoisture;
