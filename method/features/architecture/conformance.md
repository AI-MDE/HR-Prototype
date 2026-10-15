---
type: feature
kind: build
id: architecture-conformance
title: Conformance
origin: mde
impacts:
  - server
---

# Conformance

## Purpose

The backend's code follows the resolved architecture. Conformance is judged on the output that realizes the architecture, when that output is built: here the server, and the web UI by its own [conformance](../web-ui/architecture-conformance.md). The [architecture](../../targets/design/architecture.md) Target is judged on its decisions alone, so it can be completed at its own stage, before any code exists.

## Impact on server

The backend follows the resolved architecture: its layers, dependency direction, boundaries, and cross-cutting mechanisms. A deviation is either fixed or recorded as an explicit exception in the architecture's Specs.

## Audit

- For each architecture decision the backend realizes: where is it realized (paths or modules), how is it checked (a `mde verify` check, a test, or the auditor's judgment), and does the code conform (conforms, violates, or not checked), in the report's *Conformance* section? A decision not checked is shown as such, never as conforming; each violation is also a Finding.
- Does the code conform to the layers, dependency direction, and boundaries, with every deviation recorded as an exception?
- Do the architecture and interaction diagrams agree with what the backend's code does: its layers and components, and the same calls, requests, events, and order on the main path and on the paths that change the outcome?
