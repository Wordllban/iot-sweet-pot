module.exports = (app) => {
    const soilMoistures = require("../controller/soilMoisture.controller");
  
    var router = require("express").Router();
  
    // Create & save a new data from soil moisture sensor 
    router.post("/", soilMoistures.create);
  
    // Retrieve all data from soil moisture sensor
    router.get("/", soilMoistures.findAll);
  
    // using a middleware
    app.use("/soil-moisture", router);
  };
  