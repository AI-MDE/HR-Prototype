---
type: feature
kind: build
id: optimistic-locking
title: Optimistic locking
origin: mde
impacts:
  - persistence-design
  - persistence
default: n/a
---

# Optimistic locking

## Purpose

Concurrent updates to the same record must not silently overwrite each other. When an entity
is concurrently editable, it carries a **version** and updates are guarded by it — a stale
update is rejected, not lost.

## Applicability

Applies to persisted concepts and selected persistence concerns in scope. Object-specific selections belong to their owning concepts; Design chooses the realization within Architecture.

## Impact on persistence

For each entity the design marks as concurrently editable, the schema has its version column (added with a sane default for existing rows). Every update is conditioned on the version the client read (`WHERE id = ? AND version = ?`) and increments it, at a repository statement marked `// MDE: optimistic-locking`. An update that changes no row means the record changed underneath: a conflict, returned to the caller as a conflict response (HTTP 409 or equivalent) carrying the current state, never a silent no-op or a 200. The chain is schema column, repository guard, service conflict, API 409, conflict test.

## Impact on persistence-design

- **Optimistic locking** is opt-in per entity: a concurrently editable entity applies a version term of the [design catalog](../../metamodel/design/design-catalog.md) (an integer `version`, or a row version or timestamp used as a concurrency token, which the term adds to its Storage View). The capability design records which entities apply it; the catalog's default for the others (row locks with last accepted write, say) is a term too, so no entity is left unexplained.

## Audit

- For concurrently editable entities: are updates version-guarded and incrementing (marked), and does a mismatch return a conflict with the current state?
- Does the design name each audited entity and its depth, and each concurrently editable entity and its version token (or say why it has none)?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on server

The version-guarded UPDATE in the repository carries the inline marker
`// MDE: optimistic-locking — …` at the statement that guards + increments the version (see
`source-trace-header`), so the capability is **declared** at its implementation site, not
inferred from the SQL shape. Locking is a vertical slice — schema column → repository
guard/increment → service conflict → API 409 → a conflict test — and the repository site is the
anchor that must be marked.

### Impact on api

An update whose version no longer matches returns a **conflict** response (HTTP 409 or the
stack equivalent) carrying the current state, not a 200 — so the client can re-read and retry.
The API does not last-write-wins silently.
