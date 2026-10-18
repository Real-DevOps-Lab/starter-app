# INCIDENT-001 — Container Running, App Down

A short Docker troubleshooting incident.

## Start the broken environment

```bash
chmod +x start-broken.sh reset.sh verify.sh
./start-broken.sh
```

Then investigate:

```bash
docker ps
curl http://localhost:3000
```

**Goal:** make the application available on `http://localhost:3000` and verify it with `./verify.sh`.

Need help? Open `HINTS.md` one hint at a time.  
Finished? Read `SOLUTION.md` and compare your diagnosis.
