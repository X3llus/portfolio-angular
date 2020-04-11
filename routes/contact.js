// Requirements
var express = require("express");
var router = express.Router();
var path = require("path");
var nodemailer = require("nodemailer");
var email = require("../private.json");

// Variables
var transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: email.sender,
    pass: email.password
  }
});

// Mail class
class Mail {
  constructor(name, mail, text) {
    this.from = email.sender;
    this.to = email.myEmail;
    this.subject = name + " | " + mail;
    this.text = text;
    this.options = {
      from: this.from,
      to: this.to,
      subject: this.subject,
      text: this.text
    };
  }

  send() {
    transporter.sendMail(this.options, function(error, info) {
      if (error) {
        throw error;
      } else {
        return 'Email sent: ' + info.response;
      }
    });
  }
}

//function for sending message
async function sendMessage(req) {
  var body = req.body;
  var name = body.name;
  var mail = body.email;
  var text = body.text;

  mail = new Mail(name, mail, text);
  return mail.send()
}

// setting up router
router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../html/contact.html"));
});

router.post("/", (req, res) => {
  sendMessage(req)
    .then(value => {
      res.sendFile(path.resolve(__dirname + "/../html/contact.html"));
    })
    .catch(err => {
      res.send("ERROR");
      console.log(err);
    });
});

module.exports = router;
