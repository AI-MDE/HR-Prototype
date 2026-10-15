---
type: feature
kind: build
id: required-operation-ui-coverage
title: Required-operation UI coverage (§7)
origin: mde
impacts:
  - testing
default: n/a
---

# Required-operation UI coverage (§7)

## Purpose

Design coverage proves a required operation is **rendered**; this proves it **works** — every
role-permitted operation a page part renders has a UI/E2E scenario that performs it.

## Applicability

Applies to required verification for the scope. Strategy sets rigor and gate policy; Design resolves the test realization and tooling.

## Impact on testing

- Every role-permitted entity operation a page renders has a UI scenario that performs it through the running application. Coverage is measured against the required operations (the entity's operations, filtered to what the role may do), not what the UI happens to show; a rendered operation with no performing test is a gap.
- UI tests drive a real browser (Playwright, Selenium, Cypress, or the stack's equivalent): navigate to the running application, sign in or select the role, use real controls through stable selectors, perform the operation end to end, and assert the outcome. A suite whose steps read source files, match strings in generated code, or change local variables is not a UI test, however green Cucumber reports it.
- Assert behavior, not presence. For a mutating operation, complete the round trip and assert an observable outcome: a created record is retrievable (in the list, or after a reload), an update persists, a search returns the seeded record. Asserting only that a control is visible is a defect: it passes even when Save is wired to the wrong record.

## Verify

- `rendered-operations-performed` Does every role-permitted operation a page renders have a UI scenario that performs it in a real browser and asserts an observable outcome, with a screenshot from the run?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on ui-design

The denominator is the rendered, role-permitted operations from [operation coverage](../ui-shared/operation-coverage.md).
