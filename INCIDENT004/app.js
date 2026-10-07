const http = require("http");
const fs = require("fs");

const PORT = process.env.PORT || 3000;
const CONFIG_PATH = "/app/config.json";

let config;

try {
  config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
} catch (error) {
  console.error(`[FATAL] Cannot load ${CONFIG_PATH}`);
  console.error(`[FATAL] ${error.message}`);
  process.exit(1);
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(`INCIDENT-004 resolved. Service: ${config.serviceName}\n`);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`[APP] Server listening on port ${PORT}`);
});
