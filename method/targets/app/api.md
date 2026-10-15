---
type: target
id: api
title: API
applies_when:
  - the work creates or changes endpoints or route handlers
  - a capability declares or changes its API boundary
stage: backend
needs:
  - backend
---

# API

<!-- COMPILED by compile-targets.mjs from features. Skeleton (Purpose +
     applies_when) is authored; the sections below are composed from the
     contributing features, each tagged [feature: <id>]. Do not hand-edit
     the composed sections — edit the feature and recompile. -->

## Purpose

What a good API looks like, and how to check it. The API is the integration boundary of each capability; it is built from the [API design](../design/api-design.md) (operations and access on entities) and the chosen [architecture](../../architecture/api.md).

It governs: The application's endpoints, their request and response contracts, and the generated `openapi.yaml`.

## Outputs

| Output | Where | When |
|---|---|---|
| Routes, services, types per capability | the capability's slice, as the stack lays it out | per implemented capability |
| Rule enforcement | the service of the operation the rule governs | per business rule |
| Authentication endpoints | the shared auth module | when authentication is in scope |
| `openapi.yaml` | generated from the routes | always |

## Evidence

The rows of the Evidence Package this Target owns: what `mde verify` measures and reports for it, each by its id. Tools take a row's title and what it proves from here.

| Row | Title | Proves | Needs |
|---|---|---|---|
| api-built | API built | Everything the server realizes (operations, use cases, rules, Features) has its code. | — |

## Composed behavior

### Business-rule responses  `[feature: business-rule-responses]`

- **A business-rule rejection identifies the rule it violated** in a structured field (for example `error.rule`): the rule's id ([Business Rule](../../metamodel/requirements/business-rule.md#identity): its name as an id when it is held in its entity's `## Rules`, else its file name), plus a readable reason. One rejection names exactly one rule. A bare status code or prose message cannot be asserted against; the structured field is what lets a test prove that the specific rule fired, not merely that something was refused.

- **Business rules**: for each rule, deliberately submit input that violates it. The application must reject it, and the bad state must not persist (read it back). A rule shown in the UI or the docs but never applied is decorative, not enforced.

### Capability API boundary  `[feature: capability-api-boundary]`

- Each implemented capability exposes its own API boundary; its endpoints map to its use cases and entity operations, not to arbitrary database operations. Cross-capability access goes through APIs or defined interfaces, never another capability's internals. APIs do not expose persistence details.
- **Every entity operation has an endpoint**: each operation a role may perform, create, read, update, delete and lifecycle (submit, approve, close, cancel), is implemented by a route handler that declares it with the inline marker `// MDE: <entity>.<op>` ([source trace](../../features/server/source-trace-header.md)). An operation with no marked route is not implemented. The same operation set must also have a test scenario ([testing](testing.md)): requiring only one lets an operation be implemented with no test, or tested with no endpoint.

A route that exists is not an API that works.

- **Endpoints**: for each declared operation, call the running application. Mutate, then read the record back with a separate request (or the database); the change must be there. The server log should show the request reach the data store (route, service, repository, query). Send an invalid call; it must be rejected with a sane status. An endpoint that responds but persists nothing, or serves canned data, is hollow.

### Endpoint contracts  `[feature: endpoint-contracts]`

- Request and response contracts are explicit per endpoint. Authentication and authorization requirements are explicit when in scope, enforced by the shared access enforcer.

### OpenAPI contract  `[feature: openapi-contract]`

- `openapi.yaml` is generated from the real routes, never hand-written: each marked route contributes one operation, with path, method, parameters, request body, response schemas, status codes, and the security scheme when authentication is in scope. A hand-written document that is never regenerated drifts silently from the code, and it is the one consumers trust.
- Pin the OpenAPI version the document targets (for example `3.1.0`) once, in the generator's configuration.
- Validate the implementation against its own contract: a conformance test checks that real requests and responses match the generated schemas. A swagger page, a generated client, or contract-test scaffolding are optional extras.

### Request/response validation  `[feature: request-response-validation]`

- Validation happens at the API boundary ([server](../../features/server/boundary-validation.md)) and is deterministic: the same input always fails the same way.

### Status code discipline  `[feature: status-code-discipline]`

- Status codes are intentional and consistent across endpoints: happy path, validation failure, business-rule failure, not found, and conflict each return their own.

## Verify and Audit

The Checks `mde verify` proves for this target compile to `targets/verification/api.md`; what a second agent judges compiles to `targets/audit/`, under each Feature's first Target.
