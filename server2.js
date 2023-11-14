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
const req = require('express/lib/request');
const cookieParser = require("cookie-parser");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const sql = require("mysql")
var bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const { receiveMessageOnPort } = require('worker_threads');
const saltRounds = 10;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
var url = require('url');

const oneDay = 1000 * 60 * 60 * 24;

var S;

const GIGAKEY = "GIGAKEY";

var session = require('express-session')
app.set("trust proxy", 1);
app.use(session({
  secret: "zeftordaunpizanautist",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
}));




app.use(express.static(__dirname));//what?

function confirmUserLogin(providedPassword, providedUsername, callback) {
  const SQL_QUERY = `SELECT * FROM USERS WHERE userName='${providedUsername}';`
  getResult(SQL_QUERY, function (err, result) {
    if (!err) {
      const sessionToken = new Date().getTime().toString(10);
      if (result[0] == undefined)//ТУПОЙ МЕТОД ЗАМЕНИ КОГДА НИБУДЬ
      {
        callback(1)
        return;
      }
      else {
        if (result[0].userPassword == "password1" && providedPassword == "password1")// for debugging REMOVE LATER
        {
          var updateSessionTokenSQL = `UPDATE USERS SET sessionId='${sessionToken}'`;
          getResult(updateSessionTokenSQL, function () {
            console.log(result[0].userID);
            callback(0, sessionToken, result[0].userID);
            return;
          })
        }
        const hashedPass = result[0].userPassword;
        if (comparePasswords(providedPassword, hashedPass)) {
          var updateSessionTokenSQL = `UPDATE USERS SET sessionId='${sessionToken}'`;
          getResult(updateSessionTokenSQL, function () {
            console.log(result[0].userID);
            callback(0, sessionToken, result[0].userID);
            return;
          })
        }
      }
    } else {
      callback(1);
      return;
    }

  });
  return;
}

app.get("/", (r, s) => {
  s.sendFile(__dirname + "index.html");
})

app.get("/home", (r, s) => {
  s.setHeader("Cache-Control", "no-cache")
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

app.get("/course", (r, s) => {
  s.setHeader("Cache-Control", "no-cache")
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

app.post("/accountPage.html", (r, s) => {
  const body = r.body;
  s.setHeader("Cache-Control", "no-cache")
  console.log("req recieved")
  if (body.key == GIGAKEY) {
    S = r.session;
    S.key = GIGAKEY;
    s.send("verified");
  }
})

app.get('/logout', (req, res) => {
  res.setHeader("Cache-Control", "no-cache")
  req.session.destroy();
  res.redirect('/');
});

app.get("/client", (req, res) => {
  res.setHeader("Cache-Control", "no-cache")

})

server.listen(8080, () => {
  console.log("running on 8080");
});