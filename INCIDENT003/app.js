const http = require("http");

const PORT = process.env.PORT || 3000;

// INCIDENT-003 is intentionally broken.
// The app listens only on the container loopback interface.
const HOST = "127.0.0.1";

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from INCIDENT-003!\n");
});

server.listen(PORT, HOST, () => {
  console.log(`[APP] Server started on http://${HOST}:${PORT}`);
});
