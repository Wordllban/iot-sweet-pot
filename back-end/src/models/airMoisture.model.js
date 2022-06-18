const db = require("./db");
const Sequelize = require("sequelize");

const AirMoisture = db.define(
  "airMoisture",
  {
    value: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  }
);

module.exports = AirMoisture;
