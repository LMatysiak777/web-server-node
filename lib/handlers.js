// Request handling functions for server.js

const fortune = require("./fortune");

exports.home = (req, res) =>
  res.render("home", {
    fortune: fortune.getFortune(),
    additionalMessage: "Have a nice warm day! :)",
    copyrights: "COPYRIGHTS LM 2021",
  });

exports.about = (req, res) => res.render("about");

exports.notFound = (req, res) => res.render("404");

exports.serverError = (err, req, res, next) => res.render("500");

exports.contactus = (req, res) => res.render("contactus");

// respond with alternative layout
exports.alt = (req, res) => res.render("home", { layout: "alternative" });

exports.newsletterSignup = (req, res) =>
  res.render("newsletter-signup", { csrf: "token CSRF" });

exports.newsletterSignupProcess = (req, res) => {
  console.log("Form (from query string): " + req.query.form);
  console.log("CSRF token(from hidden form field): " + req.body._csrf);
  console.log("Name (from form name field): " + req.body.name);
  console.log("Email (from form email field): " + req.body.email);
  res.redirect("/newsletter-signup/thank-you");

  // res.redirect(303, "/newsletter-signup/thank-you");
  console.log("complete");
};

exports.newsletterSignupThankYou = (req, res) => {
  console.log("tthankyou page");
  res.render("newsletter-signup-thank-you");
};
