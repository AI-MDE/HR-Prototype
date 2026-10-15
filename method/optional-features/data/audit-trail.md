---
type: feature
kind: optional
id: audit-trail
name: Audit Trail
description: "Each record says when it was created and changed, and, as chosen, by whom, and keeps its history."
scope: [entity]
appliedIn: [requirements, design]
aliases: [audit]
---

# Audit Trail

Each record says when it was created and changed, and, as chosen, by whom, and keeps its history.

## Meaning

Creation and update times (and, as chosen, the users) are set by the system from the request's context, never taken from the client; the history option keeps state or full history.

## Parameters

| Parameter | Type | Default | Meaning |
|---|---|---|---|
| `created` | boolean | `true` | Record when an instance was created. |
| `createdBy` | boolean | `false` | Record who created an instance. |
| `updated` | boolean | `true` | Record when an instance was last updated. |
| `updatedBy` | boolean | `false` | Record who last updated an instance. |
| `history` | enum (none, state, full) | `none` | none = timestamps only; state = state value/date history; full = complete entity history. |

## Realizations

- **audit-columns**: created_at/updated_at (and _by) columns set by the service.
- **history-table**: A history table written in the same transaction.

An application chooses one, or its own, and records it in its catalog (`specs/design/catalog.json`).

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:audit-trail/<promise>`.

- `set-by-system` Creation and update times (and users, when chosen) are set by the system, not the client.
- `updated-on-change` A change updates the update time (and user).
- `history-kept` With history, each change is recorded and readable.
