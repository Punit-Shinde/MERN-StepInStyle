const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/user.Model");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);

    if (!req.user) {
      return next(new ErrorHandler("User not found", 404));
    }
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access the resource`,
          403
        )
      );
    }
    next();
  };
};
