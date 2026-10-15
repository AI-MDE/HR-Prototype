---
type: feature
kind: optional
id: business-journal
name: Business Journal
description: "Business events, such as a request submitted or a sale activated, are written to the business journal as they happen."
scope: [entity]
appliedIn: [requirements, design]
aliases: [journal.business]
---

# Business Journal

Business events, such as a request submitted or a sale activated, are written to the business journal as they happen.

## Meaning

An occurrence is appended to the journal for each business event the entity's transitions raise, as the architecture's journal requires.

## Constraints

- Atomic: the occurrence commits with the transition.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:business-journal/<promise>`.

- `event-journaled` Each business event of the entity is appended to the journal.
- `committed-only` No occurrence remains for a change that rolled back.
