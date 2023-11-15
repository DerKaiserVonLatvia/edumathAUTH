const path = require('path')
//const env = require('dotenv').config({ path: ".gitignore\\dev.env" })// current .env file
/*
environment variables:
DB_HOST
DB_USER
DB_PASSWORD
DB_DATABASE
DB_PORT
DB_DATABASE
*/
const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();
const http = require('http');
const server = http.createServer(app);
var bodyParser = require('body-parser')
const { receiveMessageOnPort } = require('worker_threads');
const saltRounds = 10;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const oneDay = 1000 * 60 * 60 * 24;

var S;

const GIGAKEY = "GIGAKEY";

var session = require('express-session');
const exp = require('constants');
app.set("trust proxy", 1);
app.use(session({
  secret: "zeftordaunpizanautist",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
}));




app.use(express.static(__dirname));//what?
  

app.get("/course", (r, s) => {
  const payload = r.body;
  S = r.session;
  if (S.key) {
    console.log("can enter")
    s.sendFile(__dirname + "/course.html");
  } else {
    console.log("cant enter.")
    s.redirect(303, "/");
  }
})

app.get("/home", (r, s) => {
  const payload = r.body;
  S = r.session;
  if (S.key) {
    console.log("can enter")
    s.sendFile(__dirname + "/accountPage.html");
  } else {
    console.log("cant enter.")
    s.redirect(303, "/");
  }
})

app.post("/accountPage.html", (r, s) => {
  const body = r.body;
  console.log("req recieved")
  if (body.key == GIGAKEY) {
    S = r.session;
    S.key = GIGAKEY;
    s.send("verified");
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});



server.listen(8080, () => {
  console.log("running on 8080");
});