---
type: feature
kind: build
id: orchestration
title: Orchestration (Kubernetes)
origin: mde
impacts:
  - deployment
default: off
---

# Orchestration (Kubernetes)

## Purpose

When `orchestration` is explicitly selected and the application is deployed to an orchestrator, its runtime shape — replicas, config,
secrets, health, resources — is declared **as committed manifests**, not configured by hand in a
cluster.

## Applicability

Applies when this deployment mechanism or operational concern is selected for the application. Resolve environment and tool choices in Architecture and Technology Specs.

## Impact on deployment

Committed, declarative manifests (Kubernetes YAML, a Helm chart, or equivalent) declare the deployment and replicas, the service exposing it, configuration and secrets from config maps and secret references (never inlined), health and readiness probes on the application's health check, and resource requests and limits. They reference the image the container recipe builds and are parameterized per environment; nothing needs a manual cluster edit to run.

## Audit

- When orchestration is selected: are the manifests committed, declarative, and parameterized per environment, with secrets referenced, probes on the health check, and resource limits?
