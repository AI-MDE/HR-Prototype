---
type: architecture
title: Application architecture
stack: nest-carbon
targets: [business-requirements, architecture, application-design, api-design, ui-design, persistence-design, api, persistence, server, web-ui, testing, evidence, documentation, deployment, dev-setup, run-app]
---

# Application architecture

## Decision or principle

Use TypeScript on Node.js, NestJS for the REST/JSON backend, PostgreSQL for durable records, and React with IBM Carbon components built by Vite. This resolves the retained nest-carbon stack for the [HR-Prototype scope](../requirements/domain.md).

## Layers and boundaries

React pages call the NestJS API. Controllers validate request shape and authorize the operation, capability services enforce business rules, and repositories execute parameterized PostgreSQL queries. Services own transactions; the UI never writes storage directly. Employee records, performance management and project assignments are capability modules sharing Employee references, not copies. No external business integrations are required.

## Persistence and transactions

Use SQL migrations and the Node PostgreSQL driver; keep database access behind repositories. Store dates as PostgreSQL date and percentages as numeric, preserving the requirements' date and percentage semantics. UUID keys and database unique constraints protect identities; foreign keys preserve references. Create operations return persisted records; Read supplies lists and individual records; Employee.Update returns the updated record.

Every mutation validates and writes in one transaction. Both assignment creation and Employee.Update lock the relevant Employee row before reading commitments or writing; assignment creation then reads Project. Calculate concurrent allocation over the proposed interval using dated boundaries, including starts and the day after inclusive ends. All writes affecting the invariant use that same lock order. This prevents two assignments from both passing against an old total. Database errors roll back the whole mutation and map through the shared error contract.

PerformanceReview has two distinct Employee references, assessedEmployeeId and reviewerId. Project has clientId; ProjectAssignment has projectId and employeeId. These are reference fields, not additional business attributes. Collections are read through those links. The [design catalog](../design/catalog.json) supplies naming and shared persistence conventions; capability designs hold unique keys and labels.

## Local runtime and configuration

Run a local demonstration with fictional data. The default database is a project-owned PostgreSQL container with a dedicated volume; an explicitly configured PostgreSQL connection may replace it. Startup creates a missing database, migrates and inserts the stable fictional seed without overwriting edited records. Destructive reset is a separate explicit command. Docker must be available for the default database mode.

Commands to be implemented in App: `npm --prefix app run mde:install`, `mde:build`, `mde:test`, `mde:start`, `mde:health`, and `mde:stop` (each latter role also uses `npm --prefix app run`). Install handles dependencies once; start never reinstalls them. Start manages only recorded HR-Prototype processes/containers, fails on unrelated port conflicts, starts every tier and reports health. Health identifies HR-Prototype and tests database connectivity. Logs and actual test output feed verification.

Configure database connection, web/API ports, bind host and application base path through environment settings documented by App. Default bind is loopback. The same-origin API lives under the configured application base plus `/api`; Vite proxies that path in development, and the built frontend is served by NestJS. Assets, router and requests all use the same configured base.

## UI and authorization

Use Carbon navigation, tables, form controls, notifications and accessible dialogs consistently. Each aggregate gets a list and profile; Project's profile owns assignment rows. Use-case flows are guided forms with confirmation and success outcomes. One shared Home route renders the current role's launchers. The compact [page set](../design/page-set.md) and [navigation map](../design/diagrams/navigation.md) define the screens.

The demo has a visibly labeled role selector backed by a server-side demo session. The server applies [generated authorization](../design/authorization.json) on every request; UI visibility follows the same grants. All records are fictional. This demo selection is not identity authentication and must remain loopback-only. Within the demo, a role may access all fictional records of the entities it can read; production identity, management hierarchy and record-scoped permissions are outside this build.

Reference selectors show business labels, not UUIDs. Hide actions and related panels the current role cannot access. Loading, empty lists, field errors, refused operations, missing records, access denial and unexpected errors all have visible outcomes; preserve form input after a refusal. Do not fabricate KPI dashboards without defined measures.

## Rationale and consequences

The chosen stack supports the user's full-stack prototype request while keeping the five-entity model small. PostgreSQL constraints and shared transaction locks protect the cross-project allocation rule. The local demo session lets the user review the three roles without adding an identity provider; it does not establish production access control. Changes persist between starts; application migrations and seeds must work on an absent database before completion is claimed.

## Targets in scope

The stack's candidate Targets remain unchanged. Goal selection keeps business-requirements and run-app; other formal Targets are optional under Prototype. Minimal architecture/design and working real persistence still apply.

## Diagrams

- [Architecture](diagrams/architecture.md)
- [Request interaction](diagrams/interactions.md)
