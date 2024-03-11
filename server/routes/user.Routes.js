const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/user.Controller");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(logoutUser);

// router.route("/password/forgot").post(forgotPassword);

// router.route("/password/reset/:token").put(resetPassword);

module.exports = router;
