const User = require("../models/user");

module.exports.renderSignUp = (req, res) => {
  res.render("users/signup");
};

module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;

    if (!username || !email || !password || password.trim().length === 0) {
      req.flash("error", "All fields are required!");
      return res.redirect("/signup");
    }

    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);

    await new Promise((resolve, reject) => {
      req.login(registeredUser, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    req.flash("success", "Welcome to WanderLust!");
    return res.redirect("/listings");
  } catch (e) {
    req.flash("error", e.message);
    return res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login");
};

module.exports.login = (req, res) => {
  req.flash("success", "Welcome back!");
  const redirectUrl = res.locals.redirectUrl || "/listings";
  return res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
};