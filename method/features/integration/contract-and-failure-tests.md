---
type: feature
kind: build
id: contract-and-failure-tests
title: Contract and failure-path tests
origin: mde
impacts:
  - integration
default: n/a
---

# Contract and failure-path tests

## Purpose

Contract and applicable failure-path tests exist and run, with evidence accurately labeled —
a mock-only test proves local behavior, not live compatibility.

## Applicability

Applies to an actual external integration in scope. Resolve the selected contract and mechanism in the owning Integration specification.

## External Standards

External standards are background references, not a declaration of compliance.

- **AsyncAPI** — https://www.asyncapi.com/docs/reference/specification/latest
  - EVT-ASYNC-09 (Contract and failure testing)

## Impact on integration

Contract tests and the applicable failure-path tests exist and run, with output captured in `evidence/tests/`. The environment is recorded accurately and each piece of evidence is labeled as fixture or mock, emulator, sandbox, or production-like: a mock-only test proves local behavior, not live compatibility.

## Verify

- `failure-tests-run` Do contract and failure-path tests exist and run, with captured output and accurately labeled evidence?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on testing

These run in a capable environment and capture output under `evidence/tests/logs/`, classified
static (existence) vs. requires-environment (the run).
