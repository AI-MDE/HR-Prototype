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

Applies to a preview or prototype requested for the scope. Use the selected real components and connected sample data; any substitute requires an explicit project decision.

## Impact on web-ui

**Every page reads and writes through the `.env` names (`SERVER_SOURCE`, `API_BASE`), never through an address of its own.** A prototype on the MDE runtime sets `SERVER_SOURCE=runtime`; the moment the application has its own backend, every page moves to it (`SERVER_SOURCE=api`) together, never one entity at a time, and no page keeps reading the runtime's sample data behind the backend's back. Pages use the resolved data-access boundary and configured endpoints, so changing a supported environment needs configuration, never page rewrites, and operation and error contracts stay the same across environments. A real backend is the normal source, prototype included; never infer that a backend is available from a file name, or substitute a fake data source silently. A substitute, when explicitly chosen, is visible and records what it cannot verify. The same coherent [sample data](../persistence/meaningful-seed-data.md) loads through the selected source, repeatably, apart from operational data.

## Audit

- Do pages use the configured data source, with any substitute explicit and its limits recorded?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on application-design

Record the source/API contract and explicit environment configuration. A real backend is the normal prototype source; do not infer backend availability from a source filename or silently substitute a fake API.
