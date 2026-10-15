---
type: feature
kind: build
id: api-design-rules
title: api-design rules
origin: mde
impacts:
  - api-design
---

# api-design rules

## Purpose

The general rules of the api-design Target that no other Feature supplies.

## Impact on api-design

- There is no design-time endpoint table. Operations are declared on the entity, access on each operation (roles and scope), and each operation is invoked by a use-case step (the `target` of its operation). The HTTP contract (endpoints, request and response shapes, status codes) is generated last, from the real routes, by the API Target.
- For each operation, design the exposed semantic operation, its inputs and outputs, validation, error mapping, and how its authorization is enforced, as the design catalog's terms on the operation, in its capability's design.
- An API Contract is written only when an outside consumer depends on an operation's interaction contract (an integration partner, a public API); it then states consumers, request, response, validation, errors, and authorization, and traces to the entity operations and use cases behind it.

## Audit

- Does every operation a use case invokes exist on its entity, with its access declared?
- Are inputs, outputs, validation, error mapping, and authorization enforcement designed for each operation in scope?
- Does each API Contract trace to the entity operations and use cases behind it, and agree with them?
