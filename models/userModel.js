const mongoose = require("mongoose");
const validator = require("validator"); // for validation

const bcrypt = require("bcryptjs");

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
    select: false, //this fild not send to user or node app not read it
  },
  passwordConfirm: {
    type: String,
    required: [true, "plz confirm password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password are note same!",
    },
  },
});

// moongose middlewear

userSchema.pre("save", async function (next) {
  //only run this function if password is modefied
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12); //hash a passwod and then delet confirm password
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidantPassword,
  userPassword
) {
  return await bcrypt.compare(candidantPassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
