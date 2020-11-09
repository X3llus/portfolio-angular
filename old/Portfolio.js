// Imports
const express = require('express');
const bodyParser = require('body-parser');
const sitemap = require('express-sitemap');
const session = require('express-session');
const uuid = require('uuid');
const auth = require('./private.json');
const FileStore = require('session-file-store')(session);

// Salt 12

// Setting up sitemap
sitemap({
  map: {
    '/': ['get'],
    '/#/': ['get'],
    '/#/home': ['get'],
    '/#/resume': ['get'],
    '/#/projects': ['get'],
    '/#/contact': ['get'],
    '/contact': ['post']
  },
  url: 'bradencoates.ca'
}).XMLtoFile('./public/sitemap.xml');

// Setting up the express app middleware
const app = express();

// app.use((req, res, next) => {
//   if (!req.secure) {
//     return res.redirect('https://' + req.headers.host + req.url);
//   }
//   next();
// });
app.use(express.static(__dirname + '/portfolio/dist/portfolio'));
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

const api = require('./routes/api.js');

app.use('/api', api);

module.exports = app;
