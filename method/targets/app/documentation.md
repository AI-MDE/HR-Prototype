---
type: target
id: documentation
title: Documentation
applies_when:
  - the work implements or changes behavior a user, administrator, or operator sees
  - the work changes configuration, deployment, or an API contract
  - the work prepares a release
stage: docs
---

# Documentation

<!-- COMPILED by compile-targets.mjs from features. Skeleton (Purpose +
     applies_when) is authored; the sections below are composed from the
     contributing features, each tagged [feature: <id>]. Do not hand-edit
     the composed sections — edit the feature and recompile. -->

## Purpose

What good documentation looks like, and how to check it: the guides that ship with the application, and the release notes that tell its users what changed. Their shape is defined by the [Documentation](../../metamodel/documentation.md) and [Release Notes](../../metamodel/work/release-notes.md) concepts.

It governs: [Documentation](../../metamodel/documentation.md) (user, admin, and operations guides) and [Release Notes](../../metamodel/work/release-notes.md).

## Outputs

| Output | Where | When |
|---|---|---|
| User guide | `<app>/docs/user-guide.md`, screenshots in `<app>/docs/screenshots/` | when there is a user interface |
| Admin guide | `<app>/docs/admin-guide.md` | when the application has administration functions |
| Operations guide | `<app>/docs/operations-guide.md` | when a deployment is in scope |
| Release notes | `work/current/release-notes.md` | when a release is prepared |

## Evidence

The rows of the Evidence Package this Target owns: what `mde verify` measures and reports for it, each by its id. Tools take a row's title and what it proves from here.

| Row | Title | Proves | Needs |
|---|---|---|---|
| documentation | Documentation | The guides that ship with the product: for users, administrators, and operators, as they apply. | — |

## Composed behavior

### Operator guide (install / deploy / run)  `[feature: operator-guide]`

When a deployment target is in scope, the app ships an **operator guide** at
`app/docs/operations-guide.md` — the runbook for someone installing, deploying, and operating the
app (not developing it). It covers: prerequisites and environment/config (env vars, database
connection, ports), **install** and build steps, **deployment** (per the loaded deployment
target — e.g. folder-proxy/Apache, container, cloud), starting/stopping and health checks,
and **common operational issues / troubleshooting** (failed DB connection, migration/seed,
port conflicts, proxy/base-path). It traces to the deployment target and the app's actual
config (`.env`/config source, start scripts), not invented values. An operator guide missing
the install or deployment steps for the in-scope deployment target is incomplete; flag it.

### Release notes  `[feature: release-notes]`

- Derive the notes from the Git range since the previous release, the actual outputs, and the verification results; never from intentions or plans.
- Do not repeat Git history commit by commit: group and explain what matters to a user, and give the reason behind each change.
- Disclose every known limitation the release ships with, each one accepted by the user.
- At release, the notes become the release tag's message, the lasting record. A project that keeps a `CHANGELOG.md` adds each release's notes to it, newest first; Git stays authoritative for versions.

### Stale-doc detection  `[feature: stale-doc-detection]`

- Guides describe the application as built, matching its actual pages, commands, and configuration, not the intended design. Every value and command in the operations guide comes from the application's real configuration and start scripts, never invented.
- Update the documentation in the same step as the change it describes, and only what the change affects: the user guide sections of the use cases it changed (and their screenshots), the operations guide when configuration or deployment changed, and the API documentation when a contract changed.
- A guide or screenshot that no longer matches is a [Finding](../../metamodel/work/finding.md), never left as if current.

### User guide (whole-system, end-user)  `[feature: user-guide]`

- User guide screenshots are taken from the running application, preferably captured by the UI test that proves the use case, so they are refreshed whenever it runs.

## Verify and Audit

No Feature gives this target a Check `mde verify` proves; what a second agent judges compiles to `targets/audit/`, under each Feature's first Target.
