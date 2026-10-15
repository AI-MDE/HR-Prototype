---
type: feature
kind: optional
id: ordering
name: Ordering
description: "Items keep a numbered order (1, 2, 3…): new ones go last, and people can rearrange the whole list at once."
scope: [entity, relation]
appliedIn: [requirements, design]
aliases: [ordering.dense]
---

# Ordering

Items keep a numbered order (1, 2, 3…): new ones go last, and people can rearrange the whole list at once.

## Meaning

Siblings carry a sequence within their parent. A new sibling goes last; a reorder gives the complete ordered list of siblings and rewrites the sequence in one change; a stale or incomplete list is refused.

## Parameters

| Parameter | Type | Default | Meaning |
|---|---|---|---|
| `field` | string | `position` | The child attribute that holds the item's position (for example lineNo). |
| `reorder` | boolean | `true` | Users may move items to a new position; false fixes the order of entry. |
| `numbering` | enum (sequential, gapped) | `sequential` | sequential = positions 1, 2, 3 renumbered after every change; gapped = 10, 20, 30, so an inserted item takes a free number and the others keep theirs (line numbers others quote). |

## Realizations

- **dense-sequence**: Sequence 1..n rewritten atomically under the parent's lock.

An application chooses one, or its own, and records it in its catalog (`specs/design/catalog.json`).

## Constraints

- Atomic: a reorder rewrites every sibling's position or none.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:ordering/<promise>`.

- `appended-last` A new item is placed last.
- `reorder-complete` A reorder with the complete list renumbers every item in that order.
- `reorder-incomplete-refused` A reorder that leaves out an item, or comes from a stale list, is refused and changes nothing.
