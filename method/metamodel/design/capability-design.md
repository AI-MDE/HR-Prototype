---
type: concept-type
title: Capability Design
description: How one capability's entities and operations are realized, stated as the Features they apply and the design vocabulary.
icon: 🛠️
---

# Capability Design

A Capability Design states how a [Capability](../requirements/capability.md)'s entities and their operations are realized, as the [Features](../feature.md) they apply (recorded in the application's [Design Catalog](design-catalog.md)) and the Method's design vocabulary: which Features and words each entity and each operation applies, with their options, and the entity's storage names where they differ from the convention. It holds no prose. Its rules and checks are in the [application-design](../../targets/design/application-design.md) and [persistence-design](../../targets/design/persistence-design.md) Targets.

## Location

One file per capability: `specs/design/capabilities/<capability>/design.json`, beside the capability's design overview. An entity's design is in the design of the capability its ABE belongs to.

## Structure

```json
{
  "type": "capability-design",
  "capability": "service-request-management",
  "entities": {
    "ServiceRequest": {
      "features": { "optimistic-concurrency": {}, "status-history": {}, "index": { "columns": [["status", "scheduled_date", "id"]] } },
      "operations": {
        "assign": { "delegates": { "to": "ServiceRequestAssignment.create" } }
      }
    },
    "StatusHistory": { "features": { "immutable-record": {} }, "storage": { "table": "status_history" } },
    "ServiceType": { "features": { "unique": { "columns": [["name"]] } } }
  }
}
```

- **features**: what the entity applies beyond the catalog's defaults, each with its options (`{}` for none): optional Features whose scope includes `entity` (the Features its requirements apply, realized here, and the ones the design chooses itself), and the model properties `unique`, `index`, `check`, `label`. An older design's `terms` is read the same way, its ids resolved through the aliases.
- **operations**: for each operation, by the name the entity declares (`assign`, `assignSkill`), what it applies beyond the defaults: optional Features whose scope includes `operation`, and the verbs of the design vocabulary (`sets`, `records`, `delegates`, `locks`, `decision`, `default`, `internal`). The business rules an operation must respect are the requirements', with its entity; who may run it is the Authorization; neither is restated here. How the operation is carried out (its inputs, outputs, transaction, failure) is prose, in its entity's [Entity Design](entity-design.md); a Feature is applied to an operation only for a reusable behavior beyond what every operation does.
- **storage**: only what differs from the catalog's naming convention: `table`, `columns` (attribute → column), and `extra` (column → Feature) for a column no attribute or Feature gives.

A Feature the requirements apply to an entity must be realized here or by a default; one whose `appliedIn` is `[requirements]` cannot be applied here unless the requirements apply it.

An entity that only takes the defaults is `{}`, or left out. Who may run an operation is not here: it is the [Authorization](authorization.md), derived from the use cases. The reason for a choice that needs one is a line in the entity's [Entity Design](entity-design.md), or, for a choice across the application, an architecture decision.

## Relationships

- It realizes the [Entities](../requirements/entity.md) of one [Capability](../requirements/capability.md).
- It applies Features and the design vocabulary; `mde verify` checks that each is known, applies to what it is applied to, takes only its options, and is allowed where it is applied, and that every entity, operation, and delegation is real.
- With the catalog's naming convention, it gives each entity's storage: the [Data Model](data-model.md).
