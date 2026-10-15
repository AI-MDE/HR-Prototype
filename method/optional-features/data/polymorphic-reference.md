---
type: feature
kind: optional
id: polymorphic-reference
name: Polymorphic Reference
description: "One link that can point at different kinds of record, always at one that exists."
scope: [entity, relation]
appliedIn: [design]
aliases: [reference.polymorphic]
---

# Polymorphic Reference

One link that can point at different kinds of record, always at one that exists.

## Meaning

A reference names its target's kind in a type column; the service verifies, in the same transaction, that the target exists in the table the type selects.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:polymorphic-reference/<promise>`.

- `target-exists` A reference to a record that does not exist is refused.
- `kind-valid` A reference to a kind it does not allow is refused.
