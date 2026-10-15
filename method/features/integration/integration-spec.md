---
type: feature
kind: build
id: integration-spec
title: Integration specification
origin: mde
impacts:
  - integration
default: n/a
---

# Integration specification

## Purpose

Every in-scope external system has a non-placeholder contract+adapter design recording how the
app integrates with it.

## Applicability

Applies to an actual external integration in scope. Resolve the selected contract and mechanism in the owning Integration specification.

## External Standards

External standards are background references, not a declaration of compliance.

- **arc42** — https://arc42.org/overview
  - ARC42-03 (Context and scope)
- **AsyncAPI** — https://www.asyncapi.com/docs/reference/specification/latest
  - EVT-ASYNC-01 (Identify producers and consumers)
  - EVT-ASYNC-05 (Define protocol and bindings)

## Impact on integration

Every in-scope external system has a non-placeholder specification recording ownership, mapping, authentication and secrets, timeout, retry, and idempotency, compatibility, failure recovery, observability, and the test environment.

## Audit

- Does every in-scope external system have a complete, non-placeholder specification?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on application-design

The integration spec is part of design specs, created from the integration template and
reviewed against the Integration target.
