const express = require("express");

const AppError = require("./util/appError");

const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");

const app = express();

//middleware
app.use(express.json());

// user define middleware

//routes
app.use("/api/v1/user", userRoute);

app.use("/api/v1/auth", authRoute);

app.all("*", (req, res, next) => {
  next(new AppError("page not found", 404));
});

app.use((err, req, res, next) => {
  err.statusCode = err.seratusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});
module.exports = app;
