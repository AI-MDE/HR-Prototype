---
type: concept-type
title: Physical Data Model Diagram
description: The persisted representation of the business entities in the selected persistence technology.
icon: 🗄️
extends: diagram
---

# Physical Data Model Diagram

The Physical Data Model (PDM) shows how the business entities are persisted in the selected technology. It depicts the [Data Model](data-model.md) concept; it does not define it. Maintain it only when persistent structured data exists.

## Owner and location

Design owns it, in `specs/design/diagrams/pdm.md`. When one diagram would be unreadable, split it one page per capability (`pdm-<capability>.md`); tables realize entities across ABEs, so the physical model is not split by ABE as the [logical data models](../requirements/logical-data-model-diagram.md) are.

## Content

- Tables or collections, with keys and foreign keys.
- Columns and types where they matter to the design; avoid duplicating the Data Model text.
- Realization of each business relationship, including join structures.

## Representation

A Mermaid `erDiagram` in a Markdown fence: each table with its columns (`type name`), marked `PK`, `FK`, or `UK`, and a line for each foreign key with its cardinality.

When to create and update it, and its checks, are in the [persistence-design](../../targets/design/persistence-design.md) Target.
