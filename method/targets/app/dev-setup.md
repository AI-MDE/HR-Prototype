---
type: target
id: dev-setup
title: Development setup
applies_when:
  - the work sets up or changes the development environment, its dependencies, or its required services
  - the work is the first to run the application on a machine
stage: skeleton
---

# Development setup

<!-- COMPILED by compile-targets.mjs from features. Skeleton (Purpose +
     applies_when) is authored; the sections below are composed from the
     contributing features, each tagged [feature: <id>]. Do not hand-edit
     the composed sections — edit the feature and recompile. -->

## Purpose

What a good development environment setup looks like, and how to prove it: before anything is built on it, the environment is shown to be real and runnable, never assumed. "The environment works" is an evidenced output, so it can never be quietly deferred as "requires an environment".

It governs: The `install-dev` script and its readiness logs.

## Outputs

| Output | Where | When |
|---|---|---|
| `install-dev` script | committed, or the `mde:install-dev` script role | always |
| `env-check.log` | `evidence/tests/logs/` | always |
| `db-connect.log` | `evidence/tests/logs/` | when the application has a database |
| `migrate.log` | `evidence/tests/logs/` | when the application has migrations |
| `health.log`, `smoke.log`, `teardown.log` | `evidence/tests/logs/` | always |

## Evidence

The rows of the Evidence Package this Target owns: what `mde verify` measures and reports for it, each by its id. Tools take a row's title and what it proves from here.

| Row | Title | Proves | Needs |
|---|---|---|---|
| configuration | Configuration | Every .env key is in .env.example, .env is not tracked, and no port or secret is written in source. | — |
| readiness-logs | Readiness logs | Each readiness log is present and shows success. | — |
| imports-declared | Imports declared | Every import is a declared dependency. | — |

## Composed behavior

### Readiness logs  `[feature: dev-setup-readiness-logs]`

Each step writes the real captured output of what it ran, timestamped, while it runs; never a summary typed afterwards. A missing log means the step did not run; a log showing a non-zero exit or an error means it failed. Either is a blocker, never a pass.

| Log | Proves | Passes when it shows |
|---|---|---|
| `env-check.log` | configuration resolved | the resolved connection target (host, port, database; never the password) |
| `db-connect.log` | the database is reachable | a real connection and a trivial round trip (`SELECT 1` or equivalent) |
| `migrate.log` | migrations apply | the migrate operation ran to completion, exit 0 |
| `health.log` | the application started and identifies itself | the health check passed, with the expected application name |
| `smoke.log` | the smoke test passed | exit 0 |
| `teardown.log` | what was started was stopped | the application's ports were freed |

`db-connect.log` proves the database is reachable; it is distinct from the schema report the [persistence](persistence.md) Target requires. Once it shows a live connection the environment is proven capable, and any later check in the same work that needs the environment must run; deferring it for "no environment" is a defect.

### Application configuration contract  `[feature: env-contract]`

- Required values, defaults, secret sources, and validation are recorded in the technology Specs. Environment variables, configuration files, or managed configuration are all valid; `.env` is an option, not a universal production requirement. Use the databases and services actually selected.
- Bind addresses, ports, and external URLs come from configuration; missing required configuration is reported clearly.
- **Every port is set in one place: the `.env` at the project root**, next to `mde.json`, with `.env.example` committed listing each one with its default (`.env` itself is not committed). That covers each port the application listens on or connects to (`WEB_PORT` for the pages' server, `API_PORT` for the API, the database's, in `DB_PORT` or its connection URL) and the Workbench's own (`MDE_WORKBENCH_PORT`). Source, scripts, and tool configuration (a Vite config, a proxy target, a container file, `package.json`'s `"mde": { "url" }`, which may say `http://localhost:${WEB_PORT}`) read these and never hard-code a port, and an address one tier uses to reach another is built from them (a proxy target `http://localhost:${API_PORT}`). A tier in its own folder loads the project-root `.env` (a Vite app sets `envDir` to it), not a `.env` of its own. A server whose port is busy fails with that error; it never moves to another port (a Vite app sets `strictPort`), so the address the Workbench opens is the one the server runs on. In production the same names come from whatever configuration the deployment provides.
- **Where the pages get their data is set in `.env` too, spelled out:** `SERVER_SOURCE=api` (the application's own backend) or `SERVER_SOURCE=runtime` (the MDE runtime, for a prototype only), and `API_BASE` (the backend's path prefix, such as `/api`, proxied to `API_PORT`). The frontend reads its data only through its one data-access module ([configured data sources](../../features/prototyping/data-source-switch.md)): with `api`, through `API_BASE`; with `runtime`, at `MDE_RUNTIME_URL` for the application `MDE_PROJECT`, which the Workbench sets when it starts the pages, so they are not written in `.env`. Once the application has its own backend, `SERVER_SOURCE` is `api`, and no frontend code calls the MDE runtime (`/data/…`, `/model`, the Workbench's port): `mde verify` fails the Server source row otherwise.
- Secrets never appear in source, browser payloads, or logs. The browser receives only browser-safe configuration; privileged credentials stay on the server.

### Dev environment setup (install-dev)  `[feature: install-dev]`

One documented script brings the development environment up from nothing, so a new machine or a verification run goes from clone to a working, testable application without undocumented steps:

- **Configuration**: create `.env` from the committed `.env.example` if absent, never overwriting an existing one, and fill machine-specific values.
- **Dependencies**: run `mde:install`, and make sure the stack's required tools are present, or report exactly what is missing and how to get it. Every import in the source resolves to a dependency declared in the project manifest (`package.json`, `pyproject.toml`, …); an undeclared package is a failure, never deferred.
- **Database**: check the database from the configuration is installed and reachable, and that migrations apply to it.
- **Smoke test**: start the application (`mde:start`), call its health check and confirm its identity, run a small smoke test, and stop what it started.

The script is idempotent and reports blockers clearly (a missing tool, an unreachable database, a busy port) rather than failing opaquely or carrying on with a broken environment. On a connection or authentication failure it reports the exact connection it tried (host, port, database, never the password), directs the user to fix the configuration, and stops; it never skips or defers.

## Verify and Audit

The Checks `mde verify` proves for this target compile to `targets/verification/dev-setup.md`; what a second agent judges compiles to `targets/audit/`, under each Feature's first Target.
