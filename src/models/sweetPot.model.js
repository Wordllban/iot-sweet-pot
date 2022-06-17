const Sequelize = require("sequelize");
const db = require("./db");
const Temperature = require("./temperature.model");
const AirMoisture = require("./airMoisture.model");
const SoilMoisture = require("./soilMoisture.model");

const SweetPot = db.define(
  "sweetPot",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

SweetPot.hasMany(Temperature);
Temperature.belongsTo(SweetPot);

SweetPot.hasMany(AirMoisture);
AirMoisture.belongsTo(SweetPot);

SweetPot.hasMany(SoilMoisture);
SoilMoisture.belongsTo(SweetPot);

db.sync().then(() => {
  console.log("Database sync - done.")
});

module.exports = SweetPot;
