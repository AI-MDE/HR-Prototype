---
type: feature
kind: build
id: evidence-attachment
title: Evidence attachment
origin: mde
impacts:
  - evidence
default: n/a
---

# Evidence attachment

## Purpose

Verification evidence is attached to the relevant work, with the kinds of evidence
distinguished — so a reviewer can find proof, not just claims.

## Applicability

Applies to documentation and evidence relevant to the requested scope. Durable application meaning belongs in Specs; execution findings and evidence belong in Work or configured reports.

## Verify

- `package-identifies-goal` If the Strategy requires Evidence, does `evidence/README.md` identify the Goal and assessed revision, with every selected check's status explicit and no failed, missing, or unexecuted check shown as passed?
- `evidence-only-linked` Does `evidence/` hold only the page and the details it links to?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on documentation

Evidence is attached to the relevant work. It distinguishes build, unit test,
API/integration test, and E2E/test-browser evidence (the captured artifacts from the Testing
capabilities live under the work's `evidence/`).

### Earlier checks

- Is evidence attached to the relevant work, distinguishing build / unit / API-integration /
  E2E evidence?
  · evidence: work `evidence/` + the Evidence Package (`evidence/README.md`)
  · when: static

## Impact on evidence

- When invoked, `mde verify` writes the executable checks and details it supports. The Strategy determines whether an Evidence Package is required; do not claim it proves Target Checks the tool did not assess.
- A check that did not run is missing, not passed; a failed or missing check is never presented as passed. Leave out a row that does not apply (no UI, no deployment) rather than showing it as missing.
- Details are tool output (test runner reports, logs, screenshots, coverage reports) or tables derived from it. Do not add files the page does not link to.
- When the verified scope changes, an existing verdict no longer covers it. The page identifies the Goal and revision or working-tree state it assessed; only this page carries provenance.
- A release under the Controlled Strategy needs a current page showing every applicable check passed or waived, with blocking findings fixed or explicitly accepted by the user.
