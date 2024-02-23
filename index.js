const express = require("express");
const app = express();
const port = 4000;
const db = require("./config/mongoose");
const dotenv = require("dotenv").config();

app.use("/v1", require("./v1"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
