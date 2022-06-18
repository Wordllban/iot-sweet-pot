const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");

const forms = multer();

// create express app
const app = express();

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(cors());

app.use(forms.array());

// define a root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to SweetPot application." });
});

// Require routes
const potsRouter = require("./src/routes/sweetpot.routes")(app);
const temperatureRouter = require("./src/routes/temperature.routes")(app);
const soilMoistureRouter = require("./src/routes/soilMoisture.routes")(app);
const airMoistureRouter = require("./src/routes/airMoisture.routes")(app);

// setup server port
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
