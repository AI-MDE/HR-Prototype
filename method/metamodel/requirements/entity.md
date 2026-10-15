---
type: concept-type
title: Entity
description: A durable business concept with identity, information, behavior, relationships, or lifecycle.
icon: 📦
---

# Entity

An Entity is a durable business concept with identity, information, behavior, relationships, or lifecycle relevant to the application. Its rules and checks are in the [business-requirements](../../targets/requirements/business-requirements.md) Target.

## Location

One file per entity, in the MDE Markdown DSL, in its [ABE](abe.md)'s folder under the ABE's capability: `specs/requirements/capabilities/<capability>/<abe>/<entity>.md`. The entity whose file is named after the folder is the ABE's **Primary Entity**; its spec also carries what belongs to the ABE as a whole (its Rules across entities and its `## Levels`).

Applications created before ABEs keep their entities in `specs/requirements/entities/<entity>.md`; the runtime reads both. Entity names are unique across the application, wherever the file sits.

## Structure

- Purpose
- Attributes, and the Display label
- Relationships
- Operations
- States
- Transitions
- Rules
- Features
- Notes

An entity spec holds the business meaning only. How the entity is realized is design, in its capability's [Capability Design](../design/capability-design.md), in the [Design Catalog](../design/design-catalog.md)'s terms; who may run its operations is the [Authorization](../design/authorization.md) the use cases derive. Neither is repeated here, so reading the requirements does not load them.

Attributes use `Attribute | Type | Required | Description`, optionally followed by Features (the optional Features applied to that attribute, such as `attachments`).

**Display label.** Every entity says how people recognize one of its records, in lists, lookups, and wherever a related record is shown: a line under the Attributes table, `**Display label:** fullName`, naming the attribute, or several in order when the label is made of them (`**Display label:** firstName lastName`), optionally followed by a note after a dash. It is the record's business-facing identity, how people know it, not what the database keys on: never the technical id, and a code or number only when people really know the record by it (an order number quoted on the phone). An entity everyone knows by a name says so (`**Display label:** name`).

**Features** lists the [optional Features](../feature.md) the business needs on this entity, by id, with the options chosen: `- optimistic-concurrency`, `- audit-trail: createdBy, updatedBy`. Each is a business need the design must realize; one the business does not need is left out. The retired `## Aspects` section is not read; `mde migrate-features` converts an application that still uses it. Operations list the applicable Create, Read, Update, and Delete and the domain operations (such as Submit or Approve).

The MDE runtime runs an entity from this spec as written (so a prototype, and the Workbench's live data, need no other definition of it), once sample data exists for it: a spec alone has no records to show. It reads:

- **Display label**: the attributes it names label each record, in lists and in the records that refer to it; without one, the runtime guesses (an attribute called `name` or `title`, else first and last name, else the first required text).
- **Attributes**: a Type of `uuid`, `string`, `text`, `number`, `integer`, `decimal`, `boolean`, `date`, or `datetime`; `enum`, with its values listed in the Description (`Full-time, Part-time, Contractor`) or as `enum(A, B)`; or another entity's name, for a reference (also written `Client ref`). `id` (or the first `uuid` attribute) is the key.
- **Relationships**: a table, one row per related entity:

  ```markdown
  | Related | Role | Cardinality | Kind | Cascade | Description |
  |---|---|---|---|---|---|
  | [Customer](../customer/customer.md) | belongs to | 1 | reference | delete: restrict | The customer who owns the equipment. |
  | [Availability](availability.md) | has availability | 0..* | composition | delete: cascade | When the resource can be booked. |
  ```

  - **Related** links the related entity's spec.
  - **Role** is the business meaning, read from this entity to the related one ("belongs to", "assigned to"); diagrams label the line with it.
  - **Cardinality** is how many related records one of these has: `1`, `0..1`, `0..*`, or `1..*`. A `1` or `0..1` becomes a reference on this entity (required for `1`); a `0..*` or `1..*` needs nothing here, since the related entity's reference implies it.
  - **Kind** is `association`, `composition`, or `reference`. A composition's related records belong to this one and have no life of their own; a reference or association's have their own lifecycle.
  - **Cascade** is what an `update` or `delete` of this record does to the related records: `cascade`, `restrict`, `detach`, or `none` (`delete: cascade; update: none`). It is business behavior the built application implements; the runtime does not apply it.

  Older specs list relationships as bullets (a link, then "the one …" or "zero or more …"); the runtime still reads them, guessing the cardinality from the words.
- **Operations**: `- **Create** — …`, one line each, saying what it requires (the state or condition) and what it does. Read gives listing and viewing; an operation described as not permitted is left out. Its inputs and how it is carried out are design, in the entity's [Entity Design](../design/entity-design.md).
- **States**: `- **Active** — …`, the first being the initial state, held by the `enum` attribute whose values are the states.
- **Transitions**: `- Active → Inactive: Deactivate`, from one or several states (`Draft, Submitted → Cancelled: Cancel`); the named operation performs it.

**Rules** holds the [Business Rules](business-rule.md) about this entity (and, in a Primary Entity, those across its ABE), one entry each: `- **Team membership** — …`, its name in bold (which gives its id), then when it applies and what happens when it does not hold. A rule that spans ABEs has its own file, linked here. Who may run an operation (the Authorization) and what an input must be (the attributes) are not rules. Rules stay prose; the runtime does not execute them.

## Relationships

- Use cases invoke its operations.
- Business rules govern its operations, states, and transitions.
- Roles may run its operations as the [Authorization](../design/authorization.md) says, derived from the use cases that invoke them.
- Its realization is in its capability's [Capability Design](../design/capability-design.md): the catalog terms it and its operations apply, and its storage names where they differ from the convention (the [Data Model](../design/data-model.md)).

Applications from before keep an `## Authorization` table, `## Design Semantics`, and `## Storage View` in the entity's own file; the runtime and `mde verify` still read them there until they move.
