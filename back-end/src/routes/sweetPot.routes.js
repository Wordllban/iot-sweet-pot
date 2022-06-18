module.exports = (app) => {
  const pots = require("../controller/sweetpot.controller");

  var router = require("express").Router();

  // Create a new Device
  router.post("/", pots.create);

  // Retrieve all pots
  router.get("/", pots.findAll);

  // Retrieve a single Device with id
  router.get("/:id", pots.findOne);

  // Update a Device with id
  // router.put("/:id", pots.update);

  // Delete a Device with id
  // router.delete("/:id", pots.delete);

  // using a middleware
  app.use("/sweetpot", router);
};
