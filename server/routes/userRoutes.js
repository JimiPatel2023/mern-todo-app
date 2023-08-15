const express = require("express");
const {
  registerUser,
  getUserDetails,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  isLoggedIn,
} = require("../controllers/userControllers");
const { isAuthenticatedUser } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/verify").get(isLoggedIn);
router
  .route("/user/:id")
  .get(isAuthenticatedUser, getUserDetails)
  .put(isAuthenticatedUser, updateUser)
  .delete(isAuthenticatedUser, deleteUser);

module.exports = router;
