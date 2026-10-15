---
type: feature
kind: optional
id: immutable-record
name: Immutable Record
description: "Once written, these records are never changed or deleted."
scope: [entity]
appliedIn: [requirements, design]
aliases: [record.immutable]
---

# Immutable Record

Once written, these records are never changed or deleted.

## Meaning

Records are only inserted and read: no update or delete exists, through the API or the writer.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:immutable-record/<promise>`.

- `no-update` Changing a written record is refused.
- `no-delete` Deleting a written record is refused.
