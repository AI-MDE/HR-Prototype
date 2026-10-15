---
type: feature
kind: build
id: persistence-integration-test
title: Persistence integration test (real schema, no mocked DB)
origin: mde
impacts:
  - persistence
default: n/a
---

# Persistence integration test (real schema, no mocked DB)

## Purpose

Persistence is proven against a **real** schema, not a mocked/fake pool. Mocks pass even when
the SQL is invalid or columns do not match. Faking the project's own database is banned.

## Applicability

Applies to persisted concepts and selected persistence concerns in scope. Object-specific selections belong to their owning concepts; Design chooses the realization within Architecture.

## Impact on persistence

Persistence is proven against a real schema, never a mock: mocks pass even when the SQL is invalid or the columns do not match.

- At least one integration test applies the real migrations and seeds to an isolated real database (a local instance of the stack's own database, a test container, or an embedded equivalent) and runs a real repository query through the real driver: an insert and read-back per table-owning capability, plus constraint and foreign-key behavior where defined.
- The test harness resets the one configured database (migrate, then seed) and points API and repository tests at it before application modules load. A stale, unreset database is not verification.
- Tests are consumers: they call the application already running and the one database; they never start their own server or reset the database in-process.
- Faking the project's own database (a stub query returning canned rows, an in-memory stand-in) is a failure to remove, not to supplement. Mocking a genuinely external service is fine.
- After applying the up migration, dump the real schema with the stack's own tooling (`db:schema-dump`) and read it against every touched entity's Storage View: each declared table exists, with every declared column. Save the dump in `evidence/tests/` with the table-by-table comparison. The design's static check shows a migration declares a table; this shows the database has it.
- Apply the paired down migration too: it rolls back without error and, where non-destructive, restores the prior state.

## Verify

- `schema-dump-complete` Does the schema dump show every touched entity's tables and columns, and does the down migration apply cleanly?

## Audit

- Does an integration test run real migrations and real repository queries against the one reset database, with no faked database and no in-process server or reset?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on testing

At least one integration test **applies the real migrations** (and seeds) to an isolated
real/ephemeral test database or schema (a local instance of the stack's own database, a test
container, or an embedded equivalent) and runs a **real repository query** through the real
driver: at least one insert->read
round-trip per table-owning capability, plus a constraint/FK behavior where defined.

The test harness must reset the **one** `DATABASE_URL` (migrate then seed) and point API
and repository tests at it before app/database modules are imported (see [env-contract](../server/env-contract.md)).
A stale, unreset database is not valid verification.

Faking the project's own DB (a stub `query()` returning canned rows, an in-memory stand-in) is a
verification failure and must be removed, not supplemented. Mocking a genuinely external service
is fine.
