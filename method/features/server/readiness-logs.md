---
type: feature
kind: build
id: dev-setup-readiness-logs
title: Readiness logs
origin: mde
impacts:
  - dev-setup
---

# Readiness logs

## Purpose

The "Readiness logs" rules of the dev-setup Target that no other Feature supplies.

## Impact on dev-setup

Each step writes the real captured output of what it ran, timestamped, while it runs; never a summary typed afterwards. A missing log means the step did not run; a log showing a non-zero exit or an error means it failed. Either is a blocker, never a pass.

| Log | Proves | Passes when it shows |
|---|---|---|
| `env-check.log` | configuration resolved | the resolved connection target (host, port, database; never the password) |
| `db-connect.log` | the database is reachable | a real connection and a trivial round trip (`SELECT 1` or equivalent) |
| `migrate.log` | migrations apply | the migrate operation ran to completion, exit 0 |
| `health.log` | the application started and identifies itself | the health check passed, with the expected application name |
| `smoke.log` | the smoke test passed | exit 0 |
| `teardown.log` | what was started was stopped | the application's ports were freed |

`db-connect.log` proves the database is reachable; it is distinct from the schema report the [persistence](../../targets/app/persistence.md) Target requires. Once it shows a live connection the environment is proven capable, and any later check in the same work that needs the environment must run; deferring it for "no environment" is a defect.

## Verify

- `readiness-logs-present` Are all the required readiness logs present, and does each show success (a live connection and round trip, a passing health check with the right name, exit 0), with none showing an error (`mde verify`, Readiness logs row)?
- `checks-ran-after-connect` Once `db-connect.log` showed a live connection, did every later environment-dependent check actually run?
