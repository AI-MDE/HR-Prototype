---
type: feature
kind: build
id: application-design-what-design-does
title: What design does
origin: mde
impacts:
  - application-design
---

# What design does

## Purpose

The "What design does" rules of the application-design Target that no other Feature supplies.

## Impact on application-design

- Determine how the requested requirements are realized within the selected architecture and stack: reason about alternatives, choose a realization, and check that it preserves business meaning. Design is more than filling outlines or describing code after it is written.
- Design only what the requested scope needs. An operation can use existing runtime capabilities and existing design decisions without a new service, endpoint, or document. Prefer declarative realization where the runtime can interpret the knowledge; ordinary application code is the escape hatch.
- A useful design identifies the requirement or operation it realizes, the chosen realization and why, the affected contracts or components, and the failure and boundary behavior needed to verify it. Reuse or update existing decisions rather than copying them into competing definitions.

## Audit

- Do operation, API, UI, storage, and integration contracts agree?
