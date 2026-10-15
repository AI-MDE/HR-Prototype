---
type: concept-type
title: Logical Data Model Diagram
description: The entities of one ABE, their business attributes, and their relationships, independent of storage technology.
icon: 🔗
extends: diagram
---

# Logical Data Model Diagram

The Logical Data Model (LDM) shows the inside of one [ABE](abe.md): its [Entities](entity.md), their business attributes, and their relationships, independent of any storage technology. It depicts the Entity concepts; it does not define them. How the ABEs relate to each other is the [Conceptual Data Model Diagram](conceptual-data-model-diagram.md).

## Owner and location

Requirements owns it: one per ABE, `specs/requirements/diagrams/erd-<abe>.md`, named after the ABE's folder: the diagram, then a `## Reading` section that states each relationship in plain English. Create it with the ABE; update it whenever one of the ABE's entities, attributes, or relationships changes, or the level of detail the application uses changes. Keep the physical realization separate: see [Physical Data Model Diagram](../design/physical-data-model-diagram.md).

An application created before ABEs, with its entities in `specs/requirements/entities/`, keeps one logical data model of the whole application in `erd.md`, split by capability (`erd-<capability>.md`) when one diagram would show more than about a dozen entities.

## Content

- The ABE's entities at the level of detail the application uses, named exactly as their Entity concepts. Its Primary Entity is marked as such.
- Each entity's business attributes, with a logical type (`string`, `number`, `date`, `boolean`, `enum`, `money`, …), the identifier first. The attributes are those of the Entity concept; no foreign keys, join tables, audit columns, or storage types, which belong to the physical model.
- Each relationship from the entities' Relationships tables, with its cardinality and its Role read from the first entity to the second (`Resource ||--o{ Availability : "has availability"`).
- An entity of another ABE that an entity here relates to, as a box with no attributes, labeled with its ABE, so the ABE's boundary shows.

## Representation

A Mermaid `erDiagram` in a Markdown fence: crow's-foot cardinality on each line, each entity of the ABE with its attribute block (`type name`), `PK` after the identifier. A composition is a solid line (`--`, identifying); a reference or association is a dashed line (`..`, non-identifying). Name entities as their concepts (`ServiceRequest`), the same way throughout the application.

When to create and update it, and its checks, are in the [business-requirements](../../targets/requirements/business-requirements.md) Target.
