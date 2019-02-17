const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  balance: Number,
  netEarning: Number
});

mongoose.model("users", userSchema);
