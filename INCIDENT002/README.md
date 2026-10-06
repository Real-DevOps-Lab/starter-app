# INCIDENT-002 — Wrong Environment Variable

You are investigating a deployment that looks healthy from Docker's point of view, but the application is not working correctly.

## Scenario

The developer says:

> "It works on my machine. Nothing changed in the code."

The container starts and stays running, but the application cannot use its database configuration.

Your job is to find the root cause and fix the deployment.

## Start the incident

```bash
docker compose up -d --build
```

Check the containers:

```bash
docker compose ps
```

Test the application:

```bash
curl http://localhost:3000
```

You should see that the application is not healthy even though the app container is running.

## Investigate

Useful commands:

```bash
docker compose ps
docker compose logs app
docker compose exec app env
docker compose exec app env | grep -i database
docker compose exec app env | grep -i db
```

You may inspect the application and deployment files. Compare what the application expects with what the deployment provides.

## Your goal

Make this return a successful response:

```bash
curl http://localhost:3000
```

When finished, complete `incident-report-template.md`.

## Reset the lab

```bash
docker compose down -v
docker compose up -d --build
```

## Stop the lab

```bash
docker compose down -v
```
