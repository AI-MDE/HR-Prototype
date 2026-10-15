---
type: feature
kind: optional
id: single-primary
name: Single Primary
description: "Exactly one child is the primary one, such as a customer's main contact; naming a new one replaces the old."
scope: [entity, relation]
appliedIn: [requirements, design]
aliases: [primary.one]
---

# Single Primary

Exactly one child is the primary one, such as a customer's main contact; naming a new one replaces the old.

## Meaning

Exactly one child per parent is flagged primary at every commit; naming a new primary clears the old one in the same change.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:single-primary/<promise>`.

- `exactly-one` A parent with children always has exactly one primary.
- `replaces-old` Naming a new primary clears the old one.
