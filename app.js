const express = require("express");

const AppError = require("./util/appError");
const globalErrorHandler = require("./controllers/errorController");

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

app.use(globalErrorHandler);
module.exports = app;
