---
type: target
id: server
title: Server
applies_when:
  - the work creates or changes server-side source
  - the work changes configuration, the start or health contract, the operations map, logging, or how the application is served
stage: backend
needs:
  - backend
---

# Server

<!-- COMPILED by compile-targets.mjs from features. Skeleton (Purpose +
     applies_when) is authored; the sections below are composed from the
     contributing features, each tagged [feature: <id>]. Do not hand-edit
     the composed sections — edit the feature and recompile. -->

## Purpose

What good server-side source looks like, and how to check it: its layout, configuration, operations, logging, and how it is served. It realizes the chosen [architecture](../../architecture/overview.md) (slices, layering, request context) with the selected stack.

It governs: Server-side source and its runtime contract: scripts, configuration, start and health, logging, and the base path it is served under.

## Outputs

| Output | Where | When |
|---|---|---|
| Capability slices | one per capability, as the stack lays it out; shared code in a shared module | per implemented capability |
| Runtime scripts | `package.json` at the project or App area root (or the stack's equivalent) | always |
| Configuration contract | the technology Specs, plus `.env.example` (or equivalent) | always |
| Operations map | the technology Specs | always |

## Evidence

The rows of the Evidence Package this Target owns: what `mde verify` measures and reports for it, each by its id. Tools take a row's title and what it proves from here.

| Row | Title | Proves | Needs |
|---|---|---|---|
| reuse | Reuse | Code is not repeated: duplication stays under the threshold. | — |
| slices-and-layers | Slices and layers | Each capability has its own source folder, and data access is only in the data layer, never in a route. | — |
| logging | Logging | One shared logger, no console output elsewhere, and request lines carrying correlationId and principalId. | — |
| live-slices | Live slices | The API suite's captured server log shows the requests its scenarios made, each with a correlation id. | — |
| stack-conformance | Stack conformance | The application's dependencies are the declared stack's. | — |
| no-placeholders | No placeholders | No TODO, FIXME, or "not implemented" is left in shipped source. | — |
| operation-markers | Operation markers | With traceability on, every entity operation is marked at its route, service, and repository. | — |

## Composed behavior

### Conformance  `[feature: architecture-conformance]`

The backend follows the resolved architecture: its layers, dependency direction, boundaries, and cross-cutting mechanisms. A deviation is either fixed or recorded as an explicit exception in the architecture's Specs.

### Boundary validation  `[feature: boundary-validation]`

Validation happens where inputs cross into the system, at the API and UI boundaries and at important business-rule boundaries: explicit, consistent, deterministic, and testable, never scattered or skipped.

### Capability vertical slices (source)  `[feature: capability-vertical-slices]`

- When the application is organized by capability, source is organized by capability slice, each slice's UI, route, service, and repository code together, with cross-cutting code (database pool, configuration, identity, access, errors) in a shared module, never duplicated per slice.
- Within a server slice, each layer is its own module: types and contracts, repository (all data access; queries live there and nowhere else), service (business behavior, no queries), routes (thin wiring that delegates to the service). A slice with routes or a service but no repository, or several layers in one module, is drift.

Drive the running application and read its own log. For each capability's operations, call the endpoint and verify the effect independently: a mutation must be visible through a separate read, and the server log must show the request reach route, service, repository, and a real query. A slice whose service or repository is a pass-through, whose repository returns hard-coded rows, or whose route serves canned data is hollow, however complete its files look.

### Engineering for reuse  `[feature: engineering-for-reuse]`

- Declare each entity's model once: its attributes and types, relationships, states and transitions, and storage names, derived from its spec and its capability design. Validation, DTOs, query column lists, and API types use it; never restate an entity's fields elsewhere.
- Serve the common path generically, once: listing with paging and scope, reading, creating, patching, deleting, transitions, error mapping, and authorization, driven by the model and the Features the design applies. Per-entity code is only a business rule, a decision, or a justified override through a clean per-operation hook.
- Build on mature libraries for routing, injection, SQL, and validation; write only the thin layer that maps the application's model and Features onto them.
- Never copy a working pattern into another file: extract it, or use the Feature that names it.
- Implement each [Feature](../../metamodel/feature.md) the application applies once, in one shared component that every object applying it calls. Look for the one that already exists before writing any mechanism; a second implementation of a Feature is a defect. Where it lives is the code's, never written into the Specs.

### Logging  `[feature: logging]`

- One structured logger, constructed once and shared; never raw `console.*` or `print`, never configured per module. Consistent levels: error, warn, info, debug. Logging is operational; it is not business audit history.
- Must log: one line as each request enters and one as it completes (with its outcome), and every caught error where it is handled, never swallowed. Good practice: transaction commit or rollback, significant business operations at info, database calls only at debug. Enough to trace a request end to end and diagnose a failure, without per-row noise or the same event logged at several layers.
- Every line written while serving a request carries `correlationId`, `principalId`, and `level`, taken from the [request context](../../architecture/overview.md#13-cross-cutting-concerns); logging stamps the context, it never builds it.
- The destination comes from configuration (`LOG_PATH`, level from `LOG_LEVEL`), defaulting to `logs/app.log` (created if absent, git-ignored) and always mirrored to stdout, so a test run can capture the application's log to a known file. The redaction list covers authorization headers, passwords, and tokens.

### Source traceability  `[feature: source-trace-header]`

Each entity operation (create, read, update, delete, and lifecycle) a slice implements is marked with the inline `// MDE: <entity>.<op>` marker at its route handler, its service method, and its repository method, and other important enforcement points reference the specification they realize. The markers are what the [Coverage](../../metamodel/evidence/coverage.md) matrix is derived from; an operation with a marked route but an unmarked or missing service or repository method is a layering gap. A marker helps discovery but is not proof that the behavior works.

### Stack-conformant source  `[feature: stack-conformant-source]`

- Source follows the declared stack and project conventions, with one consistent error and logging pattern. Placeholder code is allowed only when clearly marked and confirmed or deferred, never silently.

### Thin routes, fat services  `[feature: thin-routes-fat-services]`

- Routes and controllers stay thin. Business logic lives in services, use cases, or the domain, never in route bodies or UI handlers; data access lives in repositories or adapters, never in pages or route bodies.

## Verify and Audit

The Checks `mde verify` proves for this target compile to `targets/verification/server.md`; what a second agent judges compiles to `targets/audit/`, under each Feature's first Target.
