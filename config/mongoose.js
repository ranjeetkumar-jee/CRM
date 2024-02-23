const mongoose = require("mongoose");

console.log();
mongoose
  .connect(
    "mongodb+srv://ranjeetCRM:QN7ixLJGGPPuB8Le@cluster0.aw104xo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to DB 😊");
  })
  .catch((err) => {
    console.log("Err in connecting to DB 😐", err);
  });

const db = mongoose.connection;

module.exports = db;
