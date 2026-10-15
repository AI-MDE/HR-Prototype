---
type: feature
kind: build
id: versioned-migrations
title: Versioned migrations
origin: mde
impacts:
  - persistence
default: n/a
---

# Versioned migrations

## Purpose

Evolve persisted structure repeatably while protecting existing data and adopted contracts.

## Applicability

Applies to persisted concepts and selected persistence concerns in scope. Object-specific selections belong to their owning concepts; Design chooses the realization within Architecture.

## Impact on persistence

- Use the selected migration tooling: ordered, version-controlled changes, validated against the physical design. Plan a rollback or forward-recovery approach fit for each change; not every destructive change has a safe automatic down migration. Keep sample loading apart from production migration.
- Each migration applies atomically: its schema statements and the record marking it applied take effect together or not at all. A migration that fails part-way leaves the database as if it never ran. A real migration tool gives this; a hand-written runner must too.

- Test migration paths on controlled data, including upgrades from an existing state and intentional constraints; record actual execution and recovery limits.

## Audit

- Do migrations realize the physical design without unintended data loss, applying atomically, ordered, and repeatable, with recovery explicit?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on testing

Verify applicable migration paths on controlled data, including existing-state upgrades and intentional constraints. Record actual execution and recovery limitations.
