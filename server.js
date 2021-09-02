const http = require("http");
const fs = require("fs");
const port = process.env.PORT || 3000;

function serveStaticFile(res, path, contentType, responseCode = 200) {
  fs.readFile(__dirname + path, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      return res.end("500- Internal Eroor");
    }
    res.writeHead(responseCode, { "Content-Type": contentType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const path = req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
  switch (path) {
    case "":
      serveStaticFile(res, "/index.html", "text/html");
      break;
    case "/about":
      serverStaticFile(res, "/about.html", "text/html");
      break;
    case "/img/logo.jpg":
      serveStaticFile(res, "img/logo.jpg", "image/png");
      break;
    default:
      serveStaticFile(res, "404.html", " text/html", 404);
      break;
  }
});

server.listen(port, () =>
  console.log(`Server started at ${port} port; hit Ctrl-C to stop`)
);
