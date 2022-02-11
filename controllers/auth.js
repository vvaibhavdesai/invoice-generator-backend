const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/*
    This is registration controller.
    It will take username, email and password 
    from user. Check if its already in DB
    if not it'll save it with hashed password
*/

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  //   Check if already in DB
  const isAlreadyRegisterd = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (isAlreadyRegisterd) {
    return res.status(400).json({
      success: false,
      msg: "User already registered",
      code: "ALREADY_REGISTERED",
    });
  }

  try {
    // we create new user okay
    const user = new User({
      username,
      email: email.toLowerCase(),
      password,
    });

    // Save him in db
    await user.save();

    // send cookie
    sendCookie(user, 200, "User registered !", "REGISTRATION_SUCCESS", res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
      code: "INTERNAL_ERROR",
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  /*
    backend validation. It's recommended that you do not remove 
    this
    */
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      msg: "No email or password provided",
      code: "NO_CREDENTIALS",
    });
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "No user with that email was found",
        code: "USER_NOT_FOUND",
      });
    }
    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return res.status(401).json({
        success: false,
        msg: "Incorrect Credentials",
        code: "INVALID_CREDS",
      });
    }

    sendCookie(user, 200, "Logged in successfully!", "LOGIN_SUCCESS", res);
  } catch (error) {
    console.log(error, "this is weird");
    res.status(500).json({
      success: false,
      msg: error,
      code: "INTERNAL_ERROR",
    });
  }
};

exports.logout = async (req, res, next) => {
  try {
    /*
        Simple destroy the cookie
    */
    res.cookie("token", "", { httpOnly: true });
    res.status(200).json({
      msg: "Logged out successfully!",
      success: true,
      code: "LOGOUT_SUCCESS",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error,
      code: "INTERNAL_ERROR",
    });
  }
};

const sendCookie = async (user, statusCode, msg, code, res) => {
  const token = await jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    }
  );
  res.cookie("token", token, {
    sameSite: "None",
    secure: true,
    httpOnly: true,
  });
  res.status(statusCode).json({
    success: true,
    msg,
    code,
    userID: user._id,
    username: user.username,
    email: user.email,
  });
};

exports.userInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      msg: "User info fetched successfully!",
      code: "USER_INFO_FETCHED",
      userID: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      msg: error,
      code: "INTERNAL_ERROR",
    });
  }
};
