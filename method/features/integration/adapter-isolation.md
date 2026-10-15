---
type: feature
kind: build
id: adapter-isolation
title: Adapter isolation
origin: mde
impacts:
  - integration
default: n/a
---

# Adapter isolation

## Purpose

Capability code depends on an application-owned interface; a dedicated adapter owns the vendor
contract — so vendor types never leak into domain code.

## Applicability

Applies to an actual external integration in scope. Resolve the selected contract and mechanism in the owning Integration specification.

## Impact on integration

Capability domain and services depend on an application-owned interface; a dedicated adapter owns the vendor and transport types, the mapping, authentication, retries, and the translation of external errors. Vendor types in domain code are a failure. The adapter is the integration boundary in the architecture and interaction diagrams.

## Audit

- Does capability code depend on an application-owned interface, with a dedicated adapter owning transport, mapping, authentication, retries, and error translation?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on architecture

The adapter is the integration boundary in the architecture + interaction diagrams (see the
[Architecture Diagram](../../metamodel/architecture/architecture-diagram.md) and [Interaction Diagram](../../metamodel/architecture/interaction-diagram.md) concepts).
