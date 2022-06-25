const db = require("./db");
const sensor = require("./sensor.model");

const SoilMoisture = db.define("soilMoisture", {
  ...sensor,
});

module.exports = SoilMoisture;
