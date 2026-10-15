---
type: feature
kind: build
id: secrets-and-timeouts
title: Secrets and timeouts
origin: mde
impacts:
  - integration
default: n/a
---

# Secrets and timeouts

## Purpose

External calls never block forever and never commit secrets — timeouts are explicit and secrets
are externalized.

## Applicability

Applies to an actual external integration in scope. Resolve the selected contract and mechanism in the owning Integration specification.

## Impact on integration

- External calls have explicit timeouts and never block forever. Committed source contains no secrets; they are externalized, and sensitive data handling is explicit.

## Audit

- Do external calls have explicit timeouts, with no committed secrets?
