---
type: feature
kind: build
id: stack-conformant-source
title: Stack-conformant source
origin: mde
impacts:
  - server
default: n/a
---

# Stack-conformant source

## Purpose

Generated source follows the declared stack and project conventions, with consistent error
and logging patterns — not ad hoc per file.

## Applicability

Applies to relevant application implementation and runtime contracts. Follow the selected stack and Architecture; examples do not mandate a framework, folder layout or unsupported tool.

## Impact on server

- Source follows the declared stack and project conventions, with one consistent error and logging pattern. Placeholder code is allowed only when clearly marked and confirmed or deferred, never silently.

## Verify

- `stack-dependencies` Are the declared stack's choices (backend, database, frontend, UI, build) among the application's dependencies (`mde verify`, Stack conformance row)?
- `no-placeholders` Is no `TODO`, `FIXME`, or "not implemented" left in shipped source (`mde verify`, No placeholders row)?

## Audit

- Does source follow the declared stack and conventions, with one error and logging pattern, and no silent placeholder code?
