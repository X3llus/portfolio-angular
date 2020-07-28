var express = require("express");
var router = express.Router();

// Setting up routes
const contactRoute = require("./contact.js");
const loginRoute = require("./login.js");

// Making routes
router.use("/contact", contactRoute);
router.use("/login", loginRoute);

module.exports = router;