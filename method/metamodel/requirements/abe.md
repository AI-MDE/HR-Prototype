---
type: concept-type
title: ABE
description: An Aggregate Business Entity, a cohesive set of entities around one primary business concept, under its capability.
icon: 🧱
---

# ABE (Aggregate Business Entity)

An ABE groups a cohesive set of related [Entities](entity.md) around one primary business concept, and is the unit between a [Capability](capability.md) and its entities: a capability uses ABEs, an ABE holds entities. Its rules and checks are in the [business-requirements](../../targets/requirements/business-requirements.md) Target.

## Location

An ABE is a folder under its capability, named after its Primary Entity, holding that entity's spec and its supporting entities' specs:

```text
specs/requirements/capabilities/<capability>/<abe>/
  <abe>.md              the Primary Entity, which is also the ABE's spec
  <entity>.md           supporting entities
  events/<event>.md     business events about its entities, when it has any
```

It has no file of its own: the folder and its Primary Entity's spec are the ABE. Each ABE has one home capability; another capability that uses it links to its entities there.

## Structure

- **Primary Entity**: exactly one, the entity whose spec is named after the folder (`resource/resource.md`). It is an ordinary [Entity](entity.md) (`type: entity`), and the natural entry point to the ABE.
- **Supporting entities**: the other entity specs in the folder.
- **The ABE as a whole**, written in the Primary Entity's spec: its Purpose (which describes the ABE as well as the entity), the Rules that span its entities, and its `## Levels`.
- **Levels**: which supporting entities belong to each level of detail, using the [industry pattern](../../features/business-requirements/industry-patterns.md) variants: `Simple`, `Standard`, `Enterprise`. An entity not listed is part of every level. The application uses the level its Goal needs, and only the entities at that level are specified and built.

```markdown
## Levels
- Standard: Qualification
- Enterprise: Resource Type, Resource Status
```

## Relationships

- Belongs to one home [Capability](capability.md); others may use it.
- Its entities relate to entities in other ABEs through their Relationships; the [Conceptual Data Model Diagram](conceptual-data-model-diagram.md) shows those links between ABEs, and its own [Logical Data Model Diagram](logical-data-model-diagram.md) shows its inside.
