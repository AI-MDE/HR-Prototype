---
type: feature
kind: build
id: capability-vertical-slices
title: Capability vertical slices (source)
origin: mde
impacts:
  - server
default: n/a
---

# Capability vertical slices (source)

## Purpose

When the app is capability-based, source is organized by capability/vertical slice — matching
the architecture's slices.

## Applicability

Applies to relevant application implementation and runtime contracts. Follow the selected stack and Architecture; examples do not mandate a framework, folder layout or unsupported tool.

## Impact on server

- When the application is organized by capability, source is organized by capability slice, each slice's UI, route, service, and repository code together, with cross-cutting code (database pool, configuration, identity, access, errors) in a shared module, never duplicated per slice.
- Within a server slice, each layer is its own module: types and contracts, repository (all data access; queries live there and nowhere else), service (business behavior, no queries), routes (thin wiring that delegates to the service). A slice with routes or a service but no repository, or several layers in one module, is drift.

Drive the running application and read its own log. For each capability's operations, call the endpoint and verify the effect independently: a mutation must be visible through a separate read, and the server log must show the request reach route, service, repository, and a real query. A slice whose service or repository is a pass-through, whose repository returns hard-coded rows, or whose route serves canned data is hollow, however complete its files look.

## Verify

- `slices-live` Is every slice live: mutations persist and the log shows the full route-to-query path (`mde verify`, Live slices row)?
- `layers-kept` Does each capability have a source folder of its own holding its slice (a route, a service, and a repository, each real code naming the capability's entities, never a placeholder), with data access (the database driver, SQL) only in the data layer and never in a route (`mde verify`, Slices and layers row)?

## Audit

- Is source organized by capability slice, with shared code factored out, one module per layer, thin routes, logic in services, and data access only in repositories?

Judge whether the server slice **does real work end to end** — route → service → repository →
database — not whether the files merely exist. Drive the running app and inspect its own log.

For each capability's operations: call the endpoint, then verify the effect **independently** —
a mutation (POST/PUT/PATCH/DELETE) must be visible via a separate read (GET or the db-report),
and the run's server log must show the request reaching route → service → repository / a real DB
query. A route that returns canned data, mutates nothing, or handles the request without touching
the database is a hollow slice that passes shape checks while doing nothing. Also check the layers
are real: a "service"/"repository" that is a pass-through with the logic inlined in the route, or a
repository that returns hardcoded rows instead of querying, is a slice in name only. Try an invalid
call — a bad payload should be rejected with a sane status, not swallowed.

Report each slice as **live** (persists + shows a real DB-backed route→service→repository path in
the log) or **hollow** (responds but nothing persists / no DB activity / layers are nominal). "The
route responds 200" and "the files are present" are not passes.

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on documentation

The Service/Repository `// MDE: <entity>.<op>` markers, together with the Route marker
(`capability-api-boundary`) and the UI panel's `operations:` list (the [operation coverage](../ui-shared/operation-coverage.md) Feature), are the
source the API side of [Coverage](../../metamodel/evidence/coverage.md) is derived from — the Entity ×
Operation × Layer grid that shows which layers implement each operation.

### Impact on architecture

The source layout realizes the architecture's capability slices (see the capability slices ([overview](../../architecture/overview.md#11-capability-oriented-boundaries))).
