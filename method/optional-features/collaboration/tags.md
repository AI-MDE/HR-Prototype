---
type: feature
kind: optional
id: tags
name: Tags
description: "People label records freely to find them again."
scope: [entity]
appliedIn: [requirements]
---

# Tags

People label records freely to find them again.

## Meaning

A record carries tags from a free or controlled vocabulary, personal or shared as chosen; records can be listed by tag.

## Parameters

| Parameter | Type | Default | Meaning |
|---|---|---|---|
| `vocabulary` | enum (free, controlled) | `free` | free = users type new tags as they go; controlled = tags are chosen from a list a role maintains. |
| `scope` | enum (shared, personal) | `shared` | shared = everyone sees an instance's tags; personal = each user's tags are their own. |

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:tags/<promise>`.

- `tag-and-find` A tagged record is found by its tag.
- `vocabulary` With a controlled vocabulary, a tag outside it is refused.
- `personal-scope` Personal tags are seen only by their owner.
