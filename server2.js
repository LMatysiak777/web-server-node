const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const welcomeString = `

<style>
div {text-align:center; width: 40%}
div span{color: red;font-style:bold, align-self:left}
</style>

<div style="text-align:center; width: 40%">
<h1 >Welcome to Express server!<br></h1>
Please use below routings to recieve different response type:<br><br>
<span>/</span> recieve default (this menu, text/html)<br>
<span>/textplain</span> recieve text/plain <br>
<span>/json</span> recieve application/json<br>
<span>/header</span> recieve request header<br>
<span>/contact</span> handle post request to server<br>
<span>/person</span> handle post request to server with name, email and phone required<br></div>

`;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.type("text/html");
  res.send(welcomeString);
});

app.get("/textplain", (req, res) => {
  res.type("text/plain");
  res.send("<h1>This is send as text, not working HTML element</h1>");
});

app.get("/json", (req, res) => {
  res.type("application/json");
  //   For JSON response res.json() method should be used
  res.json({ Response: "Hello im your response in JSON format" });
});

app.get("/header", (req, res) => {
  res.send(req.header());
  //   Isolate specific header part:
  //   res.send(req.header('Content-Type'));
});

app.post("/contact", (req, res) => {
  res.send(req.body);
});

app.post("/person", (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.phone) {
    res.send("Please send your name, email and phone number");
    res.status("500");
  } else {
    res.send(req.body);
  }
});

//   Server start
app.listen(port, () =>
  console.log(`Server started at ${port} port; hit Ctrl-C to stop`)
);
