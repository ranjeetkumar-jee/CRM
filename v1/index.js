const express = require("express");
const router = express.Router();

const UserController = require("../controllers/v1/Authentication-controller");

router.post("/signup", UserController.signup);

router.post("signin", UserController.Signin);

module.exports = router;
