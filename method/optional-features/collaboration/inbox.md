---
type: feature
kind: optional
id: inbox
name: Inbox
description: "Each person has one place listing what needs their attention."
scope: [application]
appliedIn: [requirements]
---

# Inbox

Each person has one place listing what needs their attention.

## Meaning

Items addressed to a user (assignments, mentions, notifications) gather in their inbox, newest first, marked read or unread.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:inbox/<promise>`.

- `own-items` A user sees only the items addressed to them.
- `read-state` Opening an item marks it read.
- `newest-first` Items are listed newest first.
