---
type: architecture
name: mdex-application
title: MDEX application
description: Default MDEX layering — technology-independent, capability-oriented, with a clear dependency direction from presentation through domain to persistence.
default: true
layers:
  - Application layer
  - Repository layer
  - Services
  - API
  - UI
---

# Application Architecture

Purpose: Provide durable, technology-independent architectural guidance for applications built on this framework.

Technology choices belong to project configuration and application-specific architecture decisions, not to this framework architecture guidance.

## 1. Architectural shape

### 1.1 Capability-oriented boundaries

Organize business-facing implementation around meaningful business capabilities or coherent vertical slices where practical. Capability boundaries should remain understandable from business specifications through external interfaces, UI, implementation, and tests.

Each in-scope capability is a slice that owns its own layers (page, API route, service or use case, repository or adapter); what several slices share is factored into shared modules, beside the database and external systems. The slice is the unit the architecture diagram groups and the layering rules apply within.

Do not force capability isolation where a shared cross-cutting service is the clearer design.

### 1.2 Layering and dependency boundaries

Keep business/domain behavior distinct from transport, presentation, persistence, and infrastructure concerns.

- Capabilities communicate through APIs or defined interfaces; one capability never reaches into another's internals.
- The UI calls APIs or adapters, never persistence directly. Routes and controllers stay thin and delegate to services or use cases; services own business behavior; repositories and adapters own persistence ([Persistence](persistence.md)).
- External systems are reached through an application-owned interface and an adapter.

A normal dependency direction is:

```text
presentation / transport
        ↓
application / use-case orchestration
        ↓
domain behavior
        ↓
persistence / integration boundaries
        ↓
infrastructure implementations
```

Exact technologies, protocols, folders, frameworks, and class names are project choices rather than architectural requirements.

Business validation is enforced by the authoritative application/domain path. Presentation layers may provide early validation but are not authoritative.

### 1.3 Cross-cutting concerns

Identity, authorization, validation, error handling, logging, transactions, observability, configuration, and security are explicit in the architecture (where each lives and how it applies across layers), handled consistently rather than reinvented or duplicated in each feature or route. Validation happens at the API and UI boundaries and at important business-rule boundaries.

**One request context.** A request carries a single context, established once at the request boundary and passed down through the service and repository layers, so every layer serving that request sees the same values:

| Field | Meaning | Established |
|---|---|---|
| correlation id | one id per inbound request, stable for its whole lifetime | generated at the boundary |
| principal | the acting user ([identity context](domain-and-access.md#identity-context)) | resolved at the boundary from the request |
| transaction or connection | the unit of work where writes occur ([transactions](domain-and-access.md#transaction-boundaries)) | opened at the boundary of a write and passed to repositories |

It travels as one request-scoped object (or async context), never re-derived per layer. A layer that generates its own correlation id, resolves its own principal, or opens its own transaction breaks it. The context exists whether or not the application logs: the transaction for write correctness, the principal for authorization, the correlation id for tracing. Logging consumes it ([Observability](observability-and-identity.md)).

### 1.4 Architecture communication

Maintain an architecture overview. Diagrams are explanatory views of architecture, not a separate source of truth.

Every application maintains the mandatory diagram set defined in `mde/method/metamodel/architecture/README.md` and keeps it consistent as the application evolves.

## Topic documents

- Domain, application behavior, identity, and access control: `domain-and-access.md`
- API and external-interface architecture: `api.md`
- Persistence architecture: `persistence.md`
- UI architecture and design realization: `ui.md`
- Testing architecture: `testing.md`
- Deployment architecture: `deployment.md`
- Architecture validation: `validation.md`
- Governance: `governance.md`
- Observability and request identity: `observability-and-identity.md`
- Business event recording: `business-events.md`

## Conformance checks

- Is source organized by capability slice, each owning its layers, with shared modules factored out?
- Do capabilities communicate only through APIs or interfaces, never reaching into another's internals?
- Are the layers respected: UI to API or adapter, routes to services, services own logic, repositories own persistence?
- Are the cross-cutting concerns explicit in the architecture specification rather than scattered?
- Is one request context (correlation id, principal, transaction where writes occur) established at the boundary and passed through the layers, rather than re-derived in each?

## Documentation architecture

Documentation should be generated or maintained from durable application knowledge where practical. Avoid parallel descriptions that drift independently.

User-facing help, interface documentation, operational documentation, and developer documentation must be updated when behavior or architecture changes materially affect their audience.

Documentation is not complete merely because a file exists; it must remain consistent with the application.

## Architecture evolution

Architecture guidance is not an implementation recipe. When an application needs a material architectural decision, persist that decision in the application's own architecture and configuration. Do not introduce technology choices into framework architecture merely because one project uses them.
