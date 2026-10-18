# INCIDENT-001 — Solution

## What was wrong?

The container was started with:

```bash
-e PORT=3001
```

so the Node.js application listens on port `3001` inside the container.

But Docker was started with:

```bash
-p 3000:3000
```

That means:

```text
localhost:3000 → container:3000
```

Nothing is listening on container port `3000`, so the request fails even though the Node.js process is alive and the container remains `Up`.

## Correct run command

After stopping the broken container:

```bash
docker stop incident-001
```

run:

```bash
docker run -d --rm \
  --name incident-001 \
  -e PORT=3001 \
  -p 3000:3001 \
  real-devops-lab-app
```

Now the traffic path is:

```text
localhost:3000 → container:3001 → Node.js app
```

## Verify

```bash
docker ps
curl http://localhost:3000/api/health
```

You should receive a healthy JSON response.

## What this incident teaches

`docker ps` showing `Up` only tells you the container process is running.

When an application is unavailable, compare:

1. the host port you are calling
2. the container port Docker forwards traffic to
3. the port the application actually listens on

This is why troubleshooting means observing the system first instead of randomly changing configuration.

---

## Continue practicing

More hands-on incidents are available in **Real DevOps Lab**:

https://www.skool.com/real-devops-lab-9645
