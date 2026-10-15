---
type: target
id: run-app
title: Run the application
applies_when:
  - the work produces or changes runnable code
stage: skeleton
---

# Run the application

<!-- COMPILED by compile-targets.mjs from features. Skeleton (Purpose +
     applies_when) is authored; the sections below are composed from the
     contributing features, each tagged [feature: <id>]. Do not hand-edit
     the composed sections — edit the feature and recompile. -->

## Purpose

What it takes to show that generated code works: it builds, the **full** test suite still passes, and the application still runs. "The code I generated builds and the application still works" is an evidenced output, never a claim. It runs the scripts the [server](server.md) and [testing](testing.md) Targets author; running is not authoring. It is not [deployment](deployment.md), which authors remote deployment but never runs it here.

It governs: The build and regression run, and their logs.

## Outputs

| Output | Where | When |
|---|---|---|
| `build.log` | `evidence/tests/logs/` | always |
| `test.log` | `evidence/tests/logs/` | always |

`mde verify` runs `mde:build` and `mde:test` and writes both, with the [Evidence Package](../../metamodel/evidence/evidence-package.md).

## Evidence

The rows of the Evidence Package this Target owns: what `mde verify` measures and reports for it, each by its id. Tools take a row's title and what it proves from here.

| Row | Title | Proves | Needs |
|---|---|---|---|
| build | Build | The application builds from its sources, every part. | — |
| runtime-scripts | Runtime scripts | Every runtime role is a real script, and destructive resets are kept apart. | — |
| start-and-health | Start and health | The last start succeeded, and health names the application and its dependencies. | — |
| base-path | Base path | The API base comes from configuration: no hard-coded /api, and no fixed CORS origin. | — |

## Composed behavior

### Runtime automation integration  `[feature: app-runtime-scripts]`

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

### Application start and health contract  `[feature: app-start-contract]`

One documented invocation starts every component the scoped application needs, first bringing up what the application owns (its database, created when missing, migrated, and seeded); configuration decides ports and addresses.

- **Starting again restarts.** `mde:start` first stops the application's own run, if one is still going (a previous start that was never stopped, or left behind), then starts afresh, so starting is always safe to repeat. It knows its own run by what it recorded when it started: the process id of each tier it started, kept in the App area (for example `app/logs/run.json`), and checked still to be that same process (its command line names this application's folder) before it is stopped. Stopping ends each tier's whole process tree, and the database only when this application started it.
- **It leaves its log.** `mde:start` writes `evidence/tests/logs/start.log` while it runs, replacing the previous one: what it stopped, what it started, the health answer, and its exit (`exit 0`); `mde:health` writes its answer to `health.log`, naming the application and each dependency (its database among them). `mde verify` reads them, and starts nothing itself.
- **Anything else on a port is an error.** A port held by a process that is not this application's own recorded run is reported (the port, and the process holding it) and left alone; `mde:start` never kills a process it did not start. The health or status endpoint identifies the expected application and reports failing dependencies.

### Base-path routing — one model for dev and Apache deploy  `[feature: base-path-routing]`

Every web and API surface runs under a configurable base-path folder (for example `/<app>/` and `/<app>/api/`), never assuming it owns the server root. The same model is used in development (behind the Workbench's reverse proxy) and in production (behind the production reverse proxy), so a base-path bug shows up locally.

- The web application derives the base path from configuration and applies it wherever a URL is formed: the bundler's base (assets), the router's basename (client routes), and the API base.
- The API base is same-origin and folder-relative (`<base>/api/…`), never an absolute host such as `http://localhost:3001`: a cross-origin call works only in a standalone tab, breaks as soon as the application is framed or proxied, and forces CORS.
- Bundler environment variables live where the bundler reads them (its root or env directory). A required base never falls back silently to an empty string, which would turn the API base into a root-relative path hitting the proxy instead of the application.
- The API mounts under a configurable path prefix, with cookies, CORS, and redirects path-aware. It does not rely on CORS to work; where cross-origin access is genuinely needed, the allow-list comes from configuration, never a literal naming only the standalone development port.

### Build and regression run (run-app)  `[feature: build-and-regression]`

- Build the generated code (`mde:build`), then run the **whole** test suite (`mde:test`), not just the work's new tests. Running everything is what proves the change broke nothing elsewhere.
- Both logs are real captured output ([testing](../../features/testing/captured-command-output.md)): missing means it did not run, non-zero means it failed.

### Discoverable application operations  `[feature: standard-root-operations]`

- Map every applicable operation (install, start, stop, build, test, health, and where relevant migrate, seed, schema inspection) to its exact command in the technology Specs, reachable from the project entry point. Commands report failure truthfully. Destructive resets are distinct from ordinary startup and scoped safely.

## Verify and Audit

The Checks `mde verify` proves for this target compile to `targets/verification/run-app.md`; what a second agent judges compiles to `targets/audit/`, under each Feature's first Target.
