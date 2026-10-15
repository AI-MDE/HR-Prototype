---
type: feature
kind: optional
id: pagination
name: Pagination
description: "Lists come a page at a time, can be filtered and sorted, and always in the same order; people see, and count, only the records they are allowed to."
scope: [entity, relation]
appliedIn: [requirements, design]
aliases: [read.paged]
---

# Pagination

Lists come a page at a time, can be filtered and sorted, and always in the same order; people see, and count, only the records they are allowed to.

## Meaning

A collection read takes allowed filters, a sort and a page; the sort is stable (the id breaks ties); it returns the items, the total, the page and its size; access scope applies before counting, filtering or paging.

## Parameters

| Parameter | Type | Default | Meaning |
|---|---|---|---|
| `pageSize` | number | `25` | The default page size. |

## Realizations

- **offset-limit**: `LIMIT`/`OFFSET` over a stable `ORDER BY … , id`.
- **cursor**: A cursor over the sort key and id.

An application chooses one, or its own, and records it in its catalog (`specs/design/catalog.json`).

## Constraints

- Before: access scope is applied before the total is counted.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:pagination/<promise>`.

- `stable-order` The same read returns the same order, page after page.
- `total-in-scope` The total counts only the records the user may see.
- `filters-allowed` Only the allowed attributes can be filtered on; others are refused.
