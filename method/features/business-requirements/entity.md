---
type: feature
kind: build
id: business-requirements-entity
title: Entity
origin: mde
impacts:
  - business-requirements
---

# Entity

## Purpose

The "Entity" rules of the business-requirements Target that no other Feature supplies.

## Impact on business-requirements

- Preserve meaningful relationship labels, roles, cardinalities, temporal meaning, and ownership: each relationship is a row of the Relationships table with its Role, Cardinality, Kind, and Cascade ([Entity](../../metamodel/requirements/entity.md)), never a bare link. Use business identifiers when the business uses them; do not fabricate identifiers to suit a database design.
- Every entity has a **Display label** ([Entity](../../metamodel/requirements/entity.md)): the attribute or attributes people recognize a record by, in lists, lookups, and related records. It is the business-facing identity, never the technical id; a code or number only when people really know the record by it. When an entity has no attribute people would recognize it by, the model is missing one (a name, a title); add it rather than label the record by its id.
- Review durable objects that are referenced repeatedly for entities that are missing.
- Operations are explicit: the applicable Create, Read, Update, and Delete, stating when one is prohibited, then domain operations such as Submit or Approve, each saying what it requires and its lifecycle effect. Its inputs and realization are design, in its capability's [Capability Design](../../metamodel/design/capability-design.md); who may run it is derived from the use cases that invoke it ([Authorization](../../metamodel/design/authorization.md)). The entity spec holds neither, so the requirements stay the business meaning only. Operations remain subject to rules, authorization, and lifecycle constraints. An internal or system operation needs no user-facing use case, but its trigger and verification must still be explicit.
- Use cases invoke entity operations; they do not duplicate entity rules. Storage mapping belongs in Design (the design catalog's naming convention and the capability design's overrides); declaring an entity does not implement it.

## Verify

- `entity-model` Does every entity have an attributes table with types of the Method and a key, a Display label naming its attributes (not the bare id), its relationships as the table (Related, Role, Cardinality, Kind, Cascade) with valid values linking real entities, transitions only between its declared states, and an enum attribute holding those states (`mde verify`, Entity model row)?
- `operations-used` Is every operation that changes something invoked by some use case (`mde verify`, Operations used row)?

## Audit

- **Entity:** Are required entities and relationships present and semantically complete? Does every entity declare a Display label naming the attributes people recognize a record by, never the technical id, and a code only when people really know the record by it? Are scoped operations explicit, including prohibited behavior and domain operations? Does every operation a role needs have a use case that invokes it with that role as actor, without invented roles? Is the spec free of design (no Authorization table, Design Semantics, or Storage View)? Do operations, rules, and access refer to concepts that are actually declared?
