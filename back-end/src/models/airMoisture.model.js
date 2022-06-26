const db = require("./db");
const sensor = require("./sensor.model");

const AirMoisture = db.define("airMoisture", {
  ...sensor,
});

module.exports = AirMoisture;
