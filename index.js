const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const passport = require("passport");
//getting mongoose and data base
const mongoose = require("mongoose");
const keys = require("./config/dev");
mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);
require("./models/users");
require("./services/passport");

//house keeping of getting json to work
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookiekey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/auth_route")(app);
require("./routes/transfer_route")(app);
require("./routes/GOD_routes")(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT);
