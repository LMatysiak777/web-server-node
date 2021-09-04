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

// configure Handlebars view engine
app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

// adding static middleware
app.use(express.static(__dirname + "/public"));

app.get("/", handlers.home);
app.get("/about", handlers.about);
app.use(handlers.notFound);
app.use(handlers.serverError);
app.use("/reqdetail", (req, res) => {
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

app.listen(port, () =>
  console.log(`Server started at ${port} port; hit Ctrl-C to stop`)
);

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
