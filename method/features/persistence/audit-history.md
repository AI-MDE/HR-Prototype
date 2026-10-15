---
type: feature
kind: build
id: audit-history
title: Audit history
origin: mde
impacts:
  - persistence-design
  - persistence
default: n/a
---

# Audit history

## Purpose

When the business needs to know **who changed what, when** (and optionally the before/after),
the entity carries audit fields and/or a history trail — deliberately, per the design, not as
an accidental side effect.

## Applicability

Applies to persisted concepts and selected persistence concerns in scope. Object-specific selections belong to their owning concepts; Design chooses the realization within Architecture.

## Impact on persistence

For each entity the design marks as audited, the schema has the declared audit fields (`created_at`, `created_by`, `updated_at`, `updated_by` at least) and, when full history is required, the history table or change log. The write path sets them: inserts set the `created_*` fields and updates the `updated_*` fields, in the repository, marked `// MDE: audit-history`. History is written on the same path as the mutation (trigger, repository hook, or service step) so a normal write cannot bypass it. Audit and history rows are not editable through the application. A `created_at` column that no write fills is dead, not auditing.

## Impact on persistence-design

- **Audit history** is opt-in per entity, driven by a business rule or use case that asks for it. The design names which entities are audited and to what depth: audit fields only (`created_at`, `created_by`, `updated_at`, `updated_by` at least), or full change history (an `<entity>_history` table or an append-only change log), recorded in the Storage View.

## Audit

- For audited entities: are the audit fields and history present, set on the write path (marked), and not editable through the application?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on server

Auditing is not just a schema fact — the write path **sets** the audit fields. The entity's
repository update (the mutation path) sets `updated_at`/`updated_by` (and insert sets
`created_*`), and the site carries the inline marker `// MDE: audit-history — …` (see
`source-trace-header`). A `created_at` column that no write populates is a dead column, not
auditing.
