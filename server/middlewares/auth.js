const CustomErrorHandler = require("../utils/customErrorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const isAuthenticatedUser = asyncErrorHandler(async (req, res, next) => {
  const { todoJWTToken } = req.cookies;
  if (!todoJWTToken) {
    return next(new CustomErrorHandler("Please login to access this route"));
  }
  const payload = jwt.verify(todoJWTToken, process.env.JWT_SECRET);
  const user = await User.findById(payload._id);
  if (!user) {
    return next(new CustomErrorHandler("Invalid token! please login again"));
  }
  req.user = user;
  next();
});

module.exports = { isAuthenticatedUser };
