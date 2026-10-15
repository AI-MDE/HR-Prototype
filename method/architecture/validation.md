---
type: architecture
---

# Architecture Validation

## Decision

Architecture validation must produce an item-by-item conformance report against the application's architecture specifications.

## Rationale

Architecture specifications are durable engineering constraints, not background reading. Validation must make drift visible by comparing implemented behavior, code organization, tests, documentation, diagrams, configuration, and operational behavior against each stated architecture rule.

## Required Report

An architecture validation report must include:

- each architecture topic that was checked;
- a status such as `Pass`, `Partial`, `Fail`, or `N/A`;
- concise evidence for each status;
- findings ordered by severity when a mismatch creates meaningful risk;
- test gaps where executable tests do not cover required architecture behavior;
- documentation or diagram drift where maintained knowledge contradicts implementation.

## Validation Scope

The report should cover, where applicable:

- architecture overview and structural boundaries;
- domain behavior, application operations, identity, and access control;
- external-interface boundaries, contracts, validation, and error discipline;
- persistence model, evolution, constraints, boundaries, seed/reference data, and audit requirements;
- UI architecture, states, navigation, reference display, and selector stability;
- testing architecture, traceability, coverage measurement, and integration testing;
- deployment architecture, configuration, secrets handling, connectivity, health behavior, and operator documentation;
- maintained architecture and design diagrams.

## Evidence Rules

Use direct evidence from the repository. Passing tests are useful evidence, but a passing test suite does not prove conformance when required architecture behavior is untested.

When implementation intentionally diverges from architecture, identify whether architecture knowledge should be updated, implementation should be changed, or both.
