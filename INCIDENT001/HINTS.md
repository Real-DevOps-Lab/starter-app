# INCIDENT-001 — Hints

Use one hint at a time.

## Hint 1

A running container only means its main process is alive. It does not prove that traffic from your host reaches the application.

Look at:

```bash
docker ps
```

Pay attention to the `PORTS` column.

---

## Hint 2

Now ask the application itself which port it started on:

```bash
docker logs incident-001
```

Do not change anything yet. Compare the output with `docker ps`.

---

## Hint 3

Remember Docker port publishing syntax:

```text
-p HOST_PORT:CONTAINER_PORT
```

The right-hand side must point to the port where the application is actually listening inside the container.

Still stuck? Open `SOLUTION.md`.
