---
type: feature
kind: build
id: build-and-regression
title: Build and regression run (run-app)
origin: mde
impacts:
  - run-app
default: n/a
---

# Build and regression run (run-app)

## Purpose

When a work generates runnable code, the app must actually **build** and its **full**
test suite must still **pass** — proving the change compiles and did not break the rest
of the app.

## Applicability

Applies when the work affects a runnable application. Strategy controls acceptance and verification; this Feature describes the required observable result.

## Impact on run-app

- Build the generated code (`mde:build`), then run the **whole** test suite (`mde:test`), not just the work's new tests. Running everything is what proves the change broke nothing elsewhere.
- Both logs are real captured output ([testing](../testing/captured-command-output.md)): missing means it did not run, non-zero means it failed.

## Verify

- `build-log-present` Is `build.log` present, showing `mde:build` exit 0 (`mde verify`, Build row)?
- `test-log-present` Is `test.log` present, showing the whole `mde:test` suite ran and exited 0, not a subset and not a stale run (`mde verify`, Tests row)?
