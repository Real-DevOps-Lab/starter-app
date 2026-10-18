# Real DevOps Lab — INCIDENT-001

## Container Running, App Down

**Difficulty:** Beginner  
**Time:** 15–20 minutes  
**Practice:** Docker · ports · logs · troubleshooting

The container is running ✅  
The application is unavailable ❌

Your task is to **investigate the problem yourself, find the root cause, fix it, and verify the application works**.

No helper scripts. You will run the Docker commands yourself and inspect what the system is telling you.

---

## 1. Clone the repository

```bash
git clone https://github.com/Real-DevOps-Lab/starter-app.git
cd starter-app/INCIDENT001
```

Or download the repository as ZIP, extract it, and open a terminal inside the `INCIDENT001` folder.

---

## 2. Build the image

```bash
docker build -t real-devops-lab-app .
```

Make sure the build completes successfully.

---

## 3. Start the broken application

Run this command exactly as shown:

```bash
docker run -d --rm \
  --name incident-001 \
  -e PORT=3001 \
  -p 3000:3000 \
  real-devops-lab-app
```

Now confirm that Docker says the container is running:

```bash
docker ps
```

You should see `incident-001` with status `Up`.

---

## 4. Try the application

```bash
curl http://localhost:3000/api/health
```

The request should fail.

That is the incident:

```text
Container: RUNNING ✅
Application: DOWN ❌
```

Do not rebuild the application. Assume the application code itself is fine.

---

## 5. Investigate manually

Start with the same commands you would use during a real incident.

### Check the container

```bash
docker ps
```

Look carefully at the `PORTS` column.

### Check the application logs

```bash
docker logs incident-001
```

### Ask yourself

- Is the application process actually running?
- Which port is Docker publishing?
- Which port does the application say it is listening on?
- Do those values match?
- Why can a container be `Up` while the service is still unreachable?

If you need another clue, open [`HINTS.md`](INCIDENT001/HINTS.md).

---

## 6. Fix the incident

Stop the broken container:

```bash
docker stop incident-001
```

Now run the application again with the configuration you believe is correct.

**Do not open the solution until you have tried your own fix.**

---

## 7. Verify your fix manually

First check that the new container is running:

```bash
docker ps
```

Then test the service:

```bash
curl http://localhost:3000/api/health
```

A successful response should look similar to:

```json
{
  "status": "ok",
  "service": "real-devops-lab-app"
}
```

If you get a healthy response, you solved the incident. ✅

Now compare your diagnosis with [`SOLUTION.md`](INCIDENT001/SOLUTION.md).

---

## What you should be able to explain afterwards

- what `-p HOST_PORT:CONTAINER_PORT` means
- why `docker ps` showing `Up` does not mean the application is reachable
- how `docker logs` helped you find the mismatch
- how you verified the fix instead of assuming it worked

---

## Want another incident?

I’m building **Real DevOps Lab** around short, production-style troubleshooting exercises like this one.

**BUILD → DEPLOY → BREAK → TROUBLESHOOT → FIX**

👉 [Continue with more free hands-on labs](https://www.skool.com/real-devops-lab-9645)

If you came from Reddit, tell me what you checked first and what led you to the root cause.
