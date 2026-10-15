---
type: feature
kind: build
id: coverage-threshold
title: Measured code coverage
origin: mde
impacts:
  - testing
default: n/a
---

# Measured code coverage

## Purpose

Measure source execution coverage against an explicitly adopted threshold without confusing it with behavioral completeness.

## Applicability

Applies to required verification for the scope. Strategy sets rigor and gate policy; Design resolves the test realization and tooling.

## Impact on testing

- **Code coverage is always measured** for an application this stage builds, backend and frontend, in every Strategy. The threshold is 80% of lines unless the project sets another explicitly (`mde.json` `coverage.threshold`), and a part below it keeps the Evidence from passing. Instrument the relevant suites and layers, including integration and UI runs where the stack allows, combine measurements correctly, and name what could not be measured. Values come from real instrumentation, never made-up summaries; behavioral coverage is a separate obligation from the line percentage.

## Verify

- `coverage-real` Do reports come from the current run, with failures and not-executed scenarios visible? Is coverage instrumented for real, with its threshold explicitly adopted and unmeasured parts named?
