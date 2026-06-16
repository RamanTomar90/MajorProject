const express = require("express");
const router = express.Router();

const WrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/users");

// 🔥 DEBUG CHECK (important)
console.log(userController);

// Signup
router.get("/signup", userController.renderSignUp);
router.post("/signup", WrapAsync(userController.signup));

// Login
router.get("/login", userController.renderLoginForm);

router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
    userController.login
);

// Logout
router.get("/logout", userController.logout);

module.exports = router;