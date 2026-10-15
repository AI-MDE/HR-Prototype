---
type: feature
kind: build
id: data-source-switch
title: Configured data sources
origin: mde
impacts:
  - web-ui
default: n/a
---

# Configured data sources

## Purpose

Allow an explicitly selected environment or data source to be changed without rewriting page behavior.

## Applicability

Applies to a preview or prototype requested for the scope, and to the application its pages are carried into. A prototype's data source is the MDE runtime by default (the [Prototyping Strategy](../../strategy/prototype.md)); otherwise the application's own backend. Any other substitute requires an explicit project decision.

## Impact on web-ui

**Every page reads and writes through one data-access module, and the module through the `.env` names, never through an address of its own.** A prototype on the MDE runtime sets `SERVER_SOURCE=runtime`, and its module calls the runtime (at `MDE_RUNTIME_URL`, for the application `MDE_PROJECT`, which the Workbench sets); the moment the application has its own backend, `SERVER_SOURCE=api` and the module is replaced by one calling `API_BASE`: every page moves together, never one entity at a time, and no runtime call stays behind beside the backend. The module offers the same operations and error contract from either source, so changing the source changes `.env` and that one module, never the pages. The runtime is a prototype's default source; on a full stack and once the application is built, its own backend is. Never infer that a backend is available from a file name, or substitute any other data source silently. A substitute, when explicitly chosen, is visible and records what it cannot verify. The same coherent [sample data](../persistence/meaningful-seed-data.md) loads through the selected source, repeatably, apart from operational data.

## Audit

- Do pages reach their data only through the one data-access module, from the source `.env` names (the runtime for a prototype on it, the application's own backend otherwise), with any other substitute explicit and its limits recorded?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on application-design

Record the source/API contract and explicit environment configuration. The MDE runtime is a prototype's default source and the application's own backend the build's; do not infer backend availability from a source filename or silently substitute a fake API.
