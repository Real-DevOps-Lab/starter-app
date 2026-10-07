# INCIDENT-003 — Container Running, Port Closed

This lab is intentionally broken.

## Scenario
Docker shows the container as running and port `3000` is published, but the application cannot be reached from the host.

## Start the lab
```bash
docker compose up -d --build
```

Check the container:
```bash
docker compose ps
```

Test the application:
```bash
curl http://localhost:3000
```

The request should fail.

## Investigate
Useful commands:
```bash
docker compose logs app
docker port $(docker compose ps -q app)
```

Inspect:
- `app.js`
- `docker-compose.yml`

Ask yourself:
> Is the application listening on an address that Docker can expose outside the container?

## Your goal
Make this work:
```bash
curl http://localhost:3000
```

When finished, complete `incident-report-template.md`.

## Reset
```bash
docker compose down
docker compose up -d --build
```

## Stop
```bash
docker compose down
```
