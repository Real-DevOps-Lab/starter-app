# INCIDENT-001 — Solution

## Root cause

The application is started with:

```text
PORT=3001
```

so Node.js listens on **port 3001 inside the container**.

But the broken container was started with:

```text
-p 3000:3000
```

Docker therefore forwards host port `3000` to container port `3000`, where nothing is listening.

The container stays running because the Node.js process itself is healthy. The problem is the port mapping.

## Fix option A — map to the port the app actually uses

```bash
docker rm -f rdl-incident-001

docker run -d \
  --name rdl-incident-001 \
  -e PORT=3001 \
  -p 3000:3001 \
  rdl-incident-001
```

Then verify:

```bash
./verify.sh
```

## Fix option B — make the application use port 3000

```bash
docker rm -f rdl-incident-001

docker run -d \
  --name rdl-incident-001 \
  -e PORT=3000 \
  -p 3000:3000 \
  rdl-incident-001
```

Then:

```bash
./verify.sh
```

## What this teaches

`docker ps` showing **Up** does not mean the service is reachable.

When a container is running but an application is unavailable, compare:

1. The port the process is actually listening on.
2. The container port Docker is forwarding traffic to.
3. The host port you are testing.

Also remember: `EXPOSE` in a Dockerfile is metadata/documentation. It does not automatically publish or redirect traffic.

## Production takeaway

A basic health check or smoke test after deployment would catch this immediately. A successful deployment should be **verified**, not assumed.

👉 [Continue with more hands-on incidents in Real DevOps Lab](https://www.skool.com/real-devops-lab-9645)
