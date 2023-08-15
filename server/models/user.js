const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    minLength: [4, "Please enter a longer name"],
    maxLength: [30, "Please Enter a shorter name"],
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
    validate: [validator.isEmail, "Please Enter valid email"],
    unique: [true, "Email already exists"],
    maxLength: [100, "Please Enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter the Password"],
    minLength: [8, "Please enter minimum 8 characters password"],
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
  return token;
};

userSchema.methods.verifyPasswords = async function (enteredPassword) {
  const isVerified = await bcrypt.compare(enteredPassword, this.password);
  return isVerified;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
