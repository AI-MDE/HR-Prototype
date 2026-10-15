---
type: feature
kind: build
id: idempotency-and-retries
title: Idempotency and retries
origin: mde
impacts:
  - integration
default: n/a
---

# Idempotency and retries

## Purpose

Retries and replays are safe — through idempotency or explicit duplicate detection — and
timeout/consistency/recovery behavior is defined.

## Applicability

Applies to an actual external integration in scope. Resolve the selected contract and mechanism in the owning Integration specification.

## Impact on integration

- Retries and replays are safe, through idempotency or explicit duplicate detection and reconciliation. Timeout, duplicate handling, consistency, and recovery are defined.

## Audit

- Are retries and replays safe, with duplicate handling, consistency, and recovery defined?
