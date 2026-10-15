---
type: feature
kind: build
id: runnable-migrate-seed
title: Runnable migrate/seed (no orphaned SQL)
origin: mde
impacts:
  - persistence
default: n/a
---

# Runnable migrate/seed (no orphaned SQL)

## Purpose

Migrations and seeds must be **runnable through the project**, not just present as files — a
fresh clone can apply them with the project's own tooling. Orphaned SQL is a defect.

## Applicability

Applies to persisted concepts and selected persistence concerns in scope. Object-specific selections belong to their owning concepts; Design chooses the realization within Architecture.

## Impact on persistence

- Migrations and seeds are runnable through the project, never just present as files: scripts (or the stack's equivalent) for `migrate`, `seed`, and `db:reset`, backed by a real migration tool or a committed runner, and a documented one-command bring-up (install, migrate, seed, start). Migration or seed files that nothing applies are orphaned SQL, a defect even when correct.
- The database itself is created by the project, never left to the user: `mde:start` (or a `db:create` step it runs first) creates the configured database when it is missing, safely when it already exists, with the configured credentials, then migrates and seeds. When the database server is unreachable or the credentials fail, it says so with the exact host, port, and database tried (never the password) and stops.
- When the application has sign-in, the seed's development accounts are listed in the App area's `data/accounts.md`, written with the seed and kept in step with it: one table, `Email | Password | Role`, the accounts fictional and for development only. The Workbench's App view shows it, so nobody has to read the seed or the tests to sign in.
- Schema auto-synchronization (an ORM's `synchronize`, auto-migrate on start) is not a migration: it does not version changes, cannot be reviewed, and may drop data. Use real migrations.
- **The seed reports what it loaded.** Every seed run writes `evidence/built/seed.json`, replacing the last: when it ran, and for each entity the rows it loaded (`{ "producedAt": "…", "entities": { "Customer": 3, "ServiceRequest": 5 } }`). Sample data covers every entity of the Specs in the Goal's scope, connected as the business connects them, so every page and use case has something to show; an entity the seed leaves empty is a gap the Evidence shows (`mde verify`, Seed data).
- **Each run replaces its log.** `evidence/tests/logs/migrate.log` and `seed.log` hold the latest run only, ending with its exit (`exit 0`), never the history of earlier runs (Git keeps that). `mde verify` reads the last run from them (Migrations).

## Verify

- `fresh-clone-starts` From a fresh clone with no database, does `mde:start` create the database, migrate, seed, and start, with no manual step? Is the schema built by migrations rather than auto-synchronization?
- `migrations-run` With a database: did the last migration run succeed, its log holding that run only (`mde verify`, Migrations)?
- `seed-covers-entities` With a database: did the last seed load rows for every entity of the Specs in the Goal's scope, as `evidence/built/seed.json` reports (`mde verify`, Seed data: every entity, not some)?

## Audit

- Is there a runnable path to apply migrations and seeds and a one-command bring-up, with no orphaned SQL?
- When the application has sign-in, does `data/accounts.md` in the App area list the seeded accounts (email, password, role) as the seed creates them?
