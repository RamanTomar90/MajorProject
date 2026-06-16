const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
});

// 👇 IMPORTANT FIX
userSchema.plugin(passportLocalMongoose, {
  usernameField: "username"
});

module.exports = mongoose.model("User", userSchema);