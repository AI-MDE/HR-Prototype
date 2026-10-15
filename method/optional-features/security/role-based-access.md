---
type: feature
kind: optional
id: role-based-access
name: Role-based Access
description: "What someone may do follows from their role, as the use cases give it; every operation checks it."
scope: [entity, operation, use-case]
appliedIn: [requirements, design]
aliases: [authorization, access.principal]
---

# Role-based Access

What someone may do follows from their role, as the use cases give it; every operation checks it.

## Meaning

Authority comes from the signed-in principal's roles, checked for every operation against the Authorization derived from the use cases; anything the browser sends about roles is never trusted.

## Realizations

- **authorization-json**: Roles checked per operation against `specs/design/authorization.json`.

An application chooses one, or its own, and records it in its catalog (`specs/design/catalog.json`).

## Constraints

- Before: authorization is established before any protected change.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:role-based-access/<promise>`.

- `permitted-allowed` A role the use cases permit can perform the operation.
- `forbidden-refused` A role they do not permit is refused, and nothing changes.
- `client-roles-ignored` A role claimed by the client is never trusted.
