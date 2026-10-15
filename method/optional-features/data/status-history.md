---
type: feature
kind: optional
id: status-history
name: Status History
description: "Every status change is recorded (from what, to what, by whom, when and why), starting with the record's first status."
scope: [entity]
appliedIn: [requirements, design]
aliases: [history.status]
---

# Status History

Every status change is recorded (from what, to what, by whom, when and why), starting with the record's first status.

## Meaning

The history gets an entry for the initial status and every transition, with the actor and time from the request's context and the operation's reason.

## Constraints

- After: the entry reflects a transition that succeeded.
- Atomic: the entry commits with the transition, or neither does.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:status-history/<promise>`.

- `initial-recorded` Creating a record records its first status.
- `transition-recorded` Each transition records from, to, who, when and why.
- `rolled-back-absent` A refused or rolled-back transition leaves no entry.
