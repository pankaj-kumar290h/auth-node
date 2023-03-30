const express = require("express");
const userRoute = require("./routes/userRoute");

const app = express();

//middleware
app.use(express.json());

// user define middleware

//routes
app.use("/api/v1/userRoute", userRoute);

module.exports = app;
