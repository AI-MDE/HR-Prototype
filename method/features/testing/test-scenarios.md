---
type: feature
kind: build
id: test-scenarios
title: Test scenarios
origin: mde
impacts:
  - testing
default: n/a
---

# Test scenarios

## Purpose

Provide concrete, repeatable proofs for scoped required behavior and failure cases.

## Applicability

Applies to required verification for the scope. Strategy sets rigor and gate policy; Design resolves the test realization and tooling.

## Impact on testing

- Derive scenarios from the requirements and design, not from the code. Each records its fixtures, actor and context, actions, expected outcome, and assertions; it covers the relevant normal, boundary, and failure cases, and its fixtures reset controlled fictional data repeatably and isolate it.

- A business rule needs satisfying and violating cases, including boundaries, and its rejection asserts on the rule's id in the structured error ([API](../api/business-rule-responses.md)), not a generic status. Rules may be exercised through use cases or a dedicated suite; do not require duplicates.

## Audit

- Do all required behavioral obligations have readable, traced scenarios with executed evidence, and are rule cases discriminating (asserting the rule id), not generic?
