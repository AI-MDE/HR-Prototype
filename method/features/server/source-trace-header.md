---
type: feature
kind: build
id: source-trace-header
title: Source traceability
origin: mde
impacts:
  - server
default: n/a
---

# Source traceability

## Purpose

Connect implementation artifacts and important enforcement points to the knowledge they realize.

## Applicability

Applies to relevant application implementation and runtime contracts. Follow the selected stack and Architecture; examples do not mandate a framework, folder layout or unsupported tool.

## Impact on server

Each entity operation (create, read, update, delete, and lifecycle) a slice implements is marked with the inline `// MDE: <entity>.<op>` marker at its route handler, its service method, and its repository method, and other important enforcement points reference the specification they realize. The markers are what the [Coverage](../../metamodel/evidence/coverage.md) matrix is derived from; an operation with a marked route but an unmarked or missing service or repository method is a layering gap. A marker helps discovery but is not proof that the behavior works.

## Verify

- `operations-marked` Does every implemented entity operation carry the `// MDE: <entity>.<op>` marker at its route, service, and repository (`mde verify`, Operation markers row)?
