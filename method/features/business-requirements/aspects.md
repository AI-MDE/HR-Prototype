---
type: feature
kind: build
id: business-requirements-aspects
title: Optional Features in the requirements
origin: mde
impacts:
  - business-requirements
---

# Optional Features in the requirements

## Purpose

The rules of the business-requirements Target for applying [optional Features](../../metamodel/feature.md): choosing, from the business need, which ones each concept needs.

## Impact on business-requirements

Explore the [optional Feature catalog](../../optional-features/index.md) (its index, `optional-features/catalog.json`) for every concept in scope; never wait to be asked. For the application, each entity, its attributes and relationships, its operations, and each use case, go through the Features whose `scope` includes that kind of object and whose `appliedIn` includes `requirements`, and decide, from the business need:

- **Apply it** when the business needs it, with the options chosen, in the concept's `## Features` section (or the attribute table's `Features` column), by its id:
  - an entity edited concurrently needs `optimistic-concurrency`;
  - one whose changes need accountability needs `audit-trail` (with `createdBy`, `updatedBy`, `history` as required);
  - one that must not be physically deleted needs `soft-delete`;
  - a lifecycle needs `state-machine`;
  - a large collection needs `pagination` and `search`;
  - children kept in an order the user sets (an order's line items) need `ordering`;
  - an entity whose instances form a tree through a parent of the same kind needs `hierarchy`;
  - instances users label freely to find them again need `tags`.
  
  An attribute that identifies a record to people, or a business key, is a property of the model (its label, a unique key), not a Feature.
- **Leave it out** when the business does not need it. Never apply a Feature to fill a checklist, or because the catalog has it.
- **Ask** when the need is genuinely unclear (should approvals notify the requester; may employees be deleted, or only deactivated): add a question with the default assumed meanwhile ([Questions](../../metamodel/work/questions.md)).

Read a Feature's file once you apply it: its meaning, parameters and promises are what the requirement now asks for. Applying a Feature states a requirement; its realization is designed and checked separately ([realization](../application-design/aspect-realization.md)). The retired `## Aspects` section is not read; `mde migrate-features` converts an application that still uses it.

## Audit

- **Optional Features:** Was every in-scope concept considered against the Features that apply to it? Does each applied Feature name a catalog id (never a former name) valid for that kind of object and for the requirements, with its options chosen? Is each grounded in a business need, and is each unclear need an open question with a default?
