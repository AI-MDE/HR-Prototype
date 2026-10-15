---
type: feature
kind: build
id: ui-design-maintenance
title: Maintenance
origin: mde
impacts:
  - ui-design
---

# Maintenance

## Purpose

The "Maintenance" rules of the ui-design Target that no other Feature supplies.

## Impact on ui-design

- Every entity in scope has at least one Maintenance panel: the canonical place it is maintained. Reference panels show context and `Open` that page when full maintenance is needed.
- A page maintains only its **subject**, the entity its task is about. Every other entity it touches is supporting: a Reference panel limited to `Select`, `Filter`, and `Open`, **never** a Maintenance panel with `Edit`, `Operate`, or create, update, delete, or status-change operations.
- A workflow or task canvas exposes only the maintenance its task needs; it never becomes a general editing surface for the lookups it consumes. If the task needs a supporting entity to exist first, the user creates it on that entity's own page and returns.
- A supporting entity with no page of its own is a **missing page**, not a licence to add its editing to the page that references it.

## Audit

- Does each page capture its structure at the depth its scope needs? With composition: does each canvas have a valid type and real panels, and each panel a resolvable source, type, purpose, placement, and services?
- Does every in-scope entity have a Maintenance panel, does each page maintain only its subject, and do Reference panels reach the target's own Maintenance page?
- Does the built page follow the UI conventions and its pattern, with real states, and no create, edit, or delete controls for an entity it only references?
