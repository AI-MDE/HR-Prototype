---
type: feature
kind: build
id: code-coverage-matrix
title: Implementation coverage matrix
origin: mde
impacts:
  - evidence
default: n/a
---

# Implementation coverage matrix

## Purpose

Show which required operations are realized at applicable application surfaces, separately from execution/test coverage.

## Applicability

Applies to documentation and evidence relevant to the requested scope. Durable application meaning belongs in Specs; execution findings and evidence belong in Work or configured reports.

## Verify

- `coverage-instrumented` Is code coverage instrumented for real, with the instrumented runs named, the matrix rows from the Specs, and exclusions listed?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on documentation

Derive rows from required operations in Specs and columns from the selected Architecture. Mark each applicable cell implemented, missing, excluded or not applicable with references. Not every operation requires UI, API, Service, Repository and DB cells. Selected tracing mechanisms support discovery; markers alone do not prove execution.

### Earlier checks

- Are rows derived from Specs rather than only implemented code?
- Are required surfaces based on the actual Architecture?
- Are missing and not-applicable cells distinguished, with evidence references?

## Impact on evidence

- The application writes its implementation map, the inventory of what is built, `evidence/built/inventory.json`, from its own code on every build or test run: for each requirement (`use-case:<name>`, `rule:<slug>`, `operation:<Entity>.<operation>`, `term:<id>`) and each layer of its Architecture, the files that build it; and its **page inventory** (`pages`): every page it generated, each with its name, its `kind` (`list`, `detail`, `wizard`, or another), its `abe` or `useCase`, its file, its data source (`api`, or `runtime` when it still reads the MDE runtime), found from what its code actually calls, never written as a constant, the entities it shows, and the operations its controls perform. Since pages are not designed one by one, the inventory is how the evidence knows what was generated, against what the UI conventions want. Derive it from what the code declares (the model, the routes, the rule registry, the router and pages), never write it by hand; `mde verify` renders it in [Coverage](../../metamodel/evidence/coverage.md), for the API and for the pages.
- Rows come from the Specs, columns from the Architecture, never only from the code that happens to exist. A requirement the map does not place is not built, as far as the evidence shows.
- A not-built requirement is a [Finding](../../metamodel/work/finding.md) against the application; a built but untested one ([Coverage](../../metamodel/evidence/coverage.md)) is a Finding against the tests.
- Percentages of code run come from real instrumentation, never estimates, and belong to Test Coverage: say which runs were instrumented, and list excluded and unmeasured files, so a high number cannot hide unmeasured areas.
- Code coverage measures what was built and executed, not whether it is correct; test coverage answers whether the requirements are proven.
