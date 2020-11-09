// requirements
var express = require("express");
var router = express.Router();
var path = require("path");

// GET request to /
router.post("/", (req, res) => {

    res.send("logged in");
});

router.post("/verify", (req, res) => {

});

module.exports = router;