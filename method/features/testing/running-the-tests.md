---
type: feature
kind: build
id: testing-running-the-tests
title: Running the tests
origin: mde
impacts:
  - testing
---

# Running the tests

## Purpose

The "Running the tests" rules of the testing Target that no other Feature supplies.

## Impact on testing

- Record the command for each test category and for the complete suite, with any setup such as a database, in the technology Specs, so a person or an AI can run them without asking. Declare `mde:test` so `mde verify` runs them.
- Run focused tests while building where useful; at the dedicated verification activity run tests for the selected scope, and before a guided release run the complete required suite. A commit may remain unverified.
- A failing, skipped, or missing required test is a [Finding](../../metamodel/work/finding.md): fix it or record it. Never delete, skip, or weaken a test to get a pass.
- After each `mde verify`, read the Evidence Package's counts: every item below its Want (pages built or tested, page operations, code exercised, diagrams, decisions audited, guides) is work. Close the gap the item's report lists, or delay it in `work/targets.json` (a record for it, `delayed`, with a reason); never lower a Want.

## Verify

- `commands-recorded` Are test commands recorded and `mde:test` declared, with scoped tests run for the verification activity and the full required suite before guided release?
