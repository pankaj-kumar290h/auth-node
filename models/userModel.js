const mongoose = require("mongoose");
const validator = require("validator"); // for validation

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "plz tell us your name"],
  },
  email: {
    type: String,
    require: [true, "plz provide youe email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "plz enter a valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "plz enter your password"],
    minlength: 3,
  },
  passwordConfirm: {
    type: String,
    required: [true, "plz confirm password"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
