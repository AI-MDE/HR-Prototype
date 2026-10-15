---
type: architecture
---

# Persistence Architecture

## Persistent model follows business needs

Persistent structures should faithfully support the entities, relationships, invariants, and query needs expressed by the business/application model. They need not mechanically mirror domain objects one-to-one.

## Reproducible evolution

Persistent-schema changes must be reproducible and versioned where the selected persistence technology requires schema evolution. Production changes should not depend on undocumented manual edits.

## Keys and constraints

Use stable identity and persistence constraints where they protect true data invariants. Referential integrity, uniqueness, required relationships, and equivalent invariants should be enforced at the strongest practical layer supported by the chosen technology.

## Persistence boundary

Application behavior accesses persistence through a clear boundary rather than embedding storage mechanics throughout transport, presentation, or domain code.

In this architecture the boundary is a **repository** per capability that owns persistence: services and use cases depend on the repository's interface; the repository owns the queries, the driver, and the mapping between stored rows and domain shapes; nothing above it touches the database or the driver. Generated data-access code lives in repository modules (for example `<capability>/Repository`, or the stack's equivalent), never inline in routes, services, or pages. The repository is the one place its capability's schema is queried, so a schema change has one consumer to update, and the persistence integration test drives the real repository against the real schema. Repositories take part in the caller's transaction ([Transaction boundaries](domain-and-access.md#transaction-boundaries)).

Business rules remain outside persistence infrastructure unless the rule is inherently a storage invariant or persistence concern.

Connection management, bootstrap, migration/evolution, and other persistence infrastructure concerns should be centralized rather than duplicated across features.

## Audit history

Business-significant changes that require accountability should have an audit strategy capable of identifying what changed, when, and by whom. Operational logs are not a substitute for required business audit history.

## Seed and reference data

Provide reproducible seed or reference data when the application requires known values to run, demonstrate, or test meaningful behavior. Sample data should not be introduced into production unless it is genuine production reference data.

## Runnable setup

A developer or deployment process should be able to establish the required persistence state reproducibly, including schema evolution and required reference data.

## Storage vs other models

Persistence models, domain models, external contracts, and UI/view models may differ. Do not distort business or UI models merely to mirror storage representation.

## Conformance checks

- Does each capability that owns persistence reach the database only through its repository (interface and implementation), with services depending on the interface and no direct database or driver use above it?
- Does the mapping between stored rows and domain shapes live in the repository, not in services or the UI?
- Do repositories take part in the caller's transaction rather than committing per call?
