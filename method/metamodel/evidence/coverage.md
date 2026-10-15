---
type: concept-type
title: Coverage
description: Is it built, and is it tested? For the API and for the pages, each requirement tested, built but not tested, deferred to a later slice, or missed.
icon: 🧾
---

# Coverage

Coverage answers two questions a reviewer asks of each surface of the application: **is it built, and is it tested?** `mde verify` generates one page per surface, from the Specs, the current work's scope, the application's implementation map, the test reports, and the instrumented runs; never written by hand. The [Evidence Package](evidence-package.md) shows each as one item, leading with what is done.

## Each requirement, in one of four states

| State | Meaning |
|---|---|
| ✅ Tested | Built, and proven by passing tests. A requirement a passing test proves is built. |
| ⚠️ Built, not tested | The code exists (the implementation map says where), but no passing test proves it: a gap in the tests. |
| 🗓️ Deferred | Not built, and the current work's scope defers it to a later slice, with a reason. Intentional. |
| ❌ Missed | Not built, and in scope: a gap in the application, and a [Finding](../work/finding.md). |

Tests failing on a requirement are shown as such. What is deferred comes only from the work's records ([`work/targets.json`](../work/targets.md): outside the slice they name, or `delayed`); without either, everything the Specs state in the Goal's scope is in scope, and nothing is deferred.

## API — `evidence/coverage/api.md`

Everything the server realizes, from the Specs: each entity operation, each use case, each business rule of the requirements, each Feature applied. A scenario proves a use case, rule or Feature by its tag (`@<use-case>`, `@rule:<rule>`, `@feature:<id>/<promise>`; the retired `@term:<id>` proves nothing), and an operation by its operation tag (`@<entity>.<operation>`) on a scenario through the API; with `@refusal`, it proves the operation refused to a role. Only tags are read, never the wording of the steps. A transition marked provisional in its entity's spec has no operation yet, and no row. The item reads, for example: *87 of 87 operations tested (100%), on 19 entities in 4 capabilities · 15 of 15 use cases · 12 of 12 rules · 32 of 32 Features · backend code exercised 98%*.

## Pages — `evidence/coverage/pages.md`

Pages are not designed one by one, so the application **reports the pages it generated**: its **page inventory**, the `pages` of its implementation map (below), generated from its router and pages, each page with the entities, operations and use cases it covers. What the Specs want is that **their entities, operations and use cases are on pages, and tested there**:

- **Pages built:** of the pages reported, those whose file exists and that read the real API (not a prototype data source).
- **Specs on pages:** the entities, operations and use cases of the Specs that a built page covers, out of all of them; one the inventory does not place on a built page is missing.
- **Pages tested:** of the pages reported, those a passing end-to-end scenario (tagged `@e2e`) names (`@page:<page>`), with a screenshot after each step.
- **Operations tested through pages:** of the Specs' operations, those a passing end-to-end scenario performs through a page; a use case is walked when such a scenario, tagged with it, passes.

The items read as counts, for example *Pages built: 16 of 16 pages on the real API (100%)*, *Specs on pages: 19 of 19 entities · 87 of 87 operations · 15 of 15 use cases*, *Operations tested through pages: 80 of 87 operations (92%)*, *Frontend exercised: 84% of its lines (want 80%)*; the report lists each page, entity, operation, and use case. Until the application reports its pages, these read "not reported by the application": nothing is assumed on a page.

## The application's implementation map

`evidence/built/inventory.json`, written by the application from its own code (its model, routes, rule registry, pages), never by hand ([code-coverage-matrix](../../features/documentation/code-coverage-matrix.md)):

```json
{
  "requirements": {
    "operation:ServiceRequest.submit": { "api": ["app/backend/src/engine/routes.ts"], "service": ["app/backend/src/engine/operations.ts"] },
    "rule:each-technician-holds-every-required-skill": { "rule": ["app/backend/src/rules/technicians-qualify.ts"] }
  },
  "pages": [
    { "page": "Service request detail", "kind": "detail", "abe": "service-request", "file": "app/frontend/src/pages/ServiceRequestDetail.jsx",
      "dataSource": "api", "capability": "service-request-management",
      "entities": ["ServiceRequest", "WorkEffort", "TimeEntry"], "operations": ["ServiceRequest.submit", "ServiceRequest.accept", "WorkEffort.create"] },
    { "page": "Log service request", "kind": "wizard", "useCase": "log-service-request", "file": "app/frontend/src/wizards/LogServiceRequest.jsx",
      "dataSource": "api", "entities": ["ServiceRequest"], "operations": ["ServiceRequest.create", "ServiceRequest.submit"] }
  ]
}
```

Requirement keys are `use-case:<use case file name>`, `rule:<rule, as its slug>`, `operation:<Entity>.<operation>`, and `feature:<id>` (the retired `term:<id>` defers nothing); layers are named by the Architecture.

The **page inventory** lists every page the application generated: its name (as end-to-end steps name it), its `kind` (`list`, `detail`, `wizard`, `dashboard`, …), its `abe` or `useCase` when it has one, its file, its `dataSource` (`api`, or the substitute it still reads, `prototype`), the `entities` it shows, the `operations` its controls perform, and the `useCases` it serves. The UI conventions ([architecture/ui.md](../../architecture/ui.md)) say what to generate; the inventory says what was generated.

## Code exercised by the tests

Each page ends with the code its tests exercised: the backend's on the API page, the frontend's on the pages page. Lines and branches, per file, against the threshold. A line counts as exercised when an instrumented test run executed it; exercised code is not proven right, but code no test reaches is not tested at all.

Each instrumented run leaves its coverage tool's output in its own folder under `evidence/coverage/raw/` (`raw/backend/`, `raw/frontend/`), replacing that run's previous output: an Istanbul `coverage-summary.json`, as c8 and Vitest write it, the tool's HTML report beside it, and a `run.json` naming the run, the tool, the part (`layer`), and each excluded path with why:

```json
{ "run": "Backend scenarios: Cucumber, with the backend in-process", "tool": "c8 (V8 coverage)", "layer": "backend",
  "excluded": [{ "path": "app/backend/src/generated/**", "reason": "generated from the Specs" }] }
```

A run against a separate, uninstrumented process does not count. The threshold is `coverage.threshold` in `mde.json`, 80% when the project sets none.

Its rules and checks are in the [evidence](../../targets/app/evidence.md) Target.
