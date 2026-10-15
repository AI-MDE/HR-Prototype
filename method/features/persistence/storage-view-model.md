---
type: feature
kind: build
id: storage-view-model
title: Physical data realization
origin: mde
impacts:
  - persistence-design
default: n/a
---

# Physical data realization

## Purpose

Record how logical entities, relationships and object-specific concerns map to the selected persistence technology.

## Applicability

Applies to persisted concepts and selected persistence concerns in scope. Object-specific selections belong to their owning concepts; Design chooses the realization within Architecture.

## Impact on persistence-design

- Storage follows the confirmed entity model, not the other way around. Derive it from the entities and their capability's design, resolving keys, columns or documents, constraints, relationships, deletion and retention, audit, and concurrency where they apply.

- Storage follows a naming convention the [Design Catalog](../../metamodel/design/design-catalog.md) states once (a table per entity, a column per attribute), plus the columns the applied Features add; the [Capability Design](../../metamodel/design/capability-design.md) names a table or column only where it differs. Never list tables and columns that follow from the convention, and never create another physical model: the business view and its storage cannot drift apart, and the requirements carry no storage.

- Surrogate identity is one choice, not a mandatory aspect. A business identifier the business actually uses remains a requirement, whatever the key.

## Audit

- Does the physical mapping preserve the logical meaning and the required constraints?
- Does each persisted entity's storage follow from the catalog's convention, its Features, and its capability design's overrides, with no table or column listed that the convention already gives? Does every attribute have exactly one column, and does every other column say what it is (key, foreign key, audit, version)?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on persistence

Realize the adopted mapping with appropriate schema/collections, migrations and data access. Verify all scoped logical concepts needing persistence are accounted for, including design-only changes.
