---
type: feature
kind: build
id: web-ui-architecture-conformance
title: Architecture conformance
origin: mde
impacts:
  - web-ui
---

# Architecture conformance

## Purpose

The frontend's code follows the resolved architecture, judged on the web UI when it is built, as the backend's is on the server ([conformance](../architecture/conformance.md)); the architecture Target is judged on its decisions alone.

## Impact on web-ui

The frontend follows the resolved architecture: its layers, the calls it makes to the backend (and only those), its boundaries, and cross-cutting mechanisms. A deviation is either fixed or recorded as an explicit exception in the architecture's Specs.

## Audit

- For each architecture decision the frontend realizes: where is it realized (paths or modules), how is it checked (a `mde verify` check, a test, or the auditor's judgment), and does the code conform (conforms, violates, or not checked), in the report's *Conformance* section? A decision not checked is shown as such, never as conforming; each violation is also a Finding.
- Does the frontend call the backend only as the architecture decides, through its boundaries, with every deviation recorded as an exception?
- Do the architecture and interaction diagrams agree with what the frontend does: its components, and the requests it makes, in order, on the main path and on the paths that change the outcome?
- Does the navigation diagram show every page of the application's page inventory and the links a person actually follows, and nothing else?
