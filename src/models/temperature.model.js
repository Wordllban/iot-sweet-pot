const db = require("./db");
const Sequelize = require("sequelize");

const Temperature = db.define("temperature", {
  value: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

module.exports = Temperature;
