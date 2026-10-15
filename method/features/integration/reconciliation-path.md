---
type: feature
kind: build
id: reconciliation-path
title: Reconciliation path
origin: mde
impacts:
  - integration
default: n/a
---

# Reconciliation path

## Purpose

Asynchronous or synchronized data has an operational reconciliation path — a way to detect and
correct drift between systems.

## Applicability

Applies to an actual external integration in scope. Resolve the selected contract and mechanism in the owning Integration specification.

## Impact on integration

- Asynchronous or synchronized data has an operational reconciliation path: observability and a defined way to detect and correct drift. Unresolved destructive synchronization, conflict, or ownership decisions stay open in `work/current/questions.md`.

## Audit

- Does asynchronous or synchronized data have a reconciliation path, with unresolved decisions kept open as questions?
