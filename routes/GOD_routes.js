const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const isGOD = require("../middleware/isGOD");
const User = mongoose.model("users");
module.exports = app => {
  app.get("/GOD/pastTwoMonth", requireLogin, isGOD, async (req, res) => {
    await User.find({}, (err, users) => {
      users.map(user => {
        const netEarning =
          Number(user.balance) * 0.01 + Number(user.netEarning);
        User.findOneAndUpdate(
          { username: user.username },
          { netEarning: netEarning },
          { new: true },
          (err, todo) => {
            console.log(err);
          }
        );
      });
    });
    res.send("it is done");
  });

  app.get("/GOD/pastSixMonth", requireLogin, isGOD, async (req, res) => {
    await User.find({}, (err, users) => {
      users.map(user => {
        const netEarning =
          Number(user.balance) * 0.03 + Number(user.netEarning);
        const newBalance = Number(user.balance) + netEarning;
        User.findOneAndUpdate(
          { username: user.username },
          {
            netEarning: 0,
            balance: newBalance
          },
          { new: true },
          (err, todo) => {
            console.log(err);
          }
        );
      });
    });
    res.send("it is done");
  });
};
