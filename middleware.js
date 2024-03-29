module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // store the url they are requesting
    // console.log(req.path, req.originalUrl);
    req.flash("error", "You must be signed in first");
    return res.redirect("/login");
  }
  next();
};
