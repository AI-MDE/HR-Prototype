---
type: feature
kind: optional
id: last-write-wins
name: Last Write Wins
description: "For simple records, the latest saved edit wins; rules that span records are still protected by locking."
scope: [entity]
appliedIn: [design]
aliases: [concurrency.lastWrite]
---

# Last Write Wins

For simple records, the latest saved edit wins; rules that span records are still protected by locking.

## Meaning

No version token: scalar edits keep the last accepted write, and the aggregate's row locks protect the rules that span records.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:last-write-wins/<promise>`.

- `last-kept` Of two edits, the later one is kept.
- `invariants-locked` A rule spanning records still holds under concurrent edits.
