const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("users");
module.exports = app => {
  app.get("/auth/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  //app.post('/auth/logindefault', passport.authenticate('local', {successRedirect: '/cal', failureFlash: "Invalid Username or password", successFlash: "success"}));
  // , (req, res)=>{
  //   res.send("success");
  // })
  app.post("/auth/login", function(req, res, next) {
    passport.authenticate("local", function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send("failure");
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.send("success");
      });
    })(req, res, next);
  });

  app.post("/auth/signup", (req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({
      username: username
    }).then(existingUser => {
      if (existingUser) {
        res.send("UserName already existed");
      } else {
        console.log("creating new");
        new User({
          username: username,
          password: password
        })
          .save()
          .then(user =>
            res.send({ username: user.username, password: user.password })
          );
      }
    });
  });
};
