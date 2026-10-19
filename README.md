# Real DevOps Lab — INCIDENT-001

## Container Running, App Down

**Level:** Beginner · **Time:** 15–20 minutes (after setup) · **Skills:** Docker, ports, logs, troubleshooting

**The container is running ✅ but the application is unavailable ❌**

Your mission: investigate, identify the root cause, fix the configuration, and **prove** the service works. This is a hands-on incident, not a tutorial with the answer included.

You will use real Docker commands. No helper scripts and no changes to the application code are required.

---

## Before you start

You need:

- **Docker** installed **and running**. [Install Docker](https://docs.docker.com/get-started/get-docker/).
- **Git**, or download the repository as a ZIP. [Install Git](https://git-scm.com/downloads).
- A terminal: **Terminal** on macOS/Linux or **PowerShell / Command Prompt** on Windows.
- **curl** to test the app (on Windows, use `curl.exe` if `curl` does not work).

Check Docker **before** starting:

```bash
docker version
```

You should see both **Client** and **Server** information. If you only see Client information or a connection error, start Docker Desktop or the Docker daemon first.

All the Docker commands below are written on **one line** so they can be copied into macOS, Linux, PowerShell, or Command Prompt.

---

## 1. Download the lab

Run:

```bash
git clone https://github.com/Real-DevOps-Lab/starter-app.git
cd starter-app/INCIDENT001
```

**No Git?** On GitHub, click **Code → Download ZIP**, extract it, then open a terminal **inside the `INCIDENT001` folder**.

> **Important:** Run the following build command from `INCIDENT001`, not from the repository's root folder. This is where the `Dockerfile` is located.

---

## 2. Build the Docker image

```bash
docker build -t real-devops-lab-app .
```

**Expected:** the build completes without an error. The first build may need to download an image and install dependencies.

If Docker reports that it cannot find a `Dockerfile`, check which folder your terminal is in.

---

## 3. Start the intentionally broken application

Copy and run this **exactly as written**:

```bash
docker run -d --rm --name incident-001 -e PORT=3001 -p 3000:3000 real-devops-lab-app
```

Docker should print a long container ID. That means it accepted the command—not necessarily that the application is reachable.

Check the container:

```bash
docker ps
```

**Expected:** find `incident-001` with a status beginning with **Up**.

If the container is not running, see [Trouble starting the lab?](#trouble-starting-the-lab) before continuing. A container that fails to start is **not** the intended incident.

---

## 4. Confirm the incident

On macOS/Linux:

```bash
curl -i http://localhost:3000/api/health
```

On Windows PowerShell, use this if `curl` behaves differently:

```powershell
curl.exe -i http://localhost:3000/api/health
```

**Expected:** the request fails (for example, a connection reset or an empty reply). That is intentional.

```text
Container: RUNNING ✅
Application: UNAVAILABLE ❌
```

**Your job is to find out why.** Do not rebuild the image or edit the application code.

---

## 5. Investigate like a DevOps engineer

**First, inspect the Docker port mapping:**

```bash
docker ps
```

Look at the `PORTS` column.

**Next, check what the application reports:**

```bash
docker logs incident-001
```

Ask yourself:

1. Which port are you trying to reach **on your computer**?
2. Which port is Docker forwarding traffic to **inside the container**?
3. Which port does the application say it is **listening on**?
4. Do all the relevant ports line up?
5. How can a container show `Up` while its application is unreachable?

**Stuck?** Open the hints **one at a time**: [HINTS.md](INCIDENT001/HINTS.md).

---

## 6. Fix it yourself

Stop the broken container:

```bash
docker stop incident-001
```

Now **run the container again with the configuration you think is correct**.

You do not need to change `server.js` or rebuild the image. Focus on the Docker launch configuration.

Try your fix **before** reading the solution.

---

## 7. Verify your fix

Check that your new container is up:

```bash
docker ps
```

Test the application again:

```bash
curl -i http://localhost:3000/api/health
```

**Windows PowerShell:** use `curl.exe -i http://localhost:3000/api/health`.

**Success means both:**

- HTTP status **200 OK**.
- JSON containing `"status": "ok"` and `"service": "real-devops-lab-app"`.

Example response body (you may also see a `timestamp` field):

```json
{
  "status": "ok",
  "service": "real-devops-lab-app"
}
```

You can also open **http://localhost:3000** in a browser after fixing the problem.

✅ **Got a healthy response? You solved INCIDENT-001.**

Now compare your reasoning with [SOLUTION.md](INCIDENT001/SOLUTION.md).

---

## Trouble starting the lab?

These are **setup issues**, not the mystery you are meant to solve:

| What you see | What to do |
| --- | --- |
| `docker: command not found` or `docker is not recognized` | Install Docker and reopen your terminal. |
| `Cannot connect to the Docker daemon` | Start Docker Desktop or the Docker service; check `docker version` again. |
| `failed to read dockerfile` / `Dockerfile: no such file` | Open your terminal in the `INCIDENT001` folder. |
| `port is already allocated` / `address already in use` | Another app uses host port 3000. Stop that app before restarting this lab. |
| `container name ... is already in use` | Remove **only this lab's** previous container with `docker rm -f incident-001`, then run the start command again. |
| `No such container: incident-001` after starting | The container may have stopped and been removed by `--rm`; recheck the startup command. This is not the expected exercise. |
| `curl` is not recognized on Windows | Try `curl.exe` instead. |

If `docker ps` shows `incident-001` as `Up` but `curl` fails, **that's the lab working as intended**. Continue investigating in step 5.

---

## Clean up

When you're finished, stop the lab:

```bash
docker stop incident-001
```

The `--rm` flag used at startup automatically removes the stopped container. The Docker image remains available if you want to try again.

---

## What you should be able to explain

- What `-p HOST_PORT:CONTAINER_PORT` means.
- Why `docker ps` showing `Up` does **not** prove the app is reachable.
- What you learned from `docker logs`.
- How you verified the fix instead of guessing.

## Want another real-world incident?

I'm building **Real DevOps Lab** around short, realistic troubleshooting exercises.

**BUILD → DEPLOY → BREAK → TROUBLESHOOT → FIX**

👉 [Continue with more free hands-on labs](https://www.skool.com/real-devops-lab-9645)

**Coming from Reddit?** Tell me what you checked first and what led you to the root cause.
