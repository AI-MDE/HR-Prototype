---
type: feature
kind: build
id: evidence-architecture-audit
title: Architecture audit
origin: mde
impacts:
  - evidence
---

# Architecture audit

## Purpose

The rules of the evidence Target for the [Architecture Audit](../../metamodel/evidence/architecture-audit.md) and the other [Audit Reports](../../metamodel/evidence/audit-report.md) that no other Feature supplies.

## Impact on evidence

- The second agent writes each Audit Report to `evidence/audit/<target>.md`, and the Architecture Audit to `evidence/audit/architecture.md`, ending with the summary line *N genuine · M fake · K not-exercised*, which `mde verify` counts.
- The Architecture Audit judges each decision as written (resolved, traceable, consistent); the code's conformance to them is in the *Conformance* section of the server's and the web UI's Audit Reports, where a decision marked "not checked" is shown as such, never as conforming.
- Each violation, and each fake on an in-scope concern, is also recorded as a Finding.

## Verify

- `audits-counted` Does the Evidence Package count each Audit Report from its summary line, and the decisions the Architecture Audit covers?

## Audit

- Does the Architecture Audit judge every decision, and does each Conformance section show unchecked decisions as unchecked, with each violation also a Finding?
- Does each Audit Report give every concern a verdict with a witness, never "it exists" or "it responded" alone?
