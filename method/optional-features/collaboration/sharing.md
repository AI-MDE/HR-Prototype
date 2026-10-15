---
type: feature
kind: optional
id: sharing
name: Sharing
description: "A person can share a record with others, who then see it."
scope: [entity]
appliedIn: [requirements]
aliases: [share]
---

# Sharing

A person can share a record with others, who then see it.

## Meaning

Sharing grants named people access to one record, within what their roles allow; it can be withdrawn.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:sharing/<promise>`.

- `shared-visible` A person a record is shared with can see it.
- `within-role` Sharing never grants more than the recipient's role allows.
- `withdrawn` Withdrawing a share removes the access.
