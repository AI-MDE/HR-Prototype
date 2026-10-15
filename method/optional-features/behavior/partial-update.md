---
type: feature
kind: optional
id: partial-update
name: Partial Update
description: "A form changes only the fields people may edit: the system sets ids, statuses and timestamps itself, and a change leaves every other field as it was."
scope: [application]
appliedIn: [design]
aliases: [write.patch]
---

# Partial Update

A form changes only the fields people may edit: the system sets ids, statuses and timestamps itself, and a change leaves every other field as it was.

## Meaning

Create takes the business attributes only; the service sets the id, the initial status and system values. Update is a patch of editable attributes: omitted fields keep their values; system fields in a request are refused.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:partial-update/<promise>`.

- `omitted-kept` Fields left out of an update keep their values.
- `system-fields-refused` A request setting a system field (id, status, timestamps) is refused.
