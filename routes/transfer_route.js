const mongoose = require("mongoose");
const User = mongoose.model("users");
const requireLogin = require("../middleware/requireLogin");
const transactionSchema = require("../models/transactions");
module.exports = app => {
  app.post("/transfer/verifyValid", requireLogin, (req, res) => {
    const recipient = req.body.recipient;
    const amount = Number(req.body.amount);
    console.log(req.body);
    var balanceOK = false;
    var recipientValid = false;
    User.findOne({ username: recipient }).then(user => {
      if (req.user.balance >= amount) {
        balanceOK = true;
      }
      console.log(user);
      if (user) {
        recipientValid = true;
      }
      res.send({ balanceOK, recipientValid, sender: req.user.username });
    });
  });

  app.post("/transfer/submitTransfer", requireLogin, async (req, res) => {
    const recipient = req.body.order.recipient;
    //    const sending = req.order.sending;
    const amount = Number(req.body.order.amount);
    const namount = 0 - amount;
    const transactionlist = mongoose.model(req.user.id, transactionSchema);
    const recipientInfo = await User.findOne({ username: recipient });
    const recipientTransactionlist = mongoose.model(
      recipientInfo.id,
      transactionSchema
    );
    const UserupdatedA = Number(req.user.balance) - amount;
    const RecipientupdateDA = Number(recipientInfo.balance) + amount;

    await User.findOneAndUpdate(
      { username: req.user.username },
      { balance: UserupdatedA },
      { new: true },
      (err, todo) => {
        if (err) return res.status(500).send(err);
      }
    );

    await User.findOneAndUpdate(
      { username: recipient },
      { balance: RecipientupdateDA },
      { new: true },
      (err, todo) => {
        if (err) return res.status(500).send(err);
      }
    );

    await new transactionlist({
      counterpart: recipient,
      amount: namount
    }).save();
    await new recipientTransactionlist({
      counterpart: req.user.username,
      amount: amount
    }).save();

    res.send("successfully transferred and recorded");
  });
};
