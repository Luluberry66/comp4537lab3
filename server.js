const http = require("http");
const url = require("url");
const { getDate } = require("./modules/utils");
const { greeting } = require("./lang/en/en");

const port = process.env.PORT || 3000;

let fileContent = "";

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === "/COMP4537/getDate/") {
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
  } else if (pathname === "/COMP4537/writeFile/") {
    const { text } = parsedUrl.query;
    if (text) {
      fileContent += text + "\n";
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Text appended to file successfully");
    } else {
      res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Please provide text in the query string");
    }
  } else if (pathname === "/COMP4537/readFile/file.txt") {
    if (fileContent) {
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(fileContent);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("404 File Not Found: file.txt");
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("404 Not Found");
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});