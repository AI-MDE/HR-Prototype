---
type: feature
kind: build
id: production-runtime
title: Production runtime baseline
origin: mde
impacts:
  - deployment
default: on when deployment is in scope
---

# Production runtime baseline

## Purpose

Define the operational qualities every selected deployment mechanism must realize: one verified
artifact, external configuration/secrets, least privilege, persistence, health, observability,
safe database lifecycle, backup/restore, upgrade, rollback, and repeatable evidence.

## Applicability

Applies when this deployment mechanism or operational concern is selected for the application. Resolve environment and tool choices in Architecture and Technology Specs.

## Impact on deployment

- The design selects its deployment mechanisms explicitly and records them in the technology Specs (artifact, mechanisms, runtime topology, configuration and secrets boundary, database jobs, backup and restore, deploy verification). Unselected mechanisms create no obligations.
- Every mechanism builds and runs through the standard install, build, and start operations and deploys the same immutable artifact to every environment; no separate, divergent build path.
- The runtime uses a pinned base, a non-root application user, a read-only application filesystem where supported, external configuration and secrets (never baked into an artifact or committed), persistent database storage, health and readiness probes wired to the application's health check, resource and restart policy, graceful shutdown, structured logs, and development facilities disabled in production.
- Database migration, and any data conversion, run as explicit one-shot jobs, never hidden in every replica's startup. Backup is verified before a destructive change; restore and deployment rollback are executable and tested.
- No deployment claims success until health and a real smoke transaction pass; evaluation environments are then torn down.
- The deployment view names the published surface, the application process, persistence, the one-shot jobs, health, logs, and backup storage, and separates build-time, deploy-time, and runtime responsibilities.
- The operations guide is executable alongside the shipped deployment: prerequisites, configuration, secret creation, build, migrate, conversion, start and stop, health, smoke, logs, backup, restore, upgrade, rollback, troubleshooting, and where evidence is kept.

Static checks reject floating base images, a root runtime, baked secrets, missing health checks, unbounded restart or resource behavior, and divergent build paths. When the selected runtime is available, a production-like test builds and starts it, migrates, checks health and runs a smoke transaction, exercises backup, restore, and rollback, and tears it down.

## Verify

- `runtime-exercised` Was the production-like runtime actually exercised (build, start, migrate, health, smoke, backup and restore, rollback, teardown) where its engine is available?

## Audit

- Are the deployment mechanisms selected explicitly, with no obligations imposed by unselected ones?
- Does every mechanism use the standard operations and one immutable artifact?
- Does the runtime use a pinned build, non-root execution, external secrets, persistent data, health and readiness, graceful shutdown, restart and resource policy, and structured logs?
- Are migration and conversion one-shot jobs, with verified backup and restore and a tested rollback?
- For each selected mechanism (container, orchestration, cloud, reverse-proxy folders): is its configuration committed, declarative, parameterized, and consistent with the rules above?
- Is the operations guide executable against the shipped deployment?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on application-design

The technology stack records the artifact, selected deployment mechanism(s), runtime topology,
configuration/secrets boundary, database lifecycle jobs, backup/restore, and deploy verification
operations.

### Impact on architecture

The deployment view names ingress/published surface, application process, PostgreSQL persistence,
one-shot migration/conversion jobs, health/readiness, logs, and backup storage. It distinguishes
build-time, deploy-time, and runtime responsibilities.

### Impact on testing

Static tests reject floating base images, root runtime, baked secrets, missing health checks,
unbounded restart/resource behavior, and divergent build paths. When the selected runtime is
available, an executable production-like test builds/starts it, migrates, performs health and smoke
checks, exercises backup/restore and rollback, and tears it down.

### Impact on documentation

The operator guide is executable alongside the shipped deployment: prerequisites, configuration,
secret creation, build, migrate, optional conversion, start/stop, health, smoke, logs, backup,
restore, upgrade, rollback, troubleshooting, and evidence locations.
