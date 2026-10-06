const http = require("http");
const net = require("net");

const PORT = process.env.PORT || 3000;

function checkDatabaseReachable(databaseUrl) {
  return new Promise((resolve, reject) => {
    let parsed;
    try {
      parsed = new URL(databaseUrl);
    } catch {
      reject(new Error("DATABASE_URL is not a valid URL"));
      return;
    }

    const host = parsed.hostname;
    const port = Number(parsed.port || 5432);
    const socket = net.createConnection({ host, port });

    const timeout = setTimeout(() => {
      socket.destroy();
      reject(new Error(`Timed out connecting to ${host}:${port}`));
    }, 2000);

    socket.on("connect", () => {
      clearTimeout(timeout);
      socket.end();
      resolve();
    });

    socket.on("error", (error) => {
      clearTimeout(timeout);
      reject(error);
    });
  });
}

const server = http.createServer(async (req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ container: "running" }));
    return;
  }

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error("[APP ERROR] DATABASE_URL is not set.");
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Application configuration error: database connection is not configured.\n");
    return;
  }

  try {
    await checkDatabaseReachable(databaseUrl);
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Application is healthy. Database connection is reachable.\n");
  } catch (error) {
    console.error(`[APP ERROR] Database connection failed: ${error.message}`);
    res.writeHead(503, { "Content-Type": "text/plain" });
    res.end("Application is running, but the database is not reachable.\n");
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`[APP] Server listening on port ${PORT}`);
  if (!process.env.DATABASE_URL) {
    console.warn("[APP WARNING] Required database configuration is missing.");
  }
});
