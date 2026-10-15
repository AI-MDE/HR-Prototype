---
type: feature
kind: build
id: compatibility-versioning
title: Compatibility and versioning
origin: mde
impacts:
  - integration
default: n/a
---

# Compatibility and versioning

## Purpose

Contract versioning and compatibility behavior are defined — so an external contract change
doesn't silently break the integration.

## Applicability

Applies to an actual external integration in scope. Resolve the selected contract and mechanism in the owning Integration specification.

## External Standards

External standards are background references, not a declaration of compliance.

- **AsyncAPI** — https://www.asyncapi.com/docs/reference/specification/latest
  - EVT-ASYNC-08 (Compatibility and versioning)

## Impact on integration

- Contract versioning and compatibility are defined: how a version change is detected and handled, so an external change never breaks the integration silently.

## Audit

- Are versioning and compatibility defined, so an external change never breaks the integration silently?
