# INCIDENT-004 — Container Keeps Restarting

This lab is intentionally broken.

## Scenario

The application was deployed, but the container keeps restarting.

Your job is to find out why the process exits and fix the image.

## Start the lab

```bash
docker compose up -d --build
```

Check the container:

```bash
docker compose ps
```

Watch the state for a few seconds:

```bash
docker compose ps
```

Inspect the logs:

```bash
docker compose logs app
```

You may inspect:

- `app.js`
- `Dockerfile`
- `docker-compose.yml`
- `config.json`

## Your goal

Stop the restart loop and make this work:

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
