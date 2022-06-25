const AirMoisture = require("../models/airMoisture.model");

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

  const airMoisture = {
    value: req.body.value,
    sweetPotId: req.body.sweetPotId,
  };

  AirMoisture.create(airMoisture)
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
  AirMoisture.findAll({
    limit: 5,
    order: [["createdAt", "DESC"]],
  })
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

  AirMoisture.findByPk(id)
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
