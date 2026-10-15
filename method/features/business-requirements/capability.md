---
type: feature
kind: build
id: business-requirements-capability
title: Capability
origin: mde
impacts:
  - business-requirements
---

# Capability

## Purpose

The "Capability" rules of the business-requirements Target that no other Feature supplies.

## Impact on business-requirements

- It states its purpose, primary actors, business outcomes, its primary entity when that helps define the boundary, and links to its workflows, its conceptual data model, the ABEs it uses (its own first, each by its Primary Entity), its rules, use cases, and pages.
- The overview points rather than contains: a short purpose, then links. The content of its workflows, ABEs, and use cases stays in their own files, so the overview is cheap to read and the rest is read only when the work needs it.
- It says something real and specific about this business: concrete operations, constraints, and decisions a builder could implement without guessing. A template with every section present but vague content ("manages records") is not a requirement. Its purpose is reflected in its operations and rules, and capabilities do not read as copies of one another.

## Verify

- `overview-lists` Does each capability's overview list the ABEs it uses, its own first, and link each of its workflows (`mde verify`, Capabilities row)?

## Audit

- **Capability:** Does each define purpose, primary actors, outcomes, and (when applicable) a primary entity, with its related concepts linked? Is each specific and coherent rather than generic boilerplate?
