module.exports = (app) => {
  const pots = require("../controller/sweetpot.controller");

  var router = require("express").Router();

  // Create a new Pot
  router.post("/", pots.create);

  // Retrieve all Pots
  router.get("/", pots.findAll);

  // Retrieve a single Device with id
  router.get("/:id", pots.findOne);

  // Update a Pot with id
  //router.put("/:id", pots.update);

  // Delete a Pot with id
  //router.delete("/:id", pots.delete);

  // using a middleware
  app.use("/sweetpot", router);
};
