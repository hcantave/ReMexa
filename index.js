const express = require("express");
const app = express();

const mongoose = require("mongoose");
const keys = require("./config/dev");
mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);
console.log("Mongo is up");

//house keeping of getting json to work
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
