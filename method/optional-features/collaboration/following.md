---
type: feature
kind: optional
id: following
name: Following
description: "People follow a record to hear about its changes."
scope: [entity]
appliedIn: [requirements]
aliases: [follow]
---

# Following

People follow a record to hear about its changes.

## Meaning

A user follows or unfollows a record; followers are notified of its changes.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:following/<promise>`.

- `follow-toggle` A user can follow and unfollow a record.
- `followers-notified` Followers are notified when the record changes.
