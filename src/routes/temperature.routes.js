module.exports = (app) => {
  const temperatures = require("../controller/temperature.controller");

  var router = require("express").Router();

  // Create a new Device
  router.post("/", temperatures.create);

  // Retrieve all pots
  router.get("/", temperatures.findAll);

  // using a middleware
  app.use("/temperature", router);
};
