---
type: feature
kind: optional
id: outbox
name: Outbox
description: "What the application sends out is recorded with the change that caused it and delivered reliably, after that change is saved."
scope: [application]
appliedIn: [requirements, design]
---

# Outbox

What the application sends out is recorded with the change that caused it and delivered reliably, after that change is saved.

## Meaning

A message or business event to send is written in the same transaction as the change; it is delivered after commit, retried on failure, and never sent for a change that rolled back.

## Realizations

- **transactional-outbox**: An outbox table written in the transaction, read by a dispatcher after commit.

An application chooses one, or its own, and records it in its catalog (`specs/design/catalog.json`).

## Constraints

- Atomic: the outbox entry commits with the change.
- After commit: delivery happens only after the change is committed.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:outbox/<promise>`.

- `committed-only` Nothing is sent for a change that rolled back.
- `delivered-after-commit` A committed change's messages are delivered.
- `retried` A failed delivery is retried and never undoes the change.
