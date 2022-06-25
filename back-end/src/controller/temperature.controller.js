const Temperature = require("../models/temperature.model");

// Create and Save a new Pot
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

  const temperature = {
    value: req.body.value,
    sweetPotId: req.body.sweetPotId,
  };

  Temperature.create(temperature)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Pot.",
      });
    });
};

// Retrieve all Pot from the database.
exports.findAll = (req, res) => {
  Temperature.findAll({
    limit: 5,
    order: [["createdAt", "DESC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Pots.",
      });
    });
};

// Find a single Pot with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  SweetPot.findByPk(id)
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
        message: err.message || "Error retrieving Pot with id=" + id,
      });
    });
};
