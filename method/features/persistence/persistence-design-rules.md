---
type: feature
kind: build
id: persistence-design-rules
title: persistence-design rules
origin: mde
impacts:
  - persistence-design
---

# persistence-design rules

## Purpose

The general rules of the persistence-design Target that no other Feature supplies.

## Impact on persistence-design

- Entities stay shared concepts: do not make an entity owned by one capability just because one capability writes it first, unless the requirements scope it that way.
- Foreign keys and constraints are deliberate and agree with the design; audit and history fields are explicit when needed. Document behavior specific to the database technology when you rely on it.
- Raw database details stay behind the repository or service boundary; APIs do not leak them.
- Create the physical data model diagram with the first Data Model, and update it whenever the Data Model or the persistence technology changes. Keep it traceable to the logical data model: every business entity accounted for, and the diagram agreeing with the schema it depicts.

## Verify

- `database-matches-mapping` Does the actual database agree with the mapping (a schema dump read against the Storage Views)?

## Audit

- Are keys, lifecycle, and the selected aspects' realizations explicit?
- Does the physical data model diagram account for every business entity and agree with the schema?
