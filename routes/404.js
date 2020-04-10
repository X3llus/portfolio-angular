// requirements
var express = require("express");
var router = express.Router();
var path = require("path");

// GET request to /
router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../html/404.html"));
});

module.exports = router;
