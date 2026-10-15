---
type: feature
kind: optional
id: restricted-delete
name: Restricted Delete
description: "A record that others still refer to cannot be deleted, and nothing is purged behind anyone's back."
scope: [entity]
appliedIn: [design]
aliases: [delete.restrict]
---

# Restricted Delete

A record that others still refer to cannot be deleted, and nothing is purged behind anyone's back.

## Meaning

Deletion keeps every reference: foreign keys restrict, the business rules are checked before deleting, and nothing is purged or expires.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:restricted-delete/<promise>`.

- `referenced-refused` Deleting a record others refer to is refused, and nothing changes.
- `unreferenced-deleted` A record nothing refers to is deleted when its business rules allow.
