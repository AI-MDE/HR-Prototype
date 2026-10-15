---
type: feature
kind: build
id: operation-coverage
title: UI operation coverage
origin: mde
impacts:

default: n/a
---

# UI operation coverage

## Purpose

Show whether required user interactions are represented and work through the designed UI.

## Applicability

Applies to required UI coverage in scope. Derive obligations from Requirements and Design, including intentional exclusions; do not infer coverage solely from existing pages.

## Audit

- Are required UI interactions derived from Specs rather than only current pages?
- Do action bindings resolve to correct operations, roles and record context?
- Are intentional non-UI exclusions distinguishable from missing actions?
- Do executable scenarios prove the required effects?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on ui-design

Derive required UI operations from users, use cases and declared entity operations that need a UI. Map them to Page Actions and Semantic Bindings; non-UI/system operations may be explicitly not applicable. Follow the selected composition technique without requiring a particular panel DSL. Identify missing coverage and mismatches against declared access and lifecycle policy.

### Impact on web-ui

Realize mapped actions against the correct object/context. Disabled, loading and forbidden states must agree with the designed operation policy.

### Impact on testing

Execute relevant interactions with concrete data and assert their effects. Keep design coverage and execution evidence distinct; a Page binding is not proof of working behavior. Strategy determines the treatment of gaps at the gate.
