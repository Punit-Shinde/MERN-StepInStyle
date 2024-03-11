const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/user.Model");
const sendToken = require("../utils/jwtToken");
const crypto = require("crypto");
// const sendEmail = require("../utils/sendEmail");

//Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "profilepicUrl",
    },
  });

  sendToken(user, 201, res);
});

//Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if both email and pass are given
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

//Logout User
exports.logoutUser = catchAsyncErrors(async (req, res) => {
  res.cookie("token", null, {
    exprire: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// //Forgot Password
// exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
//   const user = await User.findOne({ email: req.body.email });

//   if (!user) {
//     return next(new ErrorHandler("User not found", 404));
//   }

//   // Get ResetPassword Token
//   const resetToken = user.getResetPasswordToken();

//   await user.save({ validateBeforeSave: false });

//   // Reset Password Email
//   const ResetPasswordUrl = `${req.protocol}://${req.get(
//     "host"
//   )}/api/v1/product/reset/${resetToken}`;

//   const message = `Dear ${user.name},\n\nWe recently received a request to reset the password for your account. If you did not request this change, please disregard this email.\n\n
//   To reset your password, please click on the following link:\n
//   ${ResetPasswordUrl}\n\n
//   Please note that this link is only valid for a limited time. If you do not reset your password within 10 min, you may need to request another password reset.\n\nThank you,\nPunit Shinde\nAdmin / Fullstack Web Developer\nShoeShop`;

//   try {
//     await sendEmail({
//       email: user.email,
//       subject: `ShoeShop Reset Password`,
//       message,
//     });

//     res.status(200).json({
//       success: true,
//       message: `A reset token has been sent to email ${user.email}.`,
//     });
//   } catch (error) {
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;

//     await user.save({ validateBeforeSave: false });

//     return next(new ErrorHandler(error.message, 500));
//   }
// });

// // Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password token is invalid or has been expired",
        404
      )
    );
  }

  if (req.body.password !== req.body.confirm_password) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});
