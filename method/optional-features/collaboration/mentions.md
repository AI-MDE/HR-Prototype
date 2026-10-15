---
type: feature
kind: optional
id: mentions
name: Mentions
description: "Naming a person in a comment or message tells them."
scope: [entity]
appliedIn: [requirements]
aliases: [mention]
---

# Mentions

Naming a person in a comment or message tells them.

## Meaning

An @-mention of a user in text the record holds notifies that user, if they may see the record.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:mentions/<promise>`.

- `mentioned-notified` A mentioned user is notified.
- `no-leak` A user who may not see the record is not notified and gains no access.
