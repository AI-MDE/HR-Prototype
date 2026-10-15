---
type: feature
kind: optional
id: notifications
name: Notifications
description: "People are told when something they care about happens."
scope: [entity, operation, use-case]
appliedIn: [requirements]
aliases: [notification]
---

# Notifications

People are told when something they care about happens.

## Meaning

A committed business event notifies the people the requirements name, through the channels configured; a failed notification never undoes the change.

## Constraints

- After commit: notifications are sent only for committed business events.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:notifications/<promise>`.

- `named-recipients` The people the requirements name are notified of the event.
- `committed-only` No notification is sent for a change that rolled back.
- `failure-isolated` A failed notification does not undo the change.
