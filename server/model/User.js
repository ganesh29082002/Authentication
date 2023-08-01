const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  verified :{type:Boolean , default:false},
  token: { type: String },
  resetToken: String,
  resetTokenExpiration: Date,
});

module.exports = mongoose.model("usernew", userSchema);