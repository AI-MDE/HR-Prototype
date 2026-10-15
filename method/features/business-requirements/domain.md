---
type: feature
kind: build
id: business-requirements-domain
title: Domain
origin: mde
impacts:
  - business-requirements
---

# Domain

## Purpose

The "Domain" rules of the business-requirements Target that no other Feature supplies.

## Impact on business-requirements

The Domain overview identifies the business problem or opportunity, the business goals, what is in and out of scope, assumptions, constraints, and stakeholders. Missing or deferred items are marked explicitly rather than presented as complete.

## Verify

- `domain-written` Are the Domain's Purpose and Scope written, not left as "Not yet described" (`mde verify`, Domain row)?
- `links-resolve` Does every link inside the requirements resolve (`mde verify`, Requirement links row)?

## Audit

- **Domain:** Are the problem, goals, scope boundaries, assumptions, constraints, and stakeholders identified, with gaps marked as such?
