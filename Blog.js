const express = require('express');
const bodyParser = require('body-parser');

// Setting up the express app middleware
const app = express();

app.use(express.static(__dirname + '/blog/dist/blog'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

module.exports = app;