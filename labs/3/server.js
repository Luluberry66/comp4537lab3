const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const { getDate } = require("./modules/utils");
const { greeting } = require("./lang/en/en");

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === "/COMP4537/labs/3/getDate/") {
    const { name } = parsedUrl.query;
    if (name) {
      const currentDate = getDate();
      const message = `${greeting.replace("%1", name)} ${currentDate}`;
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(`<p style="color: blue;">${message}</p>`);
    } else {
      res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Please provide a name in the query string");
    }
  } else if (pathname === "/COMP4537/labs/3/writeFile/") {
    const { text } = parsedUrl.query;
    if (text) {
      fs.appendFile("file.txt", text + "\n", (err) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
          res.end("Error writing to file");
        } else {
          res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
          res.end("Text appended to file successfully");
        }
      });
    } else {
      res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Please provide text in the query string");
    }
  } else if (pathname === "/COMP4537/labs/3/readFile/file.txt") {
    fs.readFile("file.txt", "utf8", (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
          res.end("404 File Not Found");
        } else {
          res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
          res.end("Error reading file");
        }
      } else {
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("404 Not Found");
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});