const User = require("../models/user");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomErrorHandler = require("../utils/customErrorHandler");
const storeTokenInCookie = require("../utils/storeTokenInCookie");
const jwt = require("jsonwebtoken");

const isLoggedIn = asyncErrorHandler(async (req, res, next) => {
  const { todoJWTToken } = req.cookies;
  if (!todoJWTToken) {
    return res.status(200).json({
      verification: false,
    });
  }
  const payload = jwt.verify(todoJWTToken, process.env.JWT_SECRET);
  const user = await User.findById(payload._id);
  if (!user) {
    return res.status(200).json({
      verification: false,
    });
  }
  res.status(200).json({
    verification: true,
    user,
  });
});

const registerUser = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  storeTokenInCookie(user, res, 201);
});

const loginUser = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new CustomErrorHandler("Please enter email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new CustomErrorHandler("Invalid email or password", 400));
  }
  const isVerified = await user.verifyPasswords(password);
  if (!isVerified) {
    return next(new CustomErrorHandler("Invalid email or password", 400));
  }
  storeTokenInCookie(user, res, 200);
});

const logoutUser = asyncErrorHandler(async (req, res, next) => {
  res
    .status(200)
    .cookie("todoJWTToken", null, {
      expires: new Date(Date.now()),
    })
    .json({
      sucess: true,
      message: "User logged out",
    });
});

const getUserDetails = asyncErrorHandler(async (req, res, next) => {
  if (req.params.id != req.user._id) {
    return next(
      new CustomErrorHandler("User doesn't exists with this id", 404)
    );
  }
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new CustomErrorHandler("User doesn't exists with this id", 404)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

const updateUser = asyncErrorHandler(async (req, res, next) => {
  if (req.params.id != req.user._id) {
    return next(
      new CustomErrorHandler("User doesn't exists with this id", 404)
    );
  }
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new CustomErrorHandler("User doesn't exists with this id", 404)
    );
  }
  const { name, email } = req.body;
  await User.findByIdAndUpdate(
    req.params.id,
    { name, email },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    message: "updated the user",
  });
});

const deleteUser = asyncErrorHandler(async (req, res, next) => {
  if (req.params.id != req.user._id) {
    return next(
      new CustomErrorHandler("User doesn't exists with this id", 404)
    );
  }
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new CustomErrorHandler("User doesn't exists with this id", 404)
    );
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "deleted the user",
  });
});

module.exports = {
  registerUser,
  getUserDetails,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  isLoggedIn,
};
