---
type: concept-type
title: Design
description: Application-specific realization choices within business requirements and architecture.
icon: ✏️
---

# Design Specification Concepts

Design records application-specific realization choices made within the business requirements and the architecture: how the requirements are realized, not what they mean. Its rules and checks are in the [application-design](../../targets/design/application-design.md) Target and, for its facets, the [UI design](../../targets/design/ui-design.md), [API design](../../targets/design/api-design.md), and [persistence design](../../targets/design/persistence-design.md) Targets.

## Where design knowledge lives

Design is stated briefly, each fact once. The [Design Catalog](design-catalog.md) holds the reusable Features the application uses, with the realization chosen; each [Capability Design](capability-design.md) applies them to its entities and operations; each [Entity Design](entity-design.md) says, in short prose, how the entity's operations are carried out. What every operation does the same way is the architecture's, stated once. A choice that needs explaining is recorded, with its reason, where it applies: a choice across the application is an architecture decision (`specs/architecture/`); one about an entity or operation, a line in its [Entity Design](entity-design.md); a choice of Feature or realization, the catalog itself; one for a single page, its line in the page set. There is no separate decisions log. Concepts with independent identity have their own pages. Cross-cutting engineering constraints belong in [Architecture](../architecture/README.md).

| Concern | Design decisions | Owning specification |
| --- | --- | --- |
| Entity operations | Inputs, outputs, what they record, collaborating operations, transaction and failure behavior | [Entity Design](entity-design.md), in short prose; the Features they apply, in the [Capability Design](capability-design.md) |
| Authorization | Which roles may run each operation, derived from the use cases' actors and invoked operations | [Authorization](authorization.md) (generated) |
| Business rules | Algorithm, evaluation context, enforcement points, technical errors, transaction boundaries, and concurrency handling | Not restated in the design: the [Business Rule](../requirements/business-rule.md) is the requirements', with its entity, and how it is enforced is the implementation's; cross-cutting constraints in Architecture |
| Optional Features | Realization of the optional Features the requirements apply, and the ones the design chooses itself: configuration, affected operations, and integration with the selected runtime or stack | The [Design Catalog](design-catalog.md)'s `features` (realization and implementing component), applied in each [Capability Design](capability-design.md); shared mechanisms in Architecture |
| Persistence | Entity and relationship mapping, keys, storage constraints, migrations, and realization of the deletion and retention policies | [Data Model](data-model.md): the catalog's naming convention and terms, and each [Capability Design](capability-design.md)'s overrides |
| API contracts | Exposed semantic operations, request and response shapes, validation, error mapping, and authorization enforcement | [API Contract](api-contract.md) |
| Interaction | Pages, navigation, labels and references, forms, actions, and their states | Not designed page by page: the pages are generated from the requirements by the application's UI conventions (its architecture, after the Method's [UI architecture](../../architecture/ui.md)), and the generated pages are the design. A choice for one page that the conventions do not make is noted on its line in the page set, with its reason. |
| Integrations | Contracts, mapping, triggers, retries, idempotency, failure handling, and security | [Integration](integration.md) |
| Decisions | Each choice that needs explaining, with its reason | Where it applies: the architecture (`specs/architecture/`) for a choice across the application; the [Entity Design](entity-design.md) for an entity or operation; the [Design Catalog](design-catalog.md) for a Feature's realization; the page set for one page. No separate log |
| Sample data | Representative fictional records, connected relationships, scenario coverage, and repeatable loading | `app/data/seed.json`, keyed by entity name, which the runtime and the Workbench's live data read; scenario descriptions in the owning design |

## Capability design index

When the application is organized by capability, `specs/design/capabilities/<capability>/overview.md` records the capability's primary entity, its module boundary (what it owns and what it consumes from other capabilities), and references to its entities, use cases, and pages.

## Design concepts

- [API Contract](api-contract.md)
- [Integration](integration.md)
- [Design Catalog](design-catalog.md)
- [Capability Design](capability-design.md)
- [Entity Design](entity-design.md)
- [Authorization](authorization.md)
- [Data Model](data-model.md)
- Diagrams: [Physical Data Model](physical-data-model-diagram.md), [Navigation](navigation-diagram.md)
- The page set, `specs/design/page-set.md`: the pages the [UI conventions](../../architecture/ui.md#ui-conventions-the-pages-are-generated-not-designed) give, as agreed with the user, one line each (its purpose, its main entity or use case, the roles that use it, and its links). It is what the pages built are measured against, and what the navigation diagram draws.
