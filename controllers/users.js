const Listing=require("../models/listing")
const Review=require("../models/review") 
const User=require("../models/user") 


module.exports.renderSignUpForm=(req, res) => {
    res.render("users/signup.ejs");
  }

module.exports.signUp=async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ username, email, password });
      const registeredUser = await User.register(newUser, password);
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Welcome To Celeste");
        res.redirect("/listings");
      });
      console.log(registeredUser);
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }

  
module.exports.renderLogInForm=(req, res) => {
    res.render("users/login.ejs");
  }

  module.exports.LogIn=async (req, res) => {
    req.flash("success", "Welcome back to Celeste");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  }

  module.exports.LogOut=(req, res) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    req.flash("success", "You have Logged out Successfully");
    res.redirect("/listings");
  });
}