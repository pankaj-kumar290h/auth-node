const { promisify } = require("util");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../util/appError");
const catchAsync = require("../util/catchAsync");
const { default: mongoose } = require("mongoose");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};

exports.signup = async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);
  res.status(201).json({
    status: "sucess",
    token,
    data: {
      user: newUser,
    },
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("plz provide email and password", 400));
  }

  //check user if it exits
  const user = await User.findOne({ email: email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("incrroct email and password", 401));
  }

  const token = signToken(user._id);

  res.json({ status: "sucess", token });
});

//middleware for checking user has persmission to asscess this route
exports.proctect = catchAsync(async (req, res, next) => {
  let token;
  // 1 check token is there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("plz login first", 401));
  }

  //2 verify token

  //this also need third argument as callback function but we are promesifing this with node util
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3 check if user still exits
  const freshUser = mongoose.findById(decoded.id);
  if (!freshUser) {
    return next(new AppError("user does not exits", 400));
  }
  //4 check if user change password after token was issued
  next();
});
