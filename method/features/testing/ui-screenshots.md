---
type: feature
kind: build
id: ui-screenshots
title: UI execution screenshots
origin: mde
impacts:
  - testing
default: n/a
---

# UI execution screenshots

## Purpose

Provide visual evidence of required UI scenario outcomes and failures.

## Applicability

Applies to required verification for the scope. Strategy sets rigor and gate policy; Design resolves the test realization and tooling.

## Impact on testing

- Capture a screenshot at the end of each UI scenario, pass or fail, and at the point of failure, from the actual run, under `evidence/tests/screenshots/` with the scenario and run in the filename. A missing capture is reported; never substitute a stale or generated image. Use fictional data and protect sensitive values in screenshots.

## Verify

- `screenshots-captured` Does every UI scenario have a screenshot from the actual run, pass or fail, with missing captures reported?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on web-ui

Make the relevant rendered state available to the selected browser test tooling. Protect sensitive data in evidence and use fictional test data where appropriate.
