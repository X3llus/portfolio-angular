const express = require('express');
var vhost = require('vhost')
const fs = require('fs');
const http = require('http');
const https = require('https');
const portfolioApp = require('./Portfolio');
const blogApp = require('./Blog');

const credentials = {
  key: fs.readFileSync('/etc/letsencrypt/live/bradencoates.ca/privkey.pem', 'utf8'),
  cert: fs.readFileSync('/etc/letsencrypt/live/bradencoates.ca/fullchain.pem', 'utf8')
}

const app = express();
app.use((req, res, next) => {
    if (!req.secure) {
        return res.redirect('https://' + req.headers.host + req.url);
    }
    next();
});
app.use(express.static(__dirname + '/public', { dotfiles: 'allow' }));
app.use(vhost('www.bradencoates.ca', portfolioApp));
app.use(vhost('blog.bradencoates.ca', blogApp));

// Listening for connections
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => console.log('HTTP Server running on port 80'));
httpsServer.listen(443, () => console.log('HTTPS Server running on port 443'));