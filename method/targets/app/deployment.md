---
type: target
id: deployment
title: Deployment
applies_when:
  - a deployment is in scope: the work selects, creates, or changes how the application is deployed
stage: release
needs:
  - deployment
---

# Deployment

<!-- COMPILED by compile-targets.mjs from features. Skeleton (Purpose +
     applies_when) is authored; the sections below are composed from the
     contributing features, each tagged [feature: <id>]. Do not hand-edit
     the composed sections — edit the feature and recompile. -->

## Purpose

What a good deployment looks like, and how to check it: the application runs in a target environment by a repeatable, documented path, never undocumented manual steps. Deployment concerns are explicit, reproducible, and consistent with the stack and the standard operations ([server](../../features/server/app-runtime-scripts.md)).

It governs: The deployment configuration and its runtime, for the mechanisms the application selected.

## Outputs

| Output | Where | When |
|---|---|---|
| Deployment configuration | `deploy/` | always |
| Operations guide | `<app>/docs/operations-guide.md` ([documentation](documentation.md)) | always |

## Composed behavior

### Apache folder deployment (reverse-proxy, not ports)  `[feature: apache-folder-deploy]`

The application is served under URL folders behind a reverse proxy (`https://host/<app>/`, `https://host/<app>/api/`), never by exposing its ports: several applications share one host as folders, and only the proxy's 80 and 443 are public. The deployment produces the proxy configuration mapping each public folder to its surface's internal port, for example with Apache:

```apache
ProxyPass        /<app>/api/  http://127.0.0.1:API_PORT/<app>/api/
ProxyPassReverse /<app>/api/  http://127.0.0.1:API_PORT/<app>/api/
ProxyPass        /<app>/      http://127.0.0.1:WEB_PORT/<app>/
ProxyPassReverse /<app>/      http://127.0.0.1:WEB_PORT/<app>/
```

Ports come from the application's configuration, the same values development uses, and the folders match the base paths the application is built for ([serving under a base path](../../features/web-ui/base-path-routing.md)): the same model as development, never a separate deploy-only scheme.

### Cloud deployment  `[feature: cloud-deployment]`

The path from the built artifact to a running cloud environment is committed and documented: the deploy pipeline (CI/CD or committed scripts), provisioning as infrastructure-as-code where practical, configuration and secrets from the cloud's secret store, and a documented rollback. Development, staging, and production are parameterized from one definition.

### Containerization (Docker)  `[feature: containerization]`

A committed, reproducible recipe (for example a `Dockerfile` with `.dockerignore`) builds the image through the standard install and build, runs it with the standard start, exposes the documented ports, and takes configuration and secrets from the environment. Base images are pinned and dependencies declared. When the application needs a database, a multi-service local bring-up (for example `docker-compose.yml`) matches the documented install, migrate, seed, and start path.

### Orchestration (Kubernetes)  `[feature: orchestration]`

Committed, declarative manifests (Kubernetes YAML, a Helm chart, or equivalent) declare the deployment and replicas, the service exposing it, configuration and secrets from config maps and secret references (never inlined), health and readiness probes on the application's health check, and resource requests and limits. They reference the image the container recipe builds and are parameterized per environment; nothing needs a manual cluster edit to run.

### Production runtime baseline  `[feature: production-runtime]`

- The design selects its deployment mechanisms explicitly and records them in the technology Specs (artifact, mechanisms, runtime topology, configuration and secrets boundary, database jobs, backup and restore, deploy verification). Unselected mechanisms create no obligations.
- Every mechanism builds and runs through the standard install, build, and start operations and deploys the same immutable artifact to every environment; no separate, divergent build path.
- The runtime uses a pinned base, a non-root application user, a read-only application filesystem where supported, external configuration and secrets (never baked into an artifact or committed), persistent database storage, health and readiness probes wired to the application's health check, resource and restart policy, graceful shutdown, structured logs, and development facilities disabled in production.
- Database migration, and any data conversion, run as explicit one-shot jobs, never hidden in every replica's startup. Backup is verified before a destructive change; restore and deployment rollback are executable and tested.
- No deployment claims success until health and a real smoke transaction pass; evaluation environments are then torn down.
- The deployment view names the published surface, the application process, persistence, the one-shot jobs, health, logs, and backup storage, and separates build-time, deploy-time, and runtime responsibilities.
- The operations guide is executable alongside the shipped deployment: prerequisites, configuration, secret creation, build, migrate, conversion, start and stop, health, smoke, logs, backup, restore, upgrade, rollback, troubleshooting, and where evidence is kept.

Static checks reject floating base images, a root runtime, baked secrets, missing health checks, unbounded restart or resource behavior, and divergent build paths. When the selected runtime is available, a production-like test builds and starts it, migrates, checks health and runs a smoke transaction, exercises backup, restore, and rollback, and tears it down.

## Verify and Audit

The Checks `mde verify` proves for this target compile to `targets/verification/deployment.md`; what a second agent judges compiles to `targets/audit/`, under each Feature's first Target.
