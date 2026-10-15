---
type: feature
kind: optional
id: hierarchy
name: Hierarchy
description: "Records nest under a parent of the same kind, to any depth, always within the same parent record and never in a loop."
scope: [entity]
appliedIn: [requirements, design]
aliases: [hierarchy.adjacency]
---

# Hierarchy

Records nest under a parent of the same kind, to any depth, always within the same parent record and never in a loop.

## Meaning

A record may have a parent of the same entity within the same scope. Reparenting checks the ancestors and refuses a cycle; the depth limit and leaf rules are parameters.

## Parameters

| Parameter | Type | Default | Meaning |
|---|---|---|---|
| `parent` | string | `parent` | The relationship to the parent instance. |
| `maxDepth` | number | `0` | The deepest level allowed; 0 = no limit. |
| `leafOnly` | boolean | `false` | Only instances with no children may be used elsewhere (for example only a leaf category may be given to a product). |
| `deleteWithChildren` | enum (refuse, cascade, reparent) | `refuse` | What deleting an instance with children does: refuse it, delete the branch, or give the children the deleted instance's parent. |

## Realizations

- **adjacency-list**: A parent reference; ancestors walked under the scope's lock.

An application chooses one, or its own, and records it in its catalog (`specs/design/catalog.json`).

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:hierarchy/<promise>`.

- `no-cycle` Making a record its own ancestor is refused.
- `same-scope` A parent outside the record's scope is refused.
- `depth-limit` When a depth limit is set, nesting beyond it is refused.
