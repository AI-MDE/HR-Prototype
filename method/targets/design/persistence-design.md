---
type: target
id: persistence-design
title: Persistence design
applies_when:
  - the work designs or changes how entities are stored: tables or collections, keys, constraints, relationships
  - the work designs audit history or concurrency control for the data
stage: design
needs:
  - database
---

# Persistence design

<!-- COMPILED by compile-targets.mjs from features. Skeleton (Purpose +
     applies_when) is authored; the sections below are composed from the
     contributing features, each tagged [feature: <id>]. Do not hand-edit
     the composed sections — edit the feature and recompile. -->

## Purpose

What a good physical data design looks like, and how to check it: how the business entities are stored, as the design persistence is built from. Its shape is defined by the [Data Model](../../metamodel/design/data-model.md) concept and each entity's Storage View; the built schema is checked by the [persistence](../app/persistence.md) Target.

It governs: [Data Model](../../metamodel/design/data-model.md), each [Entity](../../metamodel/requirements/entity.md)'s storage (the [Design Catalog](../../metamodel/design/design-catalog.md)'s naming convention and terms, and its [Capability Design](../../metamodel/design/capability-design.md)'s overrides), and the [Physical Data Model Diagram](../../metamodel/design/physical-data-model-diagram.md).

## Outputs

| Output | Where | When |
|---|---|---|
| Storage | the catalog's naming convention and the terms' `adds`; a capability design's `storage` only where a name differs | per persisted entity |
| Physical data model diagram | `specs/design/diagrams/pdm.md` (a Mermaid `erDiagram`; one page per capability when large), drawn from the Storage Views | with the first Storage View |

## Evidence

The rows of the Evidence Package this Target owns: what `mde verify` measures and reports for it, each by its id. Tools take a row's title and what it proves from here.

| Row | Title | Proves | Needs |
|---|---|---|---|
| physical-data-model | Physical data model | The physical data model diagram is delivered once there is a design, and current if rendered from DOT. | database |

## Composed behavior

### Audit history  `[feature: audit-history]`

- **Audit history** is opt-in per entity, driven by a business rule or use case that asks for it. The design names which entities are audited and to what depth: audit fields only (`created_at`, `created_by`, `updated_at`, `updated_by` at least), or full change history (an `<entity>_history` table or an append-only change log), recorded in the Storage View.

### Design in Features  `[feature: design-in-catalog-terms]`

- An entity's storage follows from the catalog: its naming convention (`storage-naming`: a column per attribute, and a `<referenced entity>_id` per to-one relationship), the columns its applied Features add, and the capability design's `storage` only where a name differs.

### Optimistic locking  `[feature: optimistic-locking]`

- **Optimistic locking** is opt-in per entity: a concurrently editable entity applies a version term of the [design catalog](../../metamodel/design/design-catalog.md) (an integer `version`, or a row version or timestamp used as a concurrency token, which the term adds to its Storage View). The capability design records which entities apply it; the catalog's default for the others (row locks with last accepted write, say) is a term too, so no entity is left unexplained.

### persistence-design rules  `[feature: persistence-design-rules]`

- Entities stay shared concepts: do not make an entity owned by one capability just because one capability writes it first, unless the requirements scope it that way.
- Foreign keys and constraints are deliberate and agree with the design; audit and history fields are explicit when needed. Document behavior specific to the database technology when you rely on it.
- Raw database details stay behind the repository or service boundary; APIs do not leak them.
- Create the physical data model diagram with the first Data Model, and update it whenever the Data Model or the persistence technology changes. Keep it traceable to the logical data model: every business entity accounted for, and the diagram agreeing with the schema it depicts.

### Schema from entities  `[feature: schema-from-entities]`

- Migrations create and change the schema and follow the Storage Views. Account for every scoped concept that needs persistence, including changes made only in design.

### Physical data realization  `[feature: storage-view-model]`

- Storage follows the confirmed entity model, not the other way around. Derive it from the entities and their capability's design, resolving keys, columns or documents, constraints, relationships, deletion and retention, audit, and concurrency where they apply.

- Storage follows a naming convention the [Design Catalog](../../metamodel/design/design-catalog.md) states once (a table per entity, a column per attribute), plus the columns the applied Features add; the [Capability Design](../../metamodel/design/capability-design.md) names a table or column only where it differs. Never list tables and columns that follow from the convention, and never create another physical model: the business view and its storage cannot drift apart, and the requirements carry no storage.

- Surrogate identity is one choice, not a mandatory aspect. A business identifier the business actually uses remains a requirement, whatever the key.

## Verify and Audit

The Checks `mde verify` proves for this target compile to `targets/verification/persistence-design.md`; what a second agent judges compiles to `targets/audit/`, under each Feature's first Target.
