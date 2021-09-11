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
