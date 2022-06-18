const Sequelize = require("sequelize");
const SweetPot = require("../models/sweetPot.model");
const Op = Sequelize.Op;

// Create and Save a new Pot
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const pot = {
    name: req.body.name,
  };

  SweetPot.create(pot)
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
  SweetPot.findAll()
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
