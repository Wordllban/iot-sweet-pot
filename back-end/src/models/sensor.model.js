const Sequelize = require("sequelize");

const Sensor = {
  value: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
};

module.exports = Sensor;
