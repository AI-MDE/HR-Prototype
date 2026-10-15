---
type: feature
kind: build
id: test-style-by-layer
title: Test style by layer
origin: mde
impacts:
  - testing
default: n/a
---

# Test style by layer

## Purpose

Use suitable test techniques for each obligation while keeping behavioral scenarios understandable.

## Applicability

Applies to required verification for the scope. Strategy sets rigor and gate policy; Design resolves the test realization and tooling.

## Impact on testing

Use the unit runner for isolated internal behavior; executable behavioral scenarios for use cases, business rules, and acceptance; integration tests for real boundaries; UI tests for interactions that need a browser. Reuse scenario data across layers, and do not prove the same thing twice without purpose.

## Audit

- Does each kind of behavior use the technique suited to it, without proving the same thing twice?
