---
type: feature
kind: build
id: capability-api-boundary
title: Capability API boundary
origin: mde
impacts:
  - api
default: n/a
---

# Capability API boundary

## Purpose

Each capability exposes its own API boundary when implemented; endpoints map to capability use
cases, not random database operations.

## Applicability

Applies to exposed API operations and their contracts. Resolve protocols, error conventions and implementation techniques through the selected Architecture and API Design.

## External Standards

External standards are background references, not a declaration of compliance.

- **OpenAPI** — https://spec.openapis.org/oas/v3.2.0.html
  - API-OAS-01 (Paths and operations)

## Impact on api

- Each implemented capability exposes its own API boundary; its endpoints map to its use cases and entity operations, not to arbitrary database operations. Cross-capability access goes through APIs or defined interfaces, never another capability's internals. APIs do not expose persistence details.
- **Every entity operation has an endpoint**: each operation a role may perform, create, read, update, delete and lifecycle (submit, approve, close, cancel), is implemented by a route handler that declares it with the inline marker `// MDE: <entity>.<op>` ([source trace](../server/source-trace-header.md)). An operation with no marked route is not implemented. The same operation set must also have a test scenario ([testing](../../targets/app/testing.md)): requiring only one lets an operation be implemented with no test, or tested with no endpoint.

A route that exists is not an API that works.

- **Endpoints**: for each declared operation, call the running application. Mutate, then read the record back with a separate request (or the database); the change must be there. The server log should show the request reach the data store (route, service, repository, query). Send an invalid call; it must be rejected with a sane status. An endpoint that responds but persists nothing, or serves canned data, is hollow.

## Rationale

**Why an inline marker rather than inference.** Routes express operations as verb+path
(`router.post('/reviews/:id/submit')`), which carries no reliable link back to the operation id
— `submit` in the path is a convention, not a declaration. The marker is what ties a handler to
its operation without guessing, and it is what makes the coverage check mechanical rather than
a name-matching heuristic.

**Why it mirrors test coverage.** This is the API twin of the test-coverage requirement in
`gherkin-traceability`: the same operation set must appear in both places. Requiring only one
lets an operation be "implemented" with no test, or "tested" with no endpoint.

## Verify

- `every-operation-routed` Does every entity operation, including lifecycle operations, have a route handler marked `// MDE: <entity>.<op>`, and the same operation set a test scenario?

## Audit

- Does each implemented capability expose its own boundary, with endpoints mapping to use cases and cross-capability access only through APIs?

Judge whether each endpoint **does real work end to end**, not whether a route merely exists.
A route that returns hardcoded/canned data, or handles the request without ever touching the
database, is a shell that passes shape checks while doing nothing.

For each declared operation, call the endpoint against the running app and:

- **Mutate, then verify persistence independently.** POST/PUT/DELETE, then read the record
  back via a *separate* GET (or the DB report) — the change must be there. A write the next
  read can't see never reached the data store.
- **Confirm the data path in the log.** A real request should leave route → service →
  repository / a DB query in the server log. A response with no corresponding DB activity is
  serving canned data.
- **Try an invalid call.** A bad payload / missing field should be rejected with a sane
  status, not swallowed — a route that accepts anything isn't validating.

Report each endpoint as **live** (persists + shows a DB-backed path in the log) or **hollow**
(responds but nothing persists / no DB activity). "The route responds 200" is not a pass.

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on architecture

The API boundary is the only sanctioned cross-capability edge (see the architecture's layering ([overview](../../architecture/overview.md#12-layering-and-dependency-boundaries))); its
existence also flips that capability's pages to the real API (see `data-source-switch`).
