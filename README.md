# INCIDENT-001 — Container Running, App Down

**Difficulty:** Beginner  
**Time:** 15–20 minutes  
**Practice:** Docker · ports · logs · troubleshooting

Your Docker container is running ✅  
The application is unavailable ❌

Your job is to investigate the problem, find the root cause, fix it, and prove the service works again.

> No long tutorial. Start the broken system and troubleshoot it like a real incident.

## Quick start

You need **Docker** and **curl** installed.

```bash
git clone https://github.com/Real-DevOps-Lab/starter-app.git
cd starter-app/INCIDENT001
chmod +x start-broken.sh reset.sh verify.sh
./start-broken.sh
```

Now check the situation:

```bash
docker ps
curl http://localhost:3000
```

You should see the container running, but the application should not respond on `localhost:3000`.

## Your mission

1. Confirm the container is running.
2. Inspect the container configuration.
3. Check the application logs.
4. Find the root cause.
5. Fix the problem.
6. Verify that the application is healthy.

Useful commands may include:

```bash
docker ps
docker logs rdl-incident-001
docker inspect rdl-incident-001
```

Try not to open the hints or solution until you have investigated the problem yourself.

## Verify your fix

When you think it is fixed:

```bash
./verify.sh
```

Success should end with:

```text
✅ Incident resolved. Application is healthy.
```

## Stuck?

Open [`HINTS.md`](INCIDENT001/HINTS.md) one hint at a time.

## Want to compare your diagnosis?

After you solve it, check [`SOLUTION.md`](INCIDENT001/SOLUTION.md) for the root cause, two valid fixes, and the reasoning behind them.

## Reset the lab

```bash
./reset.sh
./start-broken.sh
```

## Want more incidents?

I’m building **Real DevOps Lab** around short, production-style troubleshooting exercises like this one.

**BUILD → DEPLOY → BREAK → TROUBLESHOOT → FIX**

👉 [Continue with more free hands-on labs in Real DevOps Lab](https://www.skool.com/real-devops-lab-9645)

If you came from Reddit, I’d especially like to know: **what did you check first, and what made you find the root cause?**
