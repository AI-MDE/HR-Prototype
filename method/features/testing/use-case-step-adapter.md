---
type: feature
kind: build
id: use-case-step-adapter
title: Behavior test adapters
origin: mde
impacts:
  - testing
default: n/a
---

# Behavior test adapters

## Purpose

Make selected behavioral scenarios executable through the relevant application interfaces.

## Applicability

Applies to required verification for the scope. Strategy sets rigor and gate policy; Design resolves the test realization and tooling.

## Impact on testing

- Steps drive the real operations or UI with scenario-visible data and assert effects. Missing step adapters are reported as unexecuted tests, never as passing scenario files; the test entry point actually runs every required suite. A scenario that exists but never ran does not count.

## Audit

- Does every step drive real operations or UI and assert effects, with missing adapters reported as unexecuted?
