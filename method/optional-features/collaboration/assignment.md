---
type: feature
kind: optional
id: assignment
name: Assignment
description: "A record is assigned to a person who is responsible for it."
scope: [entity, use-case]
appliedIn: [requirements]
aliases: [assign]
---

# Assignment

A record is assigned to a person who is responsible for it.

## Meaning

A record has an assignee, set and changed by those allowed to; the assignee sees it among their work.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:assignment/<promise>`.

- `assigned` Assigning a record makes that person its assignee.
- `in-assignee-work` The assignee sees the record among their work.
- `reassign-allowed-only` Only those allowed can assign or reassign.
