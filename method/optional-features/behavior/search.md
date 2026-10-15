---
type: feature
kind: optional
id: search
name: Search
description: "People find records by typing what they remember of them."
scope: [entity]
appliedIn: [requirements, design]
---

# Search

People find records by typing what they remember of them.

## Meaning

A text query matches the record's searchable attributes and its label; results respect access scope and soft delete.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:search/<promise>`.

- `finds-by-text` A record is found by text from its searchable attributes or label.
- `in-scope-only` Results include only records the user may see.
