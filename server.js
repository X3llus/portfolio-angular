// Imports
const express = require("express");
const bodyParser = require("body-parser");
const https = require('https');
const fs = require('fs');

// Setting up the express app middleware
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Setting up routes
const indexRoute = require("./routes/index.js");
const resumeRoute = require("./routes/resume.js");
const headerRoute = require("./routes/header.js");

// Making routes
app.use("/", indexRoute);
app.use("/resume", resumeRoute);
app.use("/header", headerRoute);

// Listening for connections
https.createServer({
  key: fs.readFileSync('./certs/key.pem'),
  cert: fs.readFileSync('./certs/cert.pem'),
  passphrase: 'YOUR PASSPHRASE HERE'
}, app).listen(8080);
