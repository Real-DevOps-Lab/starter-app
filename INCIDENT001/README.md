# INCIDENT-001 — App Down, Container Running

This lab is intentionally manual. The goal is not to run a helper script — it is to practice the commands you would actually use while troubleshooting.

## Build

```bash
docker build -t real-devops-lab-app .
```

## Run the broken setup

```bash
docker run -d --rm \
  --name incident-001 \
  -e PORT=3001 \
  -p 3000:3000 \
  real-devops-lab-app
```

## Confirm the container is running

```bash
docker ps
```

## Confirm the application is unavailable

```bash
curl http://localhost:3000/api/health
```

## Investigate

```bash
docker ps
```

```bash
docker logs incident-001
```

Questions:

1. What port does Docker publish?
2. What port does the application listen on?
3. Do they match?
4. Why does the container stay running?

Need help? Open [`HINTS.md`](HINTS.md).

## Fix

Stop the broken container:

```bash
docker stop incident-001
```

Run it again with the configuration you think is correct.

## Verify

```bash
docker ps
curl http://localhost:3000/api/health
```

When the health endpoint responds successfully, open [`SOLUTION.md`](SOLUTION.md) and compare your reasoning.
