const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log("ERROR in DB connection  ", err));

app.get("/testing", (req, res) => {
  res.json({ msg: " server is working  /testing" });
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
