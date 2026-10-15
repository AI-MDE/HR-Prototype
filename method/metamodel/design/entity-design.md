---
type: concept-type
title: Entity Design
description: How one entity's operations are realized, in short prose: what each takes and gives, what it records, what it calls, and how it fails.
icon: 🛠️
---

# Entity Design

An Entity Design records how one [Entity](../requirements/entity.md)'s operations are realized in the built application. It is design, so it lives apart from the entity's business meaning; an agent working on the requirements does not read it, and one building the entity reads it beside the entity. Its rules and checks are in the [application-design](../../targets/design/application-design.md) Target.

## Location

One file per entity, at the entity's own path under `specs/design/` instead of `specs/requirements/`:

```text
specs/requirements/capabilities/service-request-management/service-request/service-request.md   the entity
specs/design/capabilities/service-request-management/service-request/service-request.md         its design
```

The path is the link: tools find an entity's design without an index, and a moved entity moves its design with it. Its frontmatter is `type: entity-design`, and its first line links the entity it realizes. An entity whose operations need nothing decided has no Entity Design.

## Structure

- **Operations**: one short entry per operation whose realization needs deciding, `- **Assign** — …`: its inputs and outputs, what it records, the operations it calls, and its transaction and failure behavior. A few sentences at most, with a line on why where a choice needs one.

What is said elsewhere is not repeated here:

- what every operation does the same way (one transaction, inputs checked against the model, the standard errors): the [Architecture](../architecture/README.md), stated once;
- the business meaning, states, transitions, and [Business Rules](../requirements/business-rule.md): the entity, in the requirements;
- who may run an operation: the [Authorization](authorization.md), derived from the use cases;
- the [optional Features](../feature.md) the entity and its operations apply, and storage names where they differ from the convention: its [Capability Design](capability-design.md);
- a choice across the application (how every transaction, error, or session works): an architecture decision, in `specs/architecture/`.

## Relationships

- It realizes one [Entity](../requirements/entity.md), beside its capability's [Capability Design](capability-design.md).
- Its entity's storage is the [Data Model](data-model.md), derived from the catalog's naming convention and the Features applied.
