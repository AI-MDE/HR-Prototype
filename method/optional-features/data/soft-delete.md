---
type: feature
kind: optional
id: soft-delete
name: Soft Delete
description: "Deleting keeps the record, marked with when it was deactivated: it leaves the lists, and its history and links stay readable."
scope: [entity]
appliedIn: [requirements, design]
aliases: [softDelete, delete.deactivate]
---

# Soft Delete

Deleting keeps the record, marked with when it was deactivated: it leaves the lists, and its history and links stay readable.

## Meaning

Delete marks the record deactivated, with the time; lists and searches leave it out by default; reads by id and the records that refer to it still see it.

## Parameters

| Parameter | Type | Default | Meaning |
|---|---|---|---|
| `field` | string | `deactivatedAt` | The attribute that records when the record was deactivated. |

## Realizations

- **deactivated-at-column**: A nullable timestamp column; lists filter `deactivated_at IS NULL`.

An application chooses one, or its own, and records it in its catalog (`specs/design/catalog.json`).

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:soft-delete/<promise>`.

- `kept-on-delete` A deleted record still exists, with when it was deactivated.
- `hidden-from-lists` A deleted record no longer appears in lists or searches.
- `references-readable` Records that refer to a deleted record still show it.
