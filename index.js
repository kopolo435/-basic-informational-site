import http from "node:http";
import fs from "node:fs/promises";
import url from "node:url";

const hostname = "localhost";
const port = 8000;

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${hostname}:${port}/`);
  const pathName = url.pathname;

  let fileName = ".";

  if (pathName === "/") {
    fileName = fileName + "/index.html";
  } else {
    fileName = fileName + pathName + ".html";
  }
  try {
    const data = await fs.readFile(fileName);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  } catch (e) {
    try {
      const errorData = await fs.readFile("./404.html");
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    } catch (e) {
      res.setHeader("Content-Type", "text/plain");
      res.end("No se encontro la pagina deseada\n");
    }
  }
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
