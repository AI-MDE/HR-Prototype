---
type: feature
kind: optional
id: state-machine
name: State Machine
description: "A record moves through named statuses by its operations; an action applies only from the right status, and doing it twice is refused."
scope: [entity, operation]
appliedIn: [requirements, design]
aliases: [stateMachine, state.compare]
---

# State Machine

A record moves through named statuses by its operations; an action applies only from the right status, and doing it twice is refused.

## Meaning

Each transition names its source and target statuses. A transition compares the stored status with its source; a repeated or late command whose source no longer matches is refused, with no duplicate history or event.

## Realizations

- **compare-and-set**: `UPDATE … SET status = ? WHERE id = ? AND status = ?`.

An application chooses one, or its own, and records it in its catalog (`specs/design/catalog.json`).

## Constraints

- Atomic: the status change and its history commit together.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:state-machine/<promise>`.

- `allowed-from-source` An operation succeeds from its source status and leaves the target status.
- `refused-elsewhere` From any other status it is refused, and nothing changes.
- `no-duplicate` Repeating a transition is refused, with no duplicate history or event.
