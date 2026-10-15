---
type: concept-type
title: Data Model
description: The physical realization of business entities and relationships in the selected persistence technology.
icon: 🗄️
---

# Data Model

A Data Model is the physical or relational realization of business Entities and Relationships within the selected persistence technology. Its rules and checks are in the [persistence-design](../../targets/design/persistence-design.md) Target.

## Location

Each persisted [Entity](../requirements/entity.md)'s storage, its **Storage View** (its table and its columns), follows from the design: the [Design Catalog](design-catalog.md)'s naming convention (a table per entity, a column per attribute, named by a rule such as snake case), the columns its applied Features add (a Feature's `adds` in the catalog: `version`, `deactivated_at`), and the overrides its [Capability Design](capability-design.md) gives where a name differs. Nothing that follows from the convention is written. Applications from before the design catalog state it as a `## Storage View`, in the entity's design file (the same path under `specs/design/` as the entity's spec under `specs/requirements/`). One Storage View per entity, beside the entity's other design and never in the requirements, so reading the business model does not load table and column names. There is no other list of tables and columns: a second one drifts from the entities it describes. Conventions that span entities (column naming, shared types, migration rules) belong in the architecture's persistence topic.

Applications from before keep the Storage View in the entity's own file; `mde verify` reads the capability design first, then a design file, then the entity's own file.

## Structure

A `## Storage View`, in applications from before the design catalog:

- Its first line names the table (or collection): ``Table: `employees` ``.
- A column table, `Column | Attribute | Type | Constraints`: one row per column, naming the attribute it stores. Every attribute in the entity's Attributes table has exactly one column; a column that stores no attribute says what it is instead (`key`, `foreign key: <relationship>`, `audit`, `version`, or `feature: <id>` for a column an optional Feature needs, such as `feature: ordering` for a position or `feature: soft-delete` for a deletion marker).
- Keys, foreign keys, indexes, and uniqueness that the column rows do not show.
- Notes, for storage choices worth recording.

For example:

Table: `employees`

| Column | Attribute | Type | Constraints |
|---|---|---|---|
| id | key | UUID | PK |
| hire_date | hireDate | DATE | NOT NULL |
| created_at | audit | TIMESTAMPTZ | NOT NULL DEFAULT now() |

The schema realizes the Storage Views; a rename is one edit, of the attribute and its row together.

## Relationships

- It realizes the [Entities](../requirements/entity.md) and their relationships, as the [Logical Data Model Diagram](../requirements/logical-data-model-diagram.md) shows them.
- The [Physical Data Model Diagram](physical-data-model-diagram.md) depicts it.
