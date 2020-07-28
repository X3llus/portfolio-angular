// Imports
const express = require("express");
const bodyParser = require("body-parser");
const sitemap = require("express-sitemap");
const session = require("express-session");
const uuid = require('uuid');
const auth = require("./private.json");
const FileStore = require('session-file-store')(session);
var path = require('path');

// Salt 12

// Setting up sitemap
sitemap({
  map: {
    "/": ["get"],
    "/#/": ["get"],
    "/#/home": ["get"],
    "/#/resume": ["get"],
    "/#/projects": ["get"],
    "/#/contact": ["get"],
    "/contact": ["post"]
  },
  url: "bradencoates.ca"
}).XMLtoFile("./public/sitemap.xml");

// Setting up the express app middleware
const app = express();
app.use(express.static(__dirname + "/client/dist/portfolio"));
app.use('/public', express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(session({
  genid: (req) => {
    return uuid.v4();
  },
  store: new FileStore(),
  secret: auth.secret,
  resave: false,
  saveUninitialized: true
}));

const api = require("./routes/api.js");

app.use("/api", api);

// Listening for connections
app.listen(80, () => console.log("listening on port 80"));