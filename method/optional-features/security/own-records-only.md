---
type: feature
kind: optional
id: own-records-only
name: Own Records Only
description: "A person sees and works on only their own records, such as a technician's profile and the requests assigned to them."
scope: [entity]
appliedIn: [requirements, design]
aliases: [scope.own]
---

# Own Records Only

A person sees and works on only their own records, such as a technician's profile and the requests assigned to them.

## Meaning

For the roles it applies to, reads and writes are limited to the records the principal owns or is assigned to.

## Constraints

- Before: the scope applies before filtering, counting or paging.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:own-records-only/<promise>`.

- `own-visible` The user sees their own records.
- `others-hidden` Others' records are neither listed nor readable by id.
- `others-unchangeable` Changing another's record is refused.
