---
type: target
id: integration
title: Integration
applies_when:
  - the work connects the application to an external system, or changes an existing connection
  - the work converts an existing or external dataset into the application
stage: backend
needs:
  - integration
---

# Integration

<!-- COMPILED by compile-targets.mjs from features. Skeleton (Purpose +
     applies_when) is authored; the sections below are composed from the
     contributing features, each tagged [feature: <id>]. Do not hand-edit
     the composed sections — edit the feature and recompile. -->

## Purpose

What a good integration with an external system looks like, and how to check it. Integrations are explicit application boundaries: the application owns its domain model, and an adapter translates between that model and the external system's contract. Their shape is defined by the [Integration](../../metamodel/design/integration.md) concept.

It governs: [Integration](../../metamodel/design/integration.md) specifications, their adapters and tests, and data conversion jobs.

## Outputs

| Output | Where | When |
|---|---|---|
| Integration specification | `specs/design/integrations/<system>.md` | per in-scope external system |
| Adapter | the integrating capability's slice | per external system |
| Contract and failure-path tests | the test suite | per external system |

## Composed behavior

### Adapter isolation  `[feature: adapter-isolation]`

Capability domain and services depend on an application-owned interface; a dedicated adapter owns the vendor and transport types, the mapping, authentication, retries, and the translation of external errors. Vendor types in domain code are a failure. The adapter is the integration boundary in the architecture and interaction diagrams.

### Compatibility and versioning  `[feature: compatibility-versioning]`

- Contract versioning and compatibility are defined: how a version change is detected and handled, so an external change never breaks the integration silently.

### Contract and failure-path tests  `[feature: contract-and-failure-tests]`

Contract tests and the applicable failure-path tests exist and run, with output captured in `evidence/tests/`. The environment is recorded accurately and each piece of evidence is labeled as fixture or mock, emulator, sandbox, or production-like: a mock-only test proves local behavior, not live compatibility.

### Governed data conversion  `[feature: data-conversion]`

Moving a bounded existing or external dataset into the application's governed model is a conversion, not a schema migration, seed data, interactive import, or continuous ETL. Every source record is explainable and every production load is controlled.

- **Contract**: a versioned specification, the source schemas, and an explicit mapping covering identifiers, relationships, enumerations, units, timestamps and time zones, nullability, defaults, normalization, ownership, and incompatible values.
- **One pipeline** for `dry-run` and `load`: dry-run runs the complete parse, map, validate, dependency, and reconciliation path but opens no write transaction on the target.
- **Outcomes**: dependency groups are processed in declared order, references resolved through stable source keys, and each input record gets exactly one outcome: `accepted`, `rejected`, or `unchanged`. A rejection carries a stable reason code, source location, non-secret identifying context, and remediation guidance.
- **Loads** are transactional at a declared batch boundary, idempotent by a stable source-system, entity, and source-key identity, restartable from durable checkpoints, and safe to replay. Reports reconcile source totals to outcomes, with contract and mapping versions, checksums, timestamps, mode, run id, and target identity, never credentials.
- **Architecture**: conversion is an offline administrative job in the operations map, using the application's schema and configuration but unreachable through normal request handling. It never calls UI routes or takes domain shortcuts; its target writes are parameterized and its transaction boundaries explicit. Reports and rejects are operational evidence, not business tables.
- **Production cutover** requires a clean preflight report, a verified backup, explicit confirmation, a named rollback strategy, a maintenance or write-control decision, post-load reconciliation, and an operator's sign-off. Evaluation runs only against an isolated target.
- **Tests** cover contract version rejection, mapping and normalization, missing and invalid fields, duplicates, broken references, dependency order, dry-run non-mutation, load, replay idempotence, forced rollback, restart from a checkpoint, reject redaction, and exact source-to-outcome reconciliation, with at least one integration test against the real database and schema.
- **Operations guide**: source preparation, dry run, reject remediation, backup, confirmation, load, reconciliation, resume, rollback, evidence retention, and extending source adapters.

### Idempotency and retries  `[feature: idempotency-and-retries]`

- Retries and replays are safe, through idempotency or explicit duplicate detection and reconciliation. Timeout, duplicate handling, consistency, and recovery are defined.

### Integration specification  `[feature: integration-spec]`

Every in-scope external system has a non-placeholder specification recording ownership, mapping, authentication and secrets, timeout, retry, and idempotency, compatibility, failure recovery, observability, and the test environment.

### Ownership and mapping  `[feature: ownership-and-mapping]`

For every exchanged entity and field, data and decision ownership is explicit (the source of truth, and the direction). The mapping between the external contract and the internal model is defined, and owned by the adapter.

### Reconciliation path  `[feature: reconciliation-path]`

- Asynchronous or synchronized data has an operational reconciliation path: observability and a defined way to detect and correct drift. Unresolved destructive synchronization, conflict, or ownership decisions stay open in `work/current/questions.md`.

### Secrets and timeouts  `[feature: secrets-and-timeouts]`

- External calls have explicit timeouts and never block forever. Committed source contains no secrets; they are externalized, and sensitive data handling is explicit.

## Verify and Audit

The Checks `mde verify` proves for this target compile to `targets/verification/integration.md`; what a second agent judges compiles to `targets/audit/`, under each Feature's first Target.
