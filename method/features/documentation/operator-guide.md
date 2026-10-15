---
type: feature
kind: build
id: operator-guide
title: Operator guide (install / deploy / run)
origin: mde
impacts:
  - documentation
default: n/a
---

# Operator guide (install / deploy / run)

## Purpose

A deployable app ships a runbook for whoever installs, deploys, and operates it — covering
setup, deployment for the in-scope target, and troubleshooting of common operational issues.

## Applicability

Applies to documentation and evidence relevant to the requested scope. Durable application meaning belongs in Specs; execution findings and evidence belong in Work or configured reports.

## Impact on documentation

When a deployment target is in scope, the app ships an **operator guide** at
`app/docs/operations-guide.md` — the runbook for someone installing, deploying, and operating the
app (not developing it). It covers: prerequisites and environment/config (env vars, database
connection, ports), **install** and build steps, **deployment** (per the loaded deployment
target — e.g. folder-proxy/Apache, container, cloud), starting/stopping and health checks,
and **common operational issues / troubleshooting** (failed DB connection, migration/seed,
port conflicts, proxy/base-path). It traces to the deployment target and the app's actual
config (`.env`/config source, start scripts), not invented values. An operator guide missing
the install or deployment steps for the in-scope deployment target is incomplete; flag it.

## Audit

- When a deployment is in scope, does the operations guide cover configuration, install, deployment for the selected target, start, stop, health, and troubleshooting, using the real configuration and scripts? Missing install or deployment steps fail.

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Checks

- When a deployment target is in scope, does `app/docs/operations-guide.md` exist covering
  prerequisites/config (env, database, ports), install/build, deployment for the in-scope
  deployment target, start/stop/health, and troubleshooting of common operational issues,
  traced to the app's real config and start scripts (not invented)? A guide missing the
  install or deployment steps for the in-scope target fails.
  · evidence: `app/docs/operations-guide.md`
  · when: static

- When a deployment is in scope, does the operations guide cover configuration, install, deployment for the selected target, start, stop, health, and troubleshooting, using the real configuration and scripts? Missing install or deployment steps fail.
