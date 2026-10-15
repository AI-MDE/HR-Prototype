---
type: feature
kind: build
id: architecture-content
title: Content
origin: mde
impacts:
  - architecture
---

# Content

## Purpose

The "Content" rules of the architecture Target that no other Feature supplies.

## Impact on architecture

- The overview records layers, boundaries, request flow, and integration points, references the selected stack, and keeps UI, API, service or domain, persistence, and integration concerns separate.
- Each decision states its rationale, constraints, and consequences, and traces to the business needs it serves. It does not restate business requirements or low-level code structure.
- A small application may keep all decisions in the overview plus diagrams; split a topic into its own file only when it becomes substantial.

## Verify

- `decisions-stated` Is every architecture decision (each leaf section) stated, none left as an empty heading (`mde verify`, Architecture decisions row)?

## Audit

- Does the architecture reference the selected stack and keep its concerns separate?
- Is each decision traceable to business needs, and is each technology choice resolved, supported, and consistent with it?
