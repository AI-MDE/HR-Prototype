---
type: feature
kind: build
id: gherkin-traceability
title: Behavior scenario traceability
origin: mde
impacts:
  - testing
default: n/a
---

# Behavior scenario traceability

## Purpose

Express required behavioral verification as readable scenarios with a trace to the obligation being proven.

## Applicability

Applies to required verification for the scope. Strategy sets rigor and gate policy; Design resolves the test realization and tooling.

## Impact on testing

- Write use-case, business-rule, and acceptance scenarios as readable Gherkin `.feature` files run by Cucumber, unless the project adopted an equivalent (recorded, with equivalent evidence). Tag each scenario with the spec it proves (for example `@assign-employee-to-project`, `@allocation-cap`), and a scenario that performs an entity operation with that operation (`@employee.create`), so test coverage can be derived from the reports and `mde verify` can tie each operation a page offers to its scenario.

- The same operation set that has endpoints ([API](../api/capability-api-boundary.md)) has scenarios.

## Verify

- `scenarios-traced` Are behavioral scenarios readable and traced: each tagged with the spec it proves, and every entity operation with an endpoint also covered by a scenario?
