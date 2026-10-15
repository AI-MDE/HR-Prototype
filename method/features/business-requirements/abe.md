---
type: feature
kind: build
id: business-requirements-abe
title: ABEs
origin: mde
impacts:
  - business-requirements
  - prototype
---

# ABEs

## Purpose

Model the entities in [ABEs](../../metamodel/requirements/abe.md): cohesive groups around one primary business concept, each under the capability that is its home. An ABE is the unit people and the AI reason about first (what are the big things, and how do they connect?) before going inside one; it keeps each diagram small, and lets an application take an ABE at the level of detail it needs.

## Impact on business-requirements

- **Find the ABEs first.** For each capability, name its primary business concepts: the things the business is about and a user starts from (a Service Request, a Customer, a Resource). Each is an ABE, named after its Primary Entity, in a folder of that name under the capability that is its home (`capabilities/<capability>/<abe>/`). Then give each ABE its supporting entities: those that exist to describe or serve the primary one (a Resource's Availability and Qualification), and that would not be looked for on their own.
- **One home.** An ABE lives under one capability, the one whose work it mostly serves. Another capability that uses it lists it in its overview's `## ABEs` and links to its entities where they are; it never gets a copy.
- **The Primary Entity carries the ABE.** Its spec (named after the folder) states the ABE's Purpose, the Rules that span the ABE's entities, and its `## Levels`. Entity names are unique across the application.
- **Levels of detail.** When an ABE has more detail than every application needs, list in `## Levels` which supporting entities belong to `Standard` and to `Enterprise`; the rest is `Simple`. Specify and build only the entities at the level the Goal needs (Simple for a prototype), and list the others there for later.
- **Relationships as a table.** Every relationship is a row of the entity's Relationships table, with its Role, Cardinality, Kind, and Cascade ([Entity](../../metamodel/requirements/entity.md)). A supporting entity is normally a `composition` of its Primary Entity, and a link to another ABE a `reference` or `association`. A relationship that crosses into another ABE is what links two ABEs in the [Conceptual Data Model Diagram](../../metamodel/requirements/conceptual-data-model-diagram.md).

## Impact on prototype

- Step 1 proposes the ABEs before their entities: the Conceptual Data Model first (the ABEs by capability and how they relate), then each ABE's Logical Data Model. Step 2's primary entities are the ABEs' Primary Entities.

## Verify

- `entity-placement` Is every entity in an ABE folder under its home capability, with one Primary Entity per ABE (named after its folder), and is every entity name unique (`mde verify`, Entity placement row)?

## Audit

- Is every entity in an ABE folder under its home capability, with exactly one Primary Entity per ABE (the spec named after the folder), and entity names unique across the application?
- Does each Primary Entity's spec state the ABE's purpose, its cross-entity rules, and (when it has more detail than one level) its `## Levels`, and are only the entities at the application's level specified?
- Does every entity list its relationships as the table, each row with Role, Cardinality, Kind, and Cascade?
- Does each capability's overview list the ABEs it uses, its own first?
