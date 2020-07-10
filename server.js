// Imports
const express = require("express");
const bodyParser = require("body-parser");
const sitemap = require("express-sitemap");

// Setting up sitemap
sitemap({
  map: {
    "/": ["get"],
    "/resume": ["get"],
    "/projects": ["get"],
    "/contact": ["get", "post"]
  },
  route: {
    "/": {
      lastmod: "2020-07-09",
      changefreq: "always",
      priority: 1.0
    },
    "/resume": {
      lastmod: "2020-07-09",
      changefreq: "always",
      priority: 1.0
    }
  },
  url: "bradencoates.ca"
}).XMLtoFile("./public/sitemap.xml");

// Setting up the express app middleware
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/html", {
  extensions: ["html"]
}));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Setting up routes
const contactRoute = require("./routes/contact.js");
const loginRoute = require("./routes/login.js");
const errorRoute = require("./routes/404.js");

// Making routes
app.use("/contact", contactRoute);
app.use("/login", loginRoute);
app.use("*", errorRoute);

// Listening for connections
app.listen(80, () => console.log("listening on port 80"));