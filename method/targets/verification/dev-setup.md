---
type: verification-view
title: Verification — dev-setup
---

# Verification — dev-setup — COMPILED from features' `## Verify`

<!-- COMPILED by compile-targets.mjs. Do not hand-edit — edit each feature's ## Verify and
     recompile. These are the Checks `mde verify` proves by script or test run; what needs
     judgment is in targets/audit/. This is the VERIFICATION PART of the dev-setup target: these check blocks live
     HERE and nowhere else. targets/app\dev-setup.md holds the
     generation behavior; targets/audit/dev-setup.md holds the audit concerns. -->

### Readiness logs  `[feature: dev-setup-readiness-logs]`

- `dev-setup-readiness-logs/readiness-logs-present` Are all the required readiness logs present, and does each show success (a live connection and round trip, a passing health check with the right name, exit 0), with none showing an error (`mde verify`, Readiness logs row)?
- `dev-setup-readiness-logs/checks-ran-after-connect` Once `db-connect.log` showed a live connection, did every later environment-dependent check actually run?

### Application configuration contract  `[feature: env-contract]`

- `env-contract/env-declares-source` Does `.env` declare `SERVER_SOURCE` and `API_BASE`, and, with the application's own backend, is `SERVER_SOURCE` `api` with no frontend code calling the MDE runtime (`mde verify`, Server source row)?
- `env-contract/config-declared` Is every `.env` key listed in `.env.example`, `.env` not tracked by git, and no port or secret written in source, scripts, or tool configuration (`mde verify`, Configuration row)?

### Dev environment setup (install-dev)  `[feature: install-dev]`

- `install-dev/imports-declared` Does every import resolve to a declared dependency (`mde verify`, Imports declared row)?
