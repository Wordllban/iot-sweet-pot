const Sequelize = require("sequelize");
const SoilMoisture = require("../models/soilMoisture.model");
const Op = Sequelize.Op;

// Create and Save a new sensor data
exports.create = (req, res) => {
  // Validate request
  if (!req.body.value) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  if (!req.body.sweetPotId) {
    res.status(400).send({
      message: "Cannot send data to unlinked device!",
    });
    return;
  }

  const soilMoisture = {
    value: req.body.value,
    sweetPotId: req.body.sweetPotId,
  };

  SoilMoisture.create(soilMoisture)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while saving sensor data.",
      });
    });
};

// Retrieve all sensor data from the database.
exports.findAll = (req, res) => {
  SoilMoisture.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sensor data.",
      });
    });
};

// Find a single sensor data with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  SoilMoisture.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Pot with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving sernsor data with id=" + id,
      });
    });
};
