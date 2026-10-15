---
type: target
id: persistence
title: Persistence
applies_when:
  - the work creates or changes migrations, seeds, repositories, or anything else that touches the database
stage: backend
needs:
  - database
---

# Persistence

<!-- COMPILED by compile-targets.mjs from features. Skeleton (Purpose +
     applies_when) is authored; the sections below are composed from the
     contributing features, each tagged [feature: <id>]. Do not hand-edit
     the composed sections — edit the feature and recompile. -->

## Purpose

What good persistence looks like, and how to prove it: the schema, migrations, seed data, and data access that realize the [persistence design](../design/persistence-design.md), proven against a real database. Persistence reflects the entity model without making entities artificially owned by one capability.

It governs: Migrations, seed data, repositories, and the database they produce.

## Outputs

| Output | Where | When |
|---|---|---|
| Migrations | the stack's migration location (for example `db/migrations/`) | per schema change |
| Seed data | the project's seed location | always |
| Repositories | each capability's slice | per persistence-owning capability |
| Database report (`db-report.json`) | `evidence/tests/` | always |

The database report is a captured `mde:db-report` run against the live database (health, schema summary, detail): the proof the database is real. Its health must show `pass` and its summary must list the tables the migrations declare; a failing report, or an empty schema where tables were declared, is a blocker.

## Evidence

The rows of the Evidence Package this Target owns: what `mde verify` measures and reports for it, each by its id. Tools take a row's title and what it proves from here.

| Row | Title | Proves | Needs |
|---|---|---|---|
| migrations | Migrations | The last migration run succeeded, and its log holds that run only. | database |
| seed-data | Seed data | The last seed loaded rows for every entity of the Specs in the Goal's scope. | database |
| schema | Schema | Entities, their storage, and the database agree. | — |
| storage-tested | Storage tested | Each entity's writes are read back from the database itself by a passing test, not only from the API's answer. | database |

## Composed behavior

### Audit history  `[feature: audit-history]`

For each entity the design marks as audited, the schema has the declared audit fields (`created_at`, `created_by`, `updated_at`, `updated_by` at least) and, when full history is required, the history table or change log. The write path sets them: inserts set the `created_*` fields and updates the `updated_*` fields, in the repository, marked `// MDE: audit-history`. History is written on the same path as the mutation (trigger, repository hook, or service step) so a normal write cannot bypass it. Audit and history rows are not editable through the application. A `created_at` column that no write fills is dead, not auditing.

### Constraints and keys  `[feature: constraints-and-keys]`

- The schema follows the confirmed entity model and each entity's Storage View. Foreign keys and constraints are deliberate and aligned with the design; behavior specific to the database technology is documented when used.

### Engineering for reuse  `[feature: engineering-for-reuse]`

- Storage names come from the model (the catalog's naming convention and the design's overrides); no repository restates a table or column name the model already gives.

### Meaningful sample and seed data  `[feature: meaningful-seed-data]`

Load the [sample data](../../features/persistence/meaningful-seed-data.md) through the selected seed location and a repeatable mechanism, preserving relationships, governed values, and business constraints. Seed loading never replaces unrelated operational records.

### Optimistic locking  `[feature: optimistic-locking]`

For each entity the design marks as concurrently editable, the schema has its version column (added with a sane default for existing rows). Every update is conditioned on the version the client read (`WHERE id = ? AND version = ?`) and increments it, at a repository statement marked `// MDE: optimistic-locking`. An update that changes no row means the record changed underneath: a conflict, returned to the caller as a conflict response (HTTP 409 or equivalent) carrying the current state, never a silent no-op or a 200. The chain is schema column, repository guard, service conflict, API 409, conflict test.

### Persistence integration test (real schema, no mocked DB)  `[feature: persistence-integration-test]`

Persistence is proven against a real schema, never a mock: mocks pass even when the SQL is invalid or the columns do not match.

- At least one integration test applies the real migrations and seeds to an isolated real database (a local instance of the stack's own database, a test container, or an embedded equivalent) and runs a real repository query through the real driver: an insert and read-back per table-owning capability, plus constraint and foreign-key behavior where defined.
- The test harness resets the one configured database (migrate, then seed) and points API and repository tests at it before application modules load. A stale, unreset database is not verification.
- Tests are consumers: they call the application already running and the one database; they never start their own server or reset the database in-process.
- Faking the project's own database (a stub query returning canned rows, an in-memory stand-in) is a failure to remove, not to supplement. Mocking a genuinely external service is fine.
- After applying the up migration, dump the real schema with the stack's own tooling (`db:schema-dump`) and read it against every touched entity's Storage View: each declared table exists, with every declared column. Save the dump in `evidence/tests/` with the table-by-table comparison. The design's static check shows a migration declares a table; this shows the database has it.
- Apply the paired down migration too: it rolls back without error and, where non-destructive, restores the prior state.

### Runnable migrate/seed (no orphaned SQL)  `[feature: runnable-migrate-seed]`

- Migrations and seeds are runnable through the project, never just present as files: scripts (or the stack's equivalent) for `migrate`, `seed`, and `db:reset`, backed by a real migration tool or a committed runner, and a documented one-command bring-up (install, migrate, seed, start). Migration or seed files that nothing applies are orphaned SQL, a defect even when correct.
- The database itself is created by the project, never left to the user: `mde:start` (or a `db:create` step it runs first) creates the configured database when it is missing, safely when it already exists, with the configured credentials, then migrates and seeds. When the database server is unreachable or the credentials fail, it says so with the exact host, port, and database tried (never the password) and stops.
- When the application has sign-in, the seed's development accounts are listed in the App area's `data/accounts.md`, written with the seed and kept in step with it: one table, `Email | Password | Role`, the accounts fictional and for development only. The Workbench's App view shows it, so nobody has to read the seed or the tests to sign in.
- Schema auto-synchronization (an ORM's `synchronize`, auto-migrate on start) is not a migration: it does not version changes, cannot be reviewed, and may drop data. Use real migrations.
- **The seed reports what it loaded.** Every seed run writes `evidence/built/seed.json`, replacing the last: when it ran, and for each entity the rows it loaded (`{ "producedAt": "…", "entities": { "Customer": 3, "ServiceRequest": 5 } }`). Sample data covers every entity of the Specs in the Goal's scope, connected as the business connects them, so every page and use case has something to show; an entity the seed leaves empty is a gap the Evidence shows (`mde verify`, Seed data).
- **Each run replaces its log.** `evidence/tests/logs/migrate.log` and `seed.log` hold the latest run only, ending with its exit (`exit 0`), never the history of earlier runs (Git keeps that). `mde verify` reads the last run from them (Migrations).

### Versioned migrations  `[feature: versioned-migrations]`

- Use the selected migration tooling: ordered, version-controlled changes, validated against the physical design. Plan a rollback or forward-recovery approach fit for each change; not every destructive change has a safe automatic down migration. Keep sample loading apart from production migration.
- Each migration applies atomically: its schema statements and the record marking it applied take effect together or not at all. A migration that fails part-way leaves the database as if it never ran. A real migration tool gives this; a hand-written runner must too.

- Test migration paths on controlled data, including upgrades from an existing state and intentional constraints; record actual execution and recovery limits.

## Verify and Audit

The Checks `mde verify` proves for this target compile to `targets/verification/persistence.md`; what a second agent judges compiles to `targets/audit/`, under each Feature's first Target.
