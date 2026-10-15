---
type: feature
kind: build
id: app-start-contract
title: Application start and health contract
origin: mde
impacts:
  - run-app
default: n/a
---

# Application start and health contract

## Purpose

Start the required application components predictably and identify the result without disturbing unrelated processes.

## Applicability

Applies to relevant application implementation and runtime contracts. Follow the selected stack and Architecture; examples do not mandate a framework, folder layout or unsupported tool.

## Impact on run-app

One documented invocation starts every component the scoped application needs, first bringing up what the application owns (its database, created when missing, migrated, and seeded); configuration decides ports and addresses.

- **Starting again restarts.** `mde:start` first stops the application's own run, if one is still going (a previous start that was never stopped, or left behind), then starts afresh, so starting is always safe to repeat. It knows its own run by what it recorded when it started: the process id of each tier it started, kept in the App area (for example `app/logs/run.json`), and checked still to be that same process (its command line names this application's folder) before it is stopped. Stopping ends each tier's whole process tree, and the database only when this application started it.
- **It leaves its log.** `mde:start` writes `evidence/tests/logs/start.log` while it runs, replacing the previous one: what it stopped, what it started, the health answer, and its exit (`exit 0`); `mde:health` writes its answer to `health.log`, naming the application and each dependency (its database among them). `mde verify` reads them, and starts nothing itself.
- **Anything else on a port is an error.** A port held by a process that is not this application's own recorded run is reported (the port, and the process holding it) and left alone; `mde:start` never kills a process it did not start. The health or status endpoint identifies the expected application and reports failing dependencies.

## Verify

- `one-command-start` Does one invocation, from a fresh clone, bring up the application's own database and start all components, does health identify the application and its failing dependencies, does a second start stop the application's own previous run and start afresh, and is a port held by anything else reported and left alone?
- `start-logged` Does `mde:start` leave its log, `evidence/tests/logs/start.log`, holding the latest start and ending with its exit, and `mde:health` its answer in `health.log`, naming the application and each dependency; did the last start succeed (`mde verify`, Start and health row)?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on api

Expose the adopted health/status information with useful application/component identity. The endpoint and identity mechanism follow the actual runtime integration contract rather than a universal nonce-file requirement.

### Impact on web-ui

Start or serve the UI along with dependencies required by its selected architecture. Workbench embedding must use the configured working address and verify the expected application.
