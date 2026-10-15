---
type: feature
kind: build
id: cloud-deployment
title: Cloud deployment
origin: mde
impacts:
  - deployment
default: off
---

# Cloud deployment

## Purpose

When `cloud` is explicitly selected, getting the application into its cloud target is a **documented, repeatable pipeline**, not a
sequence of console clicks — so a deploy is reproducible and a rollback is possible.

## Applicability

Applies when this deployment mechanism or operational concern is selected for the application. Resolve environment and tool choices in Architecture and Technology Specs.

## Impact on deployment

The path from the built artifact to a running cloud environment is committed and documented: the deploy pipeline (CI/CD or committed scripts), provisioning as infrastructure-as-code where practical, configuration and secrets from the cloud's secret store, and a documented rollback. Development, staging, and production are parameterized from one definition.

## Audit

- When a cloud is selected: is the deploy path committed and documented, with secrets from the cloud's store, a documented rollback, and environments parameterized from one definition?
