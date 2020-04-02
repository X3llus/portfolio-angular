// Imports
const express = require("express");
const bodyParser = require("body-parser");

// Setting up the express app middleware
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Setting up routes
const indexRoute = require("./routes/index.js");

// Making routes
app.use("/", indexRoute);

// Listening for connections
app.listen(8080, () => console.log("listening on port 8080"));
