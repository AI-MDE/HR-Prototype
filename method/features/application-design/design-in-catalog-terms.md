---
type: feature
kind: build
id: design-in-catalog-terms
title: Design in Features
origin: mde
impacts:
  - application-design
  - persistence-design
default: n/a
---

# Design in Features

## Purpose

Design is technical, brief, and stated once: the reusable [Features](../../metamodel/feature.md) an entity or operation applies, recorded in the application's [Design Catalog](../../metamodel/design/design-catalog.md) with the realization chosen and applied by id in each [Capability Design](../../metamodel/design/capability-design.md); and, for what is particular to one operation, short prose in its entity's [Entity Design](../../metamodel/design/entity-design.md).

## Applicability

Applies to every application design: entity and operation realization (Features, and each operation's own design in its Entity Design), the optional Features the requirements apply, storage, and the application-wide semantics (paging, errors, access, naming).

## Impact on application-design

- Write the catalog as you design: start it with the first design work, add a Feature the first time a design applies it, and reuse it from then on. Use the Method's [optional Features](../../optional-features/index.md) by id, with this application's realization, rather than inventing a synonym; define an application Feature only when none fits.
- Apply a Feature for a reusable behavior with promises worth proving on each object that applies it; the design vocabulary (`sets`, `delegates`, `locks`… for operations; `unique`, `index`, `check`, `label` for entities) for how an operation is composed. Never invent a Feature to hold one operation's own design.
- An operation's own design (its inputs and outputs, what it records, the operations it calls, its transaction and failure behavior) is a short entry in its entity's [Entity Design](../../metamodel/design/entity-design.md). A choice that needs a reason gets one line there; a choice across the application is an architecture decision.
- What every operation does the same way (one transaction, inputs checked against the model, the standard errors) is the architecture's, stated once: neither a Feature applied to each operation nor a default.
- Write nothing that is absent: no Feature means the default, or none. A default (for the application or every entity) is in the catalog's `defaults`, never repeated in a design.
- State a fact once, at its source: a cascade in the entity's Relationships, a business rule in the requirements, who may do what in the [Authorization](../../metamodel/design/authorization.md). The design only realizes them.
- One Feature per meaning: two ids for one meaning, or one id for two, is a defect.
- Realize every optional Feature the requirements apply to an entity, by the capability design or a default; never apply one whose `appliedIn` is `[requirements]` that the requirements did not ask for.

## Impact on persistence-design

- An entity's storage follows from the catalog: its naming convention (`storage-naming`: a column per attribute, and a `<referenced entity>_id` per to-one relationship), the columns its applied Features add, and the capability design's `storage` only where a name differs.

## Verify

- `designs-use-catalog` Does every capability design apply only known Features and design vocabulary, each to what it applies to, with only its options, and only where its `appliedIn` allows, on entities and operations the requirements declare, delegating only to real operations (`mde verify`, Design row)?

## Audit

- Is every Feature a reusable behavior (none invented to hold one operation's design, none applied to every operation for what the architecture already says), is each operation's own design a short entry in its Entity Design, and is no Feature defined twice under two ids?
