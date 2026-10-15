---
type: feature
kind: optional
id: storage-naming
name: Storage Naming
description: "Tables and columns are named from the model by one convention, so storage names are never written down twice."
scope: [application]
appliedIn: [design]
aliases: [naming.snake]
---

# Storage Naming

Tables and columns are named from the model by one convention, so storage names are never written down twice.

## Meaning

A table is the entity's name in the convention's case plus a plural suffix, and a column its attribute's name; a capability design gives a storage name only where it differs.

## Parameters

| Parameter | Type | Default | Meaning |
|---|---|---|---|
| `convention` | enum (snake, camel) | `snake` | The case of storage names. |

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:storage-naming/<promise>`.

- `names-follow-model` Every table and column is named by the convention, or by the design where it differs.
