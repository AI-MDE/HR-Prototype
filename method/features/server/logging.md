---
type: feature
kind: build
id: logging
title: Logging
origin: mde
impacts:
  - server
default: n/a
---

# Logging

## Purpose

Logging is an **explicit, consistent** cross-cutting concern — a single structured mechanism
used the same way everywhere — not `console.log` scattered ad hoc or invented per module.

## Applicability

Applies to relevant application implementation and runtime contracts. Follow the selected stack and Architecture; examples do not mandate a framework, folder layout or unsupported tool.

## External Standards

External standards are background references, not a declaration of compliance.

- **arc42** — https://arc42.org/overview
  - ARC42-08 (Cross-cutting concepts)
- **OWASP ASVS** — https://owasp.org/www-project-application-security-verification-standard/
  - SEC-ASVS-07 (Error handling and logging)

## Impact on server

- One structured logger, constructed once and shared; never raw `console.*` or `print`, never configured per module. Consistent levels: error, warn, info, debug. Logging is operational; it is not business audit history.
- Must log: one line as each request enters and one as it completes (with its outcome), and every caught error where it is handled, never swallowed. Good practice: transaction commit or rollback, significant business operations at info, database calls only at debug. Enough to trace a request end to end and diagnose a failure, without per-row noise or the same event logged at several layers.
- Every line written while serving a request carries `correlationId`, `principalId`, and `level`, taken from the [request context](../../architecture/overview.md#13-cross-cutting-concerns); logging stamps the context, it never builds it.
- The destination comes from configuration (`LOG_PATH`, level from `LOG_LEVEL`), defaulting to `logs/app.log` (created if absent, git-ignored) and always mirrored to stdout, so a test run can capture the application's log to a known file. The redaction list covers authorization headers, passwords, and tokens.

## Verify

- `one-logger` Is there one shared logger, with no console output elsewhere in the backend, and does it write `correlationId` and `principalId` (`mde verify`, Logging row)?

## Audit

- Is there one shared structured logger, logging every request boundary and every caught error, with `correlationId` and `principalId` on request lines and a configurable destination?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on architecture

Logging is a named cross-cutting concern with **one mechanism** (a logger the app constructs once
and shares). It is not a substitute for audit history (business "who changed what" lives in
`audit-history`); logging is operational.

**Where log lines are emitted (log points).** A **hard core** is always logged; the rest is a
judgment the generator makes toward useful, non-noisy operational visibility.

| Log point | Rule |
|---|---|
| **request boundary in / out** | **must** — one line as a request enters, one as it completes (with outcome/status) |
| **caught errors** | **must** — logged where handled, never swallowed silently |
| transaction outcome | good practice — commit / rollback of a write's unit of work (a read has none) |
| service / use-case operations | good practice — a line at `info` for a significant business operation |
| DB calls | good practice — `debug` only; avoid logging every query/row |

Good practice is to log the points that let a reader **trace a request end to end and diagnose a
failure** — and to avoid the two failure modes: too little (a request you cannot follow) and too
much (per-row noise, or the same event double-logged at multiple layers). The two **must** points —
**request boundary and caught errors** — are non-negotiable because they are the minimum a request
needs to be traceable: and, per [required-operation-ui-coverage](../testing/required-operation-ui-coverage.md), the boundary line is the trace a
test's captured log must show to prove it did real work.

**Required structured labels (a contract — not `e.g.`).** Every log emitted while serving a
request carries these named fields, taken from the propagated request context (see
[context-propagation](../../architecture/overview.md#13-cross-cutting-concerns) — logging *consumes* that context, it does not establish it):

| Label | Meaning |
|---|---|
| `correlationId` | one id per inbound request, stable for its whole lifetime (from the request context) |
| `principalId` | the acting principal (from the request context) |
| `level` | error / warn / info / debug (set at the log call) |

The correlation guarantee — that a service/repository log line carries the **same** `correlationId`
as its route — is the [context-propagation](../../architecture/overview.md#13-cross-cutting-concerns) invariant; logging relies on it. The names above are
the contract: not a request-id under a different key per module.
