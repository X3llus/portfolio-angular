// Imports
const express = require("express");
const bodyParser = require("body-parser");
const sitemap = require("express-sitemap");
const session = require("express-session");
const uuid = require('uuid');
const auth = require("./private.json");
const FileStore = require('session-file-store')(session);

const fs = require('fs');
const http = require('http');
const https = require('https');

const credentials = {
  key: fs.readFileSync('/etc/letsencrypt/live/bradencoates.ca/privkey.pem', 'utf8'),
  cert: fs.readFileSync('/etc/letsencrypt/live/bradencoates.ca/fullchain.pem', 'utf8')
}

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
app.use(express.static(__dirname + "/public", { dotfiles: "allow" }));
app.use(express.static(__dirname + "/client/dist/portfolio"));
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

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => console.log("HTTP Server running on port 80"));
httpsServer.listen(443, () => console.log("HTTPS Server running on port 443"));
