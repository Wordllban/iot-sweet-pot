module.exports = (app) => {
  const airMoistures = require("../controller/airMoisture.controller");

  var router = require("express").Router();

  // Create & save a new data from soil moisture sensor
  router.post("/", airMoistures.create);

  // Retrieve all data from soil moisture sensor
  router.get("/", airMoistures.findAll);

  // using a middleware
  app.use("/air-moisture", router);
};
