# Application Governance

## Decision
The application is governed by its durable specifications. Business, architecture, design, implementation, tests, and maintained documentation must remain materially consistent.

Governance defines the compliance obligations. Commands such as `verify` execute the checks and report findings.

## Governance Dimensions

### Completeness
Required durable knowledge and required realizations must exist.

### Conformance
Implementation and executable behavior must satisfy the specifications that govern them.

### Consistency
Specifications must not materially contradict one another across business, architecture, and design.

### Traceability
Important behavior should be traceable through the relevant chain:

Business → Architecture → Design → Implementation → Test

### Drift Detection
Governance must detect specification changes not reflected in implementation, implementation changes that introduce durable behavior absent from specifications, and stale tests or documentation.

## Required Governance Checks
A whole-application verification should check at least:

1. business entities, relationships, operations, rules, and use cases;
2. architecture decisions and cross-cutting concerns;
3. UI, external-interface, persistence, and integration design;
4. implementation coverage and contradictions;
5. executable tests and required test coverage;
6. persistence evolution and constraints;
7. operational logging and observability;
8. principal/session identity propagation where applicable;
9. unique correlation/request identity propagation;
10. security and authorization obligations where applicable;
11. business audit obligations where applicable;
12. documentation/specification consistency.

## Incremental Verification
Verification is incremental by default. The workflow identifies changed artifacts, derives the business, architecture, and design obligations transitively affected by those changes, and verifies that affected scope. Comprehensive verification may be run periodically or on demand to detect missed dependencies or broader drift.

## Failure Classification
Verification findings distinguish:

- **Missing** — required knowledge or realization does not exist;
- **Partial** — some required behavior exists but the obligation is incomplete;
- **Contradiction** — implementation or another specification conflicts with the governing specification;
- **Unspecified** — durable implementation behavior exists without corresponding durable knowledge;
- **Stale** — a previously valid artifact no longer reflects the governed application.
