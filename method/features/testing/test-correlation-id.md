---
type: feature
kind: build
id: test-correlation-id
title: Test request correlation
origin: mde
impacts:
  - testing
default: n/a
---

# Test request correlation

## Purpose

Connect test activity to the application interactions it actually exercised when cross-boundary evidence is needed.

## Applicability

Applies to required verification for the scope. Strategy sets rigor and gate policy; Design resolves the test realization and tooling.

## Impact on testing

- When cross-boundary evidence is needed, correlate test requests with the application's execution (a scenario or run id carried with the request and logged). Correlation values are sanitized, never let test metadata bypass validation, authorization, or production controls, and are never a substitute for asserting the effect.

## Audit

- Can selected test requests be correlated with actual application execution?
- Are correlation values sanitized and safe for logs?
- Do assertions verify effects in addition to the correlation marker?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on api

Support the adopted correlation contract without allowing test metadata to bypass validation, authorization or production controls.
