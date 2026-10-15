---
type: feature
kind: optional
id: optimistic-concurrency
name: Optimistic Concurrency
description: "Two people editing the same record cannot silently overwrite each other: the second save is refused and asked to refresh."
scope: [entity]
appliedIn: [requirements, design]
aliases: [versioning, concurrency.version]
---

# Optimistic Concurrency

Two people editing the same record cannot silently overwrite each other: the second save is refused and asked to refresh.

## Meaning

Every write of the record carries the version it read. The write compares it with the stored version and increments it; a stale version is refused as a conflict, and nothing is written.

## Parameters

| Parameter | Type | Default | Meaning |
|---|---|---|---|
| `versionField` | string | `version` | The attribute that holds the version token. |

## Realizations

- **version-column**: An integer column; `UPDATE … WHERE id = ? AND version = ?`; zero rows updated is a conflict.
- **etag**: An ETag over the record; the write sends `If-Match`; a mismatch is 412 or 409.

An application chooses one, or its own, and records it in its catalog (`specs/design/catalog.json`).

## Constraints

- Before: the version is compared before anything else of the write is stored.
- Atomic: the comparison and the write are one statement or one transaction.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:optimistic-concurrency/<promise>`.

- `increments` A successful write increments the version.
- `stale-rejected` A write with a stale version is refused with a conflict, and nothing of it is stored.
- `no-silent-overwrite` Two concurrent writes from the same version never both succeed.
