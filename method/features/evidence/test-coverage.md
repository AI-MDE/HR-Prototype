---
type: feature
kind: build
id: evidence-test-coverage
title: Test coverage
origin: mde
impacts:
  - evidence
---

# Test coverage

## Purpose

The "Test coverage" rules of the evidence Target that no other Feature supplies.

## Impact on evidence

- Rows come from the Specs, not from the tests that happen to exist: each use case and its significant alternate paths, each business rule with its violating and boundary cases, each entity operation including prohibited ones, each page's required operations.
- A requirement with no scenario is a visible gap, not an omission. A row counts as covered only when a scenario naming it passed in the current report.
- Totals state covered, failing, and uncovered requirements separately.

## Verify

- `requirements-listed` Does test coverage list every requirement in scope, with uncovered ones visible and covered ones backed by a passing scenario?
