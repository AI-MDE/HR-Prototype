---
type: feature
kind: build
id: ui-design-operation-coverage
title: Operation coverage
origin: mde
impacts:
  - ui-design
---

# Operation coverage

## Purpose

The "Operation coverage" rules of the ui-design Target that no other Feature supplies.

## Impact on ui-design

Derive the required UI operations from the users, use cases, and declared entity operations that need a UI, not from the pages that happen to exist. Each is offered by an action in the application, bound to its operation, as the authorization and the lifecycle allow. A non-UI or system operation is marked explicitly not applicable, so an intentional exclusion is distinguishable from a missing action.

## Verify

- `use-cases-proven` Is every use case, and every operation it invokes, proven by a test scenario tagged with the use case or the `entity.op` (`mde verify`, Scenarios row)?
