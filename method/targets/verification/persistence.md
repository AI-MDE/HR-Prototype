---
type: verification-view
title: Verification — persistence
---

# Verification — persistence — COMPILED from features' `## Verify`

<!-- COMPILED by compile-targets.mjs. Do not hand-edit — edit each feature's ## Verify and
     recompile. These are the Checks `mde verify` proves by script or test run; what needs
     judgment is in targets/audit/. This is the VERIFICATION PART of the persistence target: these check blocks live
     HERE and nowhere else. targets/app\persistence.md holds the
     generation behavior; targets/audit/persistence.md holds the audit concerns. -->

### Engineering for reuse  `[feature: engineering-for-reuse]`

- `engineering-for-reuse/features-implemented-once` Is every Feature the application applies implemented once, with no second implementation (`mde verify`, Reuse row), and is every promise proven by a passing scenario tagged `@feature:<id>/<promise>` on each object that applies it (`mde verify`, Features row)?
- `engineering-for-reuse/model-declared-once` Is each entity's model declared once, and is duplicated code below the threshold the Reuse row reports?

### Persistence checks across Features  `[feature: persistence-checks]`

- `persistence-checks/db-report-present` Is `db-report.json` present, healthy, and listing every table the migrations declare?

### Persistence integration test (real schema, no mocked DB)  `[feature: persistence-integration-test]`

- `persistence-integration-test/schema-dump-complete` Does the schema dump show every touched entity's tables and columns, and does the down migration apply cleanly?

### Runnable migrate/seed (no orphaned SQL)  `[feature: runnable-migrate-seed]`

- `runnable-migrate-seed/fresh-clone-starts` From a fresh clone with no database, does `mde:start` create the database, migrate, seed, and start, with no manual step? Is the schema built by migrations rather than auto-synchronization?
- `runnable-migrate-seed/migrations-run` With a database: did the last migration run succeed, its log holding that run only (`mde verify`, Migrations)?
- `runnable-migrate-seed/seed-covers-entities` With a database: did the last seed load rows for every entity of the Specs in the Goal's scope, as `evidence/built/seed.json` reports (`mde verify`, Seed data: every entity, not some)?
