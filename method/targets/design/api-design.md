---
type: target
id: api-design
title: API design
applies_when:
  - the work designs a capability's operations or the access that governs them
  - the work exposes an operation to an outside consumer
stage: design
needs:
  - backend
---

# API design

<!-- COMPILED by compile-targets.mjs from features. Skeleton (Purpose +
     applies_when) is authored; the sections below are composed from the
     contributing features, each tagged [feature: <id>]. Do not hand-edit
     the composed sections — edit the feature and recompile. -->

## Purpose

What a good API design looks like, and how to check it: a capability's operations, the access that governs them, and the standard root operations, as the design the real API is built from. Its shape is defined by the [Entity](../../metamodel/requirements/entity.md) operations and, for operations exposed to outside consumers, the [API Contract](../../metamodel/design/api-contract.md); the built API is checked by the [API](../app/api.md) Target.

It governs: Entity operations and their access, as designed; [API Contract](../../metamodel/design/api-contract.md).

## Outputs

| Output | Where | When |
|---|---|---|
| Operations and access | on each entity (`## Operations`, access per operation) | per entity |
| API Contract | `specs/design/api/<contract>.md` | for an operation exposed to an outside consumer |

## Composed behavior

### api-design rules  `[feature: api-design-rules]`

- There is no design-time endpoint table. Operations are declared on the entity, access on each operation (roles and scope), and each operation is invoked by a use-case step (the `target` of its operation). The HTTP contract (endpoints, request and response shapes, status codes) is generated last, from the real routes, by the API Target.
- For each operation, design the exposed semantic operation, its inputs and outputs, validation, error mapping, and how its authorization is enforced, as the design catalog's terms on the operation, in its capability's design.
- An API Contract is written only when an outside consumer depends on an operation's interaction contract (an integration partner, a public API); it then states consumers, request, response, validation, errors, and authorization, and traces to the entity operations and use cases behind it.

## Verify and Audit

No Feature gives this target a Check `mde verify` proves; what a second agent judges compiles to `targets/audit/`, under each Feature's first Target.
