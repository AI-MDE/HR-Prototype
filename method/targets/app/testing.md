---
type: target
id: testing
title: Testing
applies_when:
  - the work implements or changes behavior: a use case, business rule, entity operation, page, or integration
  - the work writes or changes tests or the test harness
stage: testing
---

# Testing

<!-- COMPILED by compile-targets.mjs from features. Skeleton (Purpose +
     applies_when) is authored; the sections below are composed from the
     contributing features, each tagged [feature: <id>]. Do not hand-edit
     the composed sections — edit the feature and recompile. -->

## Purpose

What good tests look like, and how to check them: tests prove behavior, not just that files exist or the application builds. Their results are evidence, governed by the [evidence](evidence.md) Target.

It governs: The test suites, their scenarios and adapters, and their captured output.

## Outputs

| Output | Where | When |
|---|---|---|
| Behavioral scenarios (use cases, business rules, acceptance) | `tests/` (for example `tests/use-cases/`, `tests/business-rules/`), with their step adapters | per use case and business rule |
| API tests | `tests/api/` | per capability with an API |
| UI tests | `tests/ui/` | per capability with a user interface |
| Unit tests | the unit runner's location | for isolated internal behavior |
| Test reports, logs, screenshots | `evidence/tests/` | per run |
| Coverage | `evidence/coverage/` | when coverage is measured |

## Evidence

The rows of the Evidence Package this Target owns: what `mde verify` measures and reports for it, each by its id. Tools take a row's title and what it proves from here.

| Row | Title | Proves | Needs |
|---|---|---|---|
| tests | Tests | The application's own test suites pass (mde:test). | — |
| api-tested | API tested | Each of those is proven by passing tests through the API. | — |
| backend-exercised | Backend exercised | The share of the backend's code the tests ran. | — |
| pages-tested | Pages tested | Each page is used by passing end-to-end tests in the browser, with a screenshot after every step. | ui |
| page-operations | Operations tested through pages | Every operation of the Specs is performed through a page by a passing end-to-end test. | ui |
| screenshots | Screenshots | Every end-to-end scenario left a screenshot of each step, so its run can be read screen by screen. | ui |
| frontend-exercised | Frontend exercised | The share of the frontend's code the tests ran. | ui |
| scenarios | Scenarios | Every use case and business rule is proven by a scenario. | — |
| suite | Test suite | Scenario by scenario: what ran, and the result. | per-suite |

## Baseline

What an application built under this Target must prove, wherever the Target applies. The baseline is defined here once; a Strategy decides when it is verified and whether a shortfall blocks, never what it is. Each obligation applies when its condition holds, and the condition is a fact of the application, not a choice made to lower the bar. A manual check or a smoke test stands in for none of them.

| Obligation | Applies when | What it takes |
|---|---|---|
| **Behavior** | always | Every entity operation, use case, and business rule in scope has a passing scenario, tagged with what it proves; every business rule a scenario where it holds and one where it is refused; and every relevant refusal (authorization, a stale version, an invalid state). |
| **API** | the application has an API | Those scenarios run through the API, against the running application. |
| **UI** | the application has an interactive user interface | Every operation a page offers is performed by a passing end-to-end scenario in a real browser, against the real backend and database, and every use case with a screen is walked through its main flow. Every step leaves a screenshot, and the suite's report shows them. A page, or a page operation, that no passing browser scenario performed is untested, whatever else proves it. The page inventory (`evidence/built/inventory.json`) reports every page generated, with the entities, operations, and use cases each covers. |
| **Persistence** | the application has durable storage | Every entity's create, update, and delete is followed, in a passing scenario, by a check of what was stored, read from the database itself (a scenario tagged `@storage`), and a refused write is checked not stored. |
| **Security and concurrency** | the Specs or the design name them (roles, authorization, versions, locks) | Each obligation they name has a scenario, including its refusal. |
| **Coverage** | the code can be instrumented | Backend and frontend runs are instrumented, and the share of code exercised is reported against the project's threshold: 80% of lines unless `mde.json` `coverage.threshold` sets another. A percentage is reported, never taken as proof of behavior. |
| **Artifacts** | always | The diagrams the Method requires of these Specs (architecture, interaction, and navigation included), the inventories, and the schema are delivered and current. |

An obligation whose condition does not hold is **not applicable**, said so with why; it is never counted as passed. Relaxing an obligation that applies, or making it conditional where it was not, is a decision the user records, not a quiet downgrade. Beyond the baseline, test what the risk calls for. `mde verify` measures each obligation; anything short of it keeps the Evidence from passing, and a page or a database left untested fails it.

## Composed behavior

### Captured command output  `[feature: captured-command-output]`

- Every executable check (install, build, typecheck, tests, coverage, migrate, seed) saves its real output under `evidence/tests/logs/` (`install.log`, `build.log`, `typecheck.log`, `test.log` with a machine-readable report, `migrate.log`, `seed.log`), referenced from the Evidence Package. A check claimed passed with no captured output does not count. Each run replaces its logs: no earlier run's or abandoned attempt's logs are kept beside the current ones (Git keeps the history).
- Logs are UTF-8 without a byte-order mark. A plain PowerShell redirect or `Out-File` writes UTF-16 with a BOM, which reads as binary; use `Out-File -Encoding utf8`, a shell that writes UTF-8, or let the runner write the file. A UTF-16 log is a defect even when its content is right.
- Every suite that drives the running application (API, UI, business rules) also captures the application's own log: it sets `LOG_PATH` to a suite-specific file next to its report (for example `evidence/tests/ui/run.log`). The runner's output proves the assertions passed; only the application's log proves the server-side path ran. Each mutating or search scenario's captured log must show the request it claims (and, for a write, its transaction); a silent log for a claimed operation is a defect.

### Measured code coverage  `[feature: coverage-threshold]`

- **Code coverage is always measured** for an application this stage builds, backend and frontend, in every Strategy. The threshold is 80% of lines unless the project sets another explicitly (`mde.json` `coverage.threshold`), and a part below it keeps the Evidence from passing. Instrument the relevant suites and layers, including integration and UI runs where the stack allows, combine measurements correctly, and name what could not be measured. Values come from real instrumentation, never made-up summaries; behavioral coverage is a separate obligation from the line percentage.

### End-to-end tests with screenshots  `[feature: end-to-end-tests]`

- **Every page operation must be tested in the browser, with screenshots.** Every operation a page offers (create, edit, delete, each lifecycle operation, each use-case action) is performed by a passing end-to-end scenario in a real browser, against the real backend and database, and its outcome asserted on the screen and after a reload. Every use case with a screen is walked through its main flow. Every step leaves a screenshot. A page, or a page operation, that no passing browser scenario performed is untested, whatever API scenario proves the same operation; `mde verify` fails Pages tested and Operations tested through pages when none is, and keeps them partial until all are.
- **The real application, end to end.** Run against the application started the way `mde:start` starts it: its frontend, its backend, and its own end-to-end database, migrated and emptied before each scenario. Every page calls the application's API for every entity it shows or changes. A page that still reads from a prototype runtime or a substitute data source fails its scenario; it is a gap to report, never a reason to point the test at the substitute.
- **The same language.** End-to-end scenarios are Gherkin in the same common phrases as the API scenarios ([readable test data](../../features/testing/readable-test-data.md)), tagged `@e2e`, with the use case they walk through, each page they use (`@page:<page>`), and each operation they perform through it (`@<entity>.<operation>`), so [Coverage](../../metamodel/evidence/coverage.md) counts the pages used and the page operations performed. Records are created from tables and named by label. UI phrases (signed in, opens a page, fills in, presses, performs an operation, the page shows, a section or a row found by its accessible name or its data, never its position) are generic and implemented once with the browser tool for every page, never per page.
- **A use case is walked, not clicked at.** Each use case with a screen has at least one scenario that performs its main flow as its actor, through the controls a person uses (stable selectors from accessible names), and asserts the outcome the user sees and that persists: after a reload, or in another list. Each [required operation a page renders](../../features/testing/required-operation-ui-coverage.md) is performed by some scenario.
- **Signed in as the actor.** The scenario signs in, or selects the role through the development login, as the use case's actor; a refused operation is shown refused to a role that may not do it.
- **Screenshots of every step that changes the screen.** After each When step, and at the end of the scenario, pass or fail, and at the point of failure, capture the full page under `evidence/tests/screenshots/e2e/<feature>/<scenario>/NN-<step>.png`, numbered in order. A missing capture is reported. Never substitute a stale or generated image. Data is fictional.
- **Instrumented.** Run the frontend instrumented, and the backend too where it runs under the test's control, leaving the coverage summary in `evidence/coverage/raw/frontend/` with its `run.json`, so the pages' code exercised is measured by what these scenarios executed ([coverage-threshold](../../features/testing/coverage-threshold.md)).
- **One command.** Declare `mde:e2e` (and run it from `mde:test`) so `mde verify` runs it. It starts and stops what it needs, and never stops a process it did not start.

### Behavior scenario traceability  `[feature: gherkin-traceability]`

- Write use-case, business-rule, and acceptance scenarios as readable Gherkin `.feature` files run by Cucumber, unless the project adopted an equivalent (recorded, with equivalent evidence). Tag each scenario with the spec it proves (for example `@assign-employee-to-project`, `@allocation-cap`), and a scenario that performs an entity operation with that operation (`@employee.create`), so test coverage can be derived from the reports and `mde verify` can tie each operation a page offers to its scenario.

- The same operation set that has endpoints ([API](../../features/api/capability-api-boundary.md)) has scenarios.

### Readable test data  `[feature: readable-test-data]`

- Write scenarios and their data as Gherkin with tables. Records are created and checked through tables (`Given these Customers exist:`, a column per attribute), and named by their display labels ("Apex Cranes", "LT-1001"), never by ids; a reference to another record is its label.
- Write steps in common phrases: a few plain, generic patterns used the same way across the application (records created from a table, an operation performed as a role, the outcome or the refusal checked), each implemented once and driven by the entity model, so one implementation serves every entity. There is no list of allowed phrases to follow or check; never a synonym for a phrase already in use, and never a step definition for one entity or one page.
- Share data instead of copying it: records several features need are a shared background, not a table repeated in each file.
- Tag each scenario with what it proves: the use case (`@log-service-request`), each entity operation it performs (`@service-request.submit`), with `@refusal` when it proves that operation refused, for a business rule, its id (`@rule:team-membership`), each Feature promise it proves, with the operation it proves it on (`@feature:optimistic-concurrency/stale-rejected`), and each build Feature Check it proves that no `mde verify` row measures, by the id `targets/verification/<target>.md` shows (`@feature:end-to-end-tests/use-cases-walked`). The retired tags (`@term:<id>`, `@check:<feature>.<n>`) prove nothing; `mde migrate-features` converts an application that still uses it. A scenario that reads what was stored back from the database is also tagged `@storage`; an end-to-end scenario is tagged `@e2e` and names each page it uses (`@page:<page>`). Coverage and `mde verify` read only the tags, never the wording of the steps.
- Prove each business rule both ways: a scenario where it holds, and one where it is broken and refused, the refusal naming the rule's id (`error.rule`); with its boundaries where it has them.
- **Check every write in the database itself.** When the application has a database, every entity's create, update, and delete is followed, in a passing scenario, by a check of what was stored, read from the database (a scenario tagged `@storage`, with the entity's operation tags), not only from the API's answer. An entity whose writes no scenario reads back from the database is not proven stored; `mde verify` fails the Storage tested row when none is, and keeps it partial until every entity is. (The Schema row is the Specs against the database, and says nothing about tests.)

### Required-operation UI coverage (§7)  `[feature: required-operation-ui-coverage]`

- Every role-permitted entity operation a page renders has a UI scenario that performs it through the running application. Coverage is measured against the required operations (the entity's operations, filtered to what the role may do), not what the UI happens to show; a rendered operation with no performing test is a gap.
- UI tests drive a real browser (Playwright, Selenium, Cypress, or the stack's equivalent): navigate to the running application, sign in or select the role, use real controls through stable selectors, perform the operation end to end, and assert the outcome. A suite whose steps read source files, match strings in generated code, or change local variables is not a UI test, however green Cucumber reports it.
- Assert behavior, not presence. For a mutating operation, complete the round trip and assert an observable outcome: a created record is retrievable (in the list, or after a reload), an update persists, a search returns the seeded record. Asserting only that a control is visible is a defect: it passes even when Save is wired to the wrong record.

### Verification check classification  `[feature: static-vs-executable-classification]`

Classify each check by the evidence it needs: inspecting an artifact, running something, needing an environment, or the judgment of a second agent (an audit). Repair routine setup within scope. A check that cannot run is recorded as blocked or unexecuted, with its cause and the next action; inspecting the code is no substitute for running it. Unexecuted checks are always distinguished from passed ones; the Strategy decides whether they block.

### Test request correlation  `[feature: test-correlation-id]`

- When cross-boundary evidence is needed, correlate test requests with the application's execution (a scenario or run id carried with the request and logged). Correlation values are sanitized, never let test metadata bypass validation, authorization, or production controls, and are never a substitute for asserting the effect.

### Test scenarios  `[feature: test-scenarios]`

- Derive scenarios from the requirements and design, not from the code. Each records its fixtures, actor and context, actions, expected outcome, and assertions; it covers the relevant normal, boundary, and failure cases, and its fixtures reset controlled fictional data repeatably and isolate it.

- A business rule needs satisfying and violating cases, including boundaries, and its rejection asserts on the rule's id in the structured error ([API](../../features/api/business-rule-responses.md)), not a generic status. Rules may be exercised through use cases or a dedicated suite; do not require duplicates.

### Test style by layer  `[feature: test-style-by-layer]`

Use the unit runner for isolated internal behavior; executable behavioral scenarios for use cases, business rules, and acceptance; integration tests for real boundaries; UI tests for interactions that need a browser. Reuse scenario data across layers, and do not prove the same thing twice without purpose.

### Running the tests  `[feature: testing-running-the-tests]`

- Record the command for each test category and for the complete suite, with any setup such as a database, in the technology Specs, so a person or an AI can run them without asking. Declare `mde:test` so `mde verify` runs them.
- Run focused tests while building where useful; at the dedicated verification activity run tests for the selected scope, and before a guided release run the complete required suite. A commit may remain unverified.
- A failing, skipped, or missing required test is a [Finding](../../metamodel/work/finding.md): fix it or record it. Never delete, skip, or weaken a test to get a pass.
- After each `mde verify`, read the Evidence Package's counts: every item below its Want (pages built or tested, page operations, code exercised, diagrams, decisions audited, guides) is work. Close the gap the item's report lists, or delay it in `work/targets.json` (a record for it, `delayed`, with a reason); never lower a Want.

### UI execution screenshots  `[feature: ui-screenshots]`

- Capture a screenshot at the end of each UI scenario, pass or fail, and at the point of failure, from the actual run, under `evidence/tests/screenshots/` with the scenario and run in the filename. A missing capture is reported; never substitute a stale or generated image. Use fictional data and protect sensitive values in screenshots.

### Use-case execution evidence and report  `[feature: use-case-execution-report]`

- Reports come from the real current run: scenario, the obligation it proves, layer, inputs, expected and actual results, assertions, and evidence references, with pass, fail, and not-executed counted separately. Use the runner's machine and human reports, or a designed aggregation; failed runs are reported too.
- Produce a Cucumber HTML report per category under `evidence/tests/`.

### Behavior test adapters  `[feature: use-case-step-adapter]`

- Steps drive the real operations or UI with scenario-visible data and assert effects. Missing step adapters are reported as unexecuted tests, never as passing scenario files; the test entry point actually runs every required suite. A scenario that exists but never ran does not count.

## Verify and Audit

The Checks `mde verify` proves for this target compile to `targets/verification/testing.md`; what a second agent judges compiles to `targets/audit/`, under each Feature's first Target.
