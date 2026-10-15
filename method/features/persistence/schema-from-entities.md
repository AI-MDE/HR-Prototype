---
type: feature
kind: build
id: schema-from-entities
title: Schema from entities
origin: mde
impacts:
  - persistence-design
default: n/a
---

# Schema from entities

## Purpose

Persistence reflects the entity model without making entities artificially owned by one
capability — schema follows the confirmed entities, not the other way around.

## Applicability

Applies to persisted concepts and selected persistence concerns in scope. Object-specific selections belong to their owning concepts; Design chooses the realization within Architecture.

## Impact on persistence-design

- Migrations create and change the schema and follow the Storage Views. Account for every scoped concept that needs persistence, including changes made only in design.

## Verify

- `migration-per-entity` For each touched entity, does a migration create its Storage View table with every declared column (`create table` and its columns against the entity's Storage View)?

## Audit

- Do APIs and services avoid leaking raw database details?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on persistence

The schema follows the confirmed entity model and each entity's Storage View: every touched entity's Storage View has its table, with every declared column. Account for every scoped concept that needs persistence, including changes made only in design.
