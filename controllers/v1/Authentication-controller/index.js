const Admin = require("../../../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signup = async (req, res) => {
  try {
    //destructure body
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({
        success: false,
        message: "please fill all require filled",
      });
    }

    //checking existing user
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    //hashing the password
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    req.body.password = hashPassword;
    const newUser = await new usersData(req.body);
    await newUser.save();

    return res.status(200).json({
      message: "User signup successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

module.exports.Signin = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !req.body.password) {
      return res.status(500).json({
        message: "email and password should not empty",
        success: false,
      });
    }

    const user = await Admin.findOne({ email: email });

    if (user === null) {
      return res.status(401).json({
        success: false,
        message: "user with this email id not exist",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "please write correct password",
      });
    }

    const token = await jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      "secret",
      { expiresIn: "7h" }
    );

    const { password, ...rest } = await Object.assign({}, user.toJSON());

    return res.status(200).json({
      success: true,
      message: "user signin successfully",
      data: {
        token,
        user: rest,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};
