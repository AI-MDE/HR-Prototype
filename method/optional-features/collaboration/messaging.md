---
type: feature
kind: optional
id: messaging
name: Messaging
description: "People send messages to each other, or about a record."
scope: [application, entity]
appliedIn: [requirements]
---

# Messaging

People send messages to each other, or about a record.

## Meaning

A message has a sender, recipients and a body, optionally about a record; recipients see it in their inbox.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:messaging/<promise>`.

- `delivered-to-recipients` Each recipient sees a sent message.
- `about-record` A message about a record is shown with that record to those who may see it.
