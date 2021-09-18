const http = require("http");
const fs = require("fs");
const os = require("os");
const path = require("path");
const port = process.env.PORT || 3000;
const express = require("express");
const app = express();
const expressHandlebars = require("express-handlebars");
const fortune = require("./lib/fortune");
const handlers = require("./lib/handlers");
const { assertTSPropertySignature } = require("@babel/types");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// configure Handlebars view engine
app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main",
    copyrights: "COPYRIGHTS",
    // default .handlebar extension can be changed with extname
    //     extname: ".hbs",
  })
);
app.set("view engine", "handlebars");

// adding static middleware
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views/layouts"));

app.get("/", handlers.home);
app.get("/alt", handlers.alt);

app.get("/about", handlers.about);

app.get("/reqdetail", (req, res) => {
  alert(req.ip);
  res.send(req.headers);
});

app.get("/headers", (req, res) => {
  console.log(res.headers);
  res.type("text/plain");
  const headers = Object.entries(req.headers).map(
    ([key, value]) => `${key} : ${value}`
  );
  res.send(headers.join("\n"));
});

app.get("/contactus", handlers.contactus);

app.get("submit", (req, res) => {
  res.send(req.name);
});

app.get("/newsletter-signup", handlers.newsletterSignup);
app.post("/newsletter-signup/process", handlers.newsletterSignupProcess);
app.get("/newsletter-signup/thank-you", handlers.newsletterSignupThankYou);
app.post("/newsletter-signup/thank-you", handlers.newsletterSignupThankYou);

app.use(handlers.notFound);

app.use(handlers.serverError);

app.listen(port, () =>
  console.log(`Server started at ${port} port; hit Ctrl-C to stop`)
);

// BEFORE HANDLERS:
// app.get("/", (req, res) =>
//   res.render("home", { fortune: fortune.getFortune() })
// );
// app.get("/about", (req, res) => res.render("about"));

// app.use((req, res) => {
//   res.status(404);
//   res.render("404");
// });
// app.use((err, req, res, next) => {
//   console.error(err.message);
//   res.status(500);
//   res.render("500");
// });

// app.get("/", (req, res) => {
//   res.type("text/plain");
//   res.send("Travel");
//   //   res.status(200) default for standard page not required
//   res.status(200);
// });

// app.get("/about", (req, res) => {
//   res.type("text/plain");
//   res.send("About us");
// });

// app.use((req, res) => {
//   res.type("text/plain");
//   res.statusMessage(404);
//   res.send("404- not found");
// });

// app.use((err, req, res, next) => {
//   console.error(err.message);
//   res.type("text/plain");
//   res.status(500);
//   res.send("500- Server Error ");
// });

// PURE NODE SIMPLEST SERVER:

// function serveStaticFile(res, path, contentType, responseCode = 200) {
//   fs.readFile(__dirname + path, (err, data) => {
//     if (err) {
//       res.writeHead(500, { "Content-Type": "text/plain" });
//       return res.end("500- Internal Eroor");
//     }
//     res.writeHead(responseCode, { "Content-Type": contentType });
//     res.end(data);
//   });
// }

// const server = http.createServer((req, res) => {
//   const path = req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
//   switch (path) {
//     case "":
//       serveStaticFile(res, "/index.html", "text/html");
//       break;
//     case "/about":
//       serveStaticFile(res, "/about.html", "text/html");
//       break;
//     case "/img/logo.jpg":
//       serveStaticFile(res, "img/logo.jpg", "image/png");
//       break;
//     default:
//       serveStaticFile(res, "404.html", " text/html", 404);
//       break;
//   }
// });
