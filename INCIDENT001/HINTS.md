# INCIDENT-001 — Hints

Use these **one at a time**. Try the incident before opening the next hint.

## Hint 1

A running container only tells you that its main process is alive. It does **not** prove the application is reachable from your host.

Check:

```bash
docker ps
```

Pay attention to the **PORTS** column.

---

## Hint 2

Find the port the Node.js application says it is listening on:

```bash
docker logs rdl-incident-001
```

Now compare that with the container-side port used by Docker publishing.

---

## Hint 3

Remember the syntax:

```text
-p HOST_PORT:CONTAINER_PORT
```

The host port and the port the application listens on inside the container do not have to be the same — but the **container-side port must point to the application**.

Still stuck? Open `SOLUTION.md`.
