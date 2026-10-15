---
type: concept-type
title: Conceptual Data Model Diagram
description: The application's ABEs, grouped by capability, and how they relate.
icon: 🧭
extends: diagram
---

# Conceptual Data Model Diagram

The Conceptual Data Model (CDM) shows the whole application at the level of its [ABEs](abe.md): which ABEs there are, which capability each belongs to, and which relate. It depicts the ABE and Entity concepts; it does not define them. What is inside each ABE is its own [Logical Data Model Diagram](logical-data-model-diagram.md).

## Owner and location

Requirements owns it, in `specs/requirements/diagrams/erd.md`: the diagram, then a `## Reading` section that states each link between ABEs in plain English. Create it with the first ABEs; update it whenever an ABE is added, renamed, or removed, or an entity relationship comes to cross between two ABEs or stops crossing.

## Content

- Each ABE, named as its Primary Entity, inside its home capability. No entities and no attributes.
- A line between two ABEs where an entity of one has a relationship to an entity of the other, labeled with that relationship's Role. Several relationships between the same two ABEs are one line, with their roles. No cardinality: a link between ABEs summarizes entity relationships, and a count between whole ABEs would mislead.
- An ABE used by a capability other than its home is shown once, in its home.

## Representation

A Mermaid `flowchart` in a Markdown fence: one `subgraph` per capability, each ABE a node inside its capability, each link an edge labeled with its roles (`Resource -->|assigned to| Assignment`).

When to create and update it, and its checks, are in the [business-requirements](../../targets/requirements/business-requirements.md) Target.
