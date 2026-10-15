---
type: feature
kind: build
id: static-vs-executable-classification
title: Verification check classification
origin: mde
impacts:
  - testing
default: n/a
---

# Verification check classification

## Purpose

Distinguish artifact inspection, executable checks, environment dependencies and judgment by a second agent (audit) without hiding missing evidence.

## Applicability

Applies to required verification for the scope. Strategy sets rigor and gate policy; Design resolves the test realization and tooling.

## Impact on testing

Classify each check by the evidence it needs: inspecting an artifact, running something, needing an environment, or the judgment of a second agent (an audit). Repair routine setup within scope. A check that cannot run is recorded as blocked or unexecuted, with its cause and the next action; inspecting the code is no substitute for running it. Unexecuted checks are always distinguished from passed ones; the Strategy decides whether they block.

## Verify

- `unexecuted-visible` Are unexecuted and blocked checks visible, never shown as passed?
