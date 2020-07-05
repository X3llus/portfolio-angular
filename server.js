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
const errorRoute = require("./routes/404.js");
const headerRoute = require("./routes/header.js");
const indexRoute = require("./routes/index.js");
const resumeRoute = require("./routes/resume.js");
const contactRoute = require("./routes/contact.js");
const projectsRoute = require("./routes/projects.js");

// Making routes
app.use("/header", headerRoute);
app.use("/", indexRoute);
app.use("/projects", projectsRoute);
app.use("/resume", resumeRoute);
app.use("/contact", contactRoute);
app.use("*", errorRoute);

// Listening for connections
app.listen(80, () => console.log("listening on port 8080"));
