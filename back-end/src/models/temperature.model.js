const db = require("./db");
const sensor = require("./sensor.model");

const Temperature = db.define("temperature", {
  ...sensor,
});

module.exports = Temperature;
