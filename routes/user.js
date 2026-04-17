const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const WrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/users");


// signup form and signup route
router.route("/signup")
.get(userController.renderSignUp)
.post(WrapAsync(userController.signup));


// login form and login route
router.route("/login")
.get(userController.renderLoginForm)
.post(
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
    userController.login
);


router.get("/logout", userController.logout);

module.exports = router;