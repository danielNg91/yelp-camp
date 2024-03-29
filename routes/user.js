const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post("/register", async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username, password });
    const registeredUser = await User.register(user, password);
    req.logIn(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "welcome to yelpcamp");
      const redirectUrl = req.session.returnTo || "/campgrounds";
      delete req.session.returnTo;
      res.redirect(redirectUrl);
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
});

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("sucess", "welcome");
    const redirectUrl = req.session.returnTo || "/campgrounds";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Goodbye!!");
  res.redirect("/campgrounds");
});

module.exports = router;
