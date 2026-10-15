---
type: feature
kind: build
id: ownership-and-mapping
title: Ownership and mapping
origin: mde
impacts:
  - integration
default: n/a
---

# Ownership and mapping

## Purpose

For every exchanged entity/field, who owns the data and the decision is explicit, and the
mapping between external and internal shapes is defined.

## Applicability

Applies to an actual external integration in scope. Resolve the selected contract and mechanism in the owning Integration specification.

## External Standards

External standards are background references, not a declaration of compliance.

- **AsyncAPI** — https://www.asyncapi.com/docs/reference/specification/latest
  - EVT-ASYNC-01 (Identify producers and consumers)

## Impact on integration

For every exchanged entity and field, data and decision ownership is explicit (the source of truth, and the direction). The mapping between the external contract and the internal model is defined, and owned by the adapter.

## Audit

- Is ownership explicit for every exchanged entity and field, with the mapping defined?
