const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }).then(user => {
      if (!user) {
        return done(null, false);
      }
      if (password === user.password) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);
