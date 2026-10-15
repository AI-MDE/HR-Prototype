---
type: feature
kind: build
id: app-runtime-scripts
title: Runtime automation integration
origin: mde
impacts:
  - run-app
default: n/a
---

# Runtime automation integration

## Purpose

Provide automation adapters compatible with the application tooling and selected MDE/Workbench integration.

## Applicability

Applies to relevant application implementation and runtime contracts. Follow the selected stack and Architecture; examples do not mandate a framework, folder layout or unsupported tool.

## Impact on run-app

The application declares its operations as scripts named by role, which callers, including `mde verify` and the Workbench, invoke by role and never by the tools behind them:

| Script | Does | Succeeds when |
|---|---|---|
| `mde:install` | install every dependency | exit 0 |
| `mde:build` | typecheck and build every tier, and say what it built in `evidence/tests/raw/build.json`: `{ "parts": [{ "name": "backend", "output": "app/backend/dist", "files": 64 }] }` | exit 0 |
| `mde:test` | run the full test suite (starts nothing; the application is already running if tests need it), each suite leaving its raw results in `evidence/tests/raw/<suite>.json` (Cucumber, Playwright or Vitest JSON) | exit 0 |
| `mde:test:<suite>` | run one suite only: `api` (the API scenarios, including those that read the database back), `ui` (the browser), `unit`; each leaves its raw results as `mde:test` does. Optional: `mde verify --current` runs only the suites of the Targets it checks when they are declared (API, persistence, run-app: `api`; server: `unit` and `api`; web UI: `ui`), and the full `mde:test` otherwise | exit 0 |
| `mde:start` | stop the application's own previous run, if any, then start every tier on its configured ports | the application answers its health check |
| `mde:health` | check that the running application identifies itself and its dependencies | reports healthy |

- No role reinstalls dependencies on its own: `mde:build`, `mde:test`, and `mde:start` use what `mde:install` installed. Reinstalling under a running application fails on Windows (its native binaries are locked) and costs minutes in every run.
- A stack without npm declares equivalent commands with the same roles. Declare only roles that really work: a script that does nothing and exits 0 is a defect, and an unsupported operation is visible, not a successful no-op.

## Verify

- `roles-declared` Is every runtime role (`mde:install`, `mde:build`, `mde:test`, `mde:start`, `mde:health`) a real script, with no successful no-op and no destructive reset inside another role (`mde verify`, Runtime scripts row)?

## Audit

- Are the runtime scripts declared by role, each doing what it says, with unsupported ones visible? Is every applicable operation mapped to its command, with destructive resets kept apart?
