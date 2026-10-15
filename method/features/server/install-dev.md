---
type: feature
kind: build
id: install-dev
title: Dev environment setup (install-dev)
origin: mde
impacts:
  - dev-setup
default: n/a
---

# Dev environment setup (install-dev)

## Purpose

A generated app can bring its **development environment** up from nothing by a
single documented script — so a new machine (or a verification run) goes from
clone to a working, testable app without undocumented manual steps. This is what
makes the runtime checks (DB reachable, app starts, tests pass) actually runnable
rather than perpetually deferred.

## Applicability

Applies to relevant application implementation and runtime contracts. Follow the selected stack and Architecture; examples do not mandate a framework, folder layout or unsupported tool.

## Impact on dev-setup

One documented script brings the development environment up from nothing, so a new machine or a verification run goes from clone to a working, testable application without undocumented steps:

- **Configuration**: create `.env` from the committed `.env.example` if absent, never overwriting an existing one, and fill machine-specific values.
- **Dependencies**: run `mde:install`, and make sure the stack's required tools are present, or report exactly what is missing and how to get it. Every import in the source resolves to a dependency declared in the project manifest (`package.json`, `pyproject.toml`, …); an undeclared package is a failure, never deferred.
- **Database**: check the database from the configuration is installed and reachable, and that migrations apply to it.
- **Smoke test**: start the application (`mde:start`), call its health check and confirm its identity, run a small smoke test, and stop what it started.

The script is idempotent and reports blockers clearly (a missing tool, an unreachable database, a busy port) rather than failing opaquely or carrying on with a broken environment. On a connection or authentication failure it reports the exact connection it tried (host, port, database, never the password), directs the user to fix the configuration, and stops; it never skips or defers.

## Verify

- `imports-declared` Does every import resolve to a declared dependency (`mde verify`, Imports declared row)?

## Audit

- Does the application ship an `install-dev` script that sets up configuration without overwriting it, installs dependencies and tools, checks the database, and runs a smoke test, reporting blockers clearly?
- When the database could not be reached, was the exact connection reported and the user directed to fix it, rather than the step skipped or deferred?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on server

The application ships the `install-dev` script: committed, or declared as the `mde:install-dev` script role. What it does, step by step, is under *Impact on dev-setup*; the readiness logs each step writes are defined by the development setup Target.
