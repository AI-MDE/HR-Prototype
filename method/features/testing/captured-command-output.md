---
type: feature
kind: build
id: captured-command-output
title: Captured command output
origin: mde
impacts:
  - testing
default: n/a
---

# Captured command output

## Purpose

Executable checks leave captured output as evidence artifacts — a prose "passed" line is not
sufficient. Trust concrete artifacts over asserted claims.

## Applicability

Applies to required verification for the scope. Strategy sets rigor and gate policy; Design resolves the test realization and tooling.

## Impact on testing

- Every executable check (install, build, typecheck, tests, coverage, migrate, seed) saves its real output under `evidence/tests/logs/` (`install.log`, `build.log`, `typecheck.log`, `test.log` with a machine-readable report, `migrate.log`, `seed.log`), referenced from the Evidence Package. A check claimed passed with no captured output does not count. Each run replaces its logs: no earlier run's or abandoned attempt's logs are kept beside the current ones (Git keeps the history).
- Logs are UTF-8 without a byte-order mark. A plain PowerShell redirect or `Out-File` writes UTF-16 with a BOM, which reads as binary; use `Out-File -Encoding utf8`, a shell that writes UTF-8, or let the runner write the file. A UTF-16 log is a defect even when its content is right.
- Every suite that drives the running application (API, UI, business rules) also captures the application's own log: it sets `LOG_PATH` to a suite-specific file next to its report (for example `evidence/tests/ui/run.log`). The runner's output proves the assertions passed; only the application's log proves the server-side path ran. Each mutating or search scenario's captured log must show the request it claims (and, for a write, its transaction); a silent log for a claimed operation is a defect.

## Verify

- `output-captured` Is every executable check's output captured as UTF-8 under `evidence/tests/logs/`, and does each suite driving the application capture its server log, showing the requests its scenarios claim?
