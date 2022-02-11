const express = require("express");
const router = express.Router();

const { register, login, logout, userInfo } = require("../controllers/auth");
const { checkAuth } = require("../middlewares/checkAuth");

router.route("/register").post(register);
router.route("/userinfo").get(checkAuth, userInfo);
router.route("/login").post(login);
router.route("/logout").post(logout);
module.exports = router;
