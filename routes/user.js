const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const UserController = require("../controllers/users");



router.route("/signup")
.get( UserController.renderSignUpForm)
.post( wrapAsync(UserController.signUp));

router.route("/login")
.get(UserController.renderLogInForm)
.post(
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  wrapAsync(UserController.LogIn)
);

router.get("/logout", UserController.LogOut);

module.exports = router;
