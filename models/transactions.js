const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  counterpart: String,
  amount: Number
});

module.exports = transactionSchema;
//mongoose.model("transactions", transactionSchema);
