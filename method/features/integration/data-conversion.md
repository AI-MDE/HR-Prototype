---
type: feature
kind: build
id: data-conversion
title: Governed data conversion
origin: mde
impacts:
  - integration
default: off
---

# Governed data conversion

## Purpose

Move bounded existing/external datasets into an application's governed production model without
confusing conversion with schema migration, seed data, interactive import, or continuous ETL.
Every source record is explainable and every production application is controlled.

## Applicability

Applies to an actual external integration in scope. Resolve the selected contract and mechanism in the owning Integration specification.

## Impact on integration

Moving a bounded existing or external dataset into the application's governed model is a conversion, not a schema migration, seed data, interactive import, or continuous ETL. Every source record is explainable and every production load is controlled.

- **Contract**: a versioned specification, the source schemas, and an explicit mapping covering identifiers, relationships, enumerations, units, timestamps and time zones, nullability, defaults, normalization, ownership, and incompatible values.
- **One pipeline** for `dry-run` and `load`: dry-run runs the complete parse, map, validate, dependency, and reconciliation path but opens no write transaction on the target.
- **Outcomes**: dependency groups are processed in declared order, references resolved through stable source keys, and each input record gets exactly one outcome: `accepted`, `rejected`, or `unchanged`. A rejection carries a stable reason code, source location, non-secret identifying context, and remediation guidance.
- **Loads** are transactional at a declared batch boundary, idempotent by a stable source-system, entity, and source-key identity, restartable from durable checkpoints, and safe to replay. Reports reconcile source totals to outcomes, with contract and mapping versions, checksums, timestamps, mode, run id, and target identity, never credentials.
- **Architecture**: conversion is an offline administrative job in the operations map, using the application's schema and configuration but unreachable through normal request handling. It never calls UI routes or takes domain shortcuts; its target writes are parameterized and its transaction boundaries explicit. Reports and rejects are operational evidence, not business tables.
- **Production cutover** requires a clean preflight report, a verified backup, explicit confirmation, a named rollback strategy, a maintenance or write-control decision, post-load reconciliation, and an operator's sign-off. Evaluation runs only against an isolated target.
- **Tests** cover contract version rejection, mapping and normalization, missing and invalid fields, duplicates, broken references, dependency order, dry-run non-mutation, load, replay idempotence, forced rollback, restart from a checkpoint, reject redaction, and exact source-to-outcome reconciliation, with at least one integration test against the real database and schema.
- **Operations guide**: source preparation, dry run, reject remediation, backup, confirmation, load, reconciliation, resume, rollback, evidence retention, and extending source adapters.

## Audit

- For a conversion: are source and mapping versions declared; do dry-run and load share one path, with dry-run proven not to mutate; is every record reconciled exactly once; are loads transactional, idempotent, ordered, and restartable, with a forced failure proving rollback; and does production require preflight, backup, confirmation, rollback strategy, reconciliation, and sign-off?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on application-design

Record `data-conversion` as an offline administrative job in the operations map and technology
axes. It uses the same PostgreSQL schema and configuration contract as the application but is not
reachable through normal request handling. The design names source-adapter, contract, mapping,
pipeline, target-adapter, report, and operator boundaries.

### Impact on architecture

Architecture and interaction diagrams show external files entering a source adapter, governed
conversion components, and the existing PostgreSQL boundary. Conversion never calls UI routes or
manufactures application-domain shortcuts. Target writes are parameterized SQL and transaction
boundaries are explicit. Reports/rejects are operational evidence, not business-table substitutes.

### Impact on testing

Tests cover contract version rejection, mapping and normalization, missing/invalid fields,
duplicates, broken references, dependency ordering, dry-run non-mutation, load, replay idempotence,
forced rollback, restart/checkpoint behavior, reject redaction, and exact source-to-outcome
reconciliation. At least one integration test runs against real PostgreSQL with the real schema.

### Impact on documentation

The operator guide documents source preparation, dry run, reject remediation, backup, confirmation,
load, reconciliation, resume, rollback, evidence retention, and source-adapter extension.
