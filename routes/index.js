var express = require("express");
var https = require("https");
var env = require('../env/env');
var router = express.Router();

var google = require("googleapis");
var userData = '';

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express", redirectURL: urlGoogle() });
});

router.get("/loggedin", function (req, res, next) {
  getGoogleAccountFromCode(req.query.code, res);
});

router.get("/data", function (req, res, next) {
  res.render("data", {name: userData.name, email: userData.email, imageUrl: userData.picture })
})

const googleConfig = {
  clientId: env.env.google.clientId,
  clientSecret: env.env.google.clientSecret,
  redirect: env.env.google.redirect,
}

function createConnection() {
  return new google.google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}

const defaultScope = [
  "https://www.googleapis.com/auth/plus.me",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    acces_type: "offline",
    prompt: "consent",
    scope: defaultScope,
  });
}

function urlGoogle() {
  const auth = createConnection();
  const url = getConnectionUrl(auth);
  return url;
}

async function getGoogleAccountFromCode(code, response) {
  const auth = createConnection();

  const { tokens } = await auth.getToken(code);

  auth.setCredentials(tokens);
  https
    .get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokens.id_token}`,
      (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          userData = JSON.parse(data);
          response.redirect("data")
        });
      }
    )
    .on("error", (err) => {
      return error;
    });
}

module.exports = router;
