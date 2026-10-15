---
type: verification-view
title: Verification — run-app
---

# Verification — run-app — COMPILED from features' `## Verify`

<!-- COMPILED by compile-targets.mjs. Do not hand-edit — edit each feature's ## Verify and
     recompile. These are the Checks `mde verify` proves by script or test run; what needs
     judgment is in targets/audit/. This is the VERIFICATION PART of the run-app target: these check blocks live
     HERE and nowhere else. targets/app\run-app.md holds the
     generation behavior; targets/audit/run-app.md holds the audit concerns. -->

### Runtime automation integration  `[feature: app-runtime-scripts]`

- `app-runtime-scripts/roles-declared` Is every runtime role (`mde:install`, `mde:build`, `mde:test`, `mde:start`, `mde:health`) a real script, with no successful no-op and no destructive reset inside another role (`mde verify`, Runtime scripts row)?

### Application start and health contract  `[feature: app-start-contract]`

- `app-start-contract/one-command-start` Does one invocation, from a fresh clone, bring up the application's own database and start all components, does health identify the application and its failing dependencies, does a second start stop the application's own previous run and start afresh, and is a port held by anything else reported and left alone?
- `app-start-contract/start-logged` Does `mde:start` leave its log, `evidence/tests/logs/start.log`, holding the latest start and ending with its exit, and `mde:health` its answer in `health.log`, naming the application and each dependency; did the last start succeed (`mde verify`, Start and health row)?

### Base-path routing — one model for dev and Apache deploy  `[feature: base-path-routing]`

- `base-path-routing/base-from-config` Does the API base come from configuration, with no hard-coded `/api` path and no fixed CORS origin in source (`mde verify`, Base path row)?

### Build and regression run (run-app)  `[feature: build-and-regression]`

- `build-and-regression/build-log-present` Is `build.log` present, showing `mde:build` exit 0 (`mde verify`, Build row)?
- `build-and-regression/test-log-present` Is `test.log` present, showing the whole `mde:test` suite ran and exited 0, not a subset and not a stale run (`mde verify`, Tests row)?
