---
type: feature
kind: build
id: use-case-execution-report
title: Use-case execution evidence and report
origin: mde
impacts:
  - testing
  - evidence
default: n/a
---

# Use-case execution evidence and report

## Purpose

Present expected and observed behavior with traceable execution evidence for review.

## Applicability

Applies to required verification for the scope. Strategy sets rigor and gate policy; Design resolves the test realization and tooling.

## Impact on testing

- Reports come from the real current run: scenario, the obligation it proves, layer, inputs, expected and actual results, assertions, and evidence references, with pass, fail, and not-executed counted separately. Use the runner's machine and human reports, or a designed aggregation; failed runs are reported too.
- Produce a Cucumber HTML report per category under `evidence/tests/`.

## Impact on evidence

- A scenario that did not run is shown as not run, never as passed; a skipped scenario says why.
- Every scenario names the spec ids it proves (use case, business rule, operation, page), so test coverage can be derived from the reports.
- A suite that drives the running application keeps the application's own log for the run, so the report shows the server-side path executed, not only the test runner's view.

## Verify

- `reports-current` Do reports come from the current run, with failures and not-executed scenarios visible?
- `not-run-shown` Does every test report show not-run and skipped scenarios as such, and does every scenario name the spec ids it proves?
