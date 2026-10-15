---
type: concept-type
title: Evidence Package
description: The one page a reviewer reads to judge the application: what was checked, the result, and where the details are.
icon: 🗂️
---

# Evidence Package

`evidence/README.md`: the page a reviewer reads instead of the code. It says what was checked, the result of each item, what each item proves, and what is still open, and links to the details. Everything else in `evidence/` is the detail it links to. `mde verify` writes it whole on every run, never in part, together with `evidence/package.json`, the same package as data, which the Workbench shows as the Evidence dashboard.

## Outline, Want, and Have

The page is not shaped by a run. Its outline exists from the moment the Goal is set, and a run only fills it in ([Goal](../work/goal.md#the-contract-goal-strategy-specs-implementation)):

- **The outline: what must be proven.** The Targets that apply to the Goal: the architecture's candidates (`specs/architecture/overview.md`), kept by the Goal's Strategy by its logic and their `needs`, each in progress once its work is started, and due (graded) once completed ([Work Targets](../work/targets.md)). Each Target brings its boxes: its *Verify* Checks, its *Audit* concerns, and the measured items of this page that belong to it. The Target names those items in its `## Evidence` table, each with its id, its title, what it proves, and the condition it needs (a database, a user interface); the tools measure an item by its id and take its words and its Target from there, never from their own code.
- **The Want: how many.** Counted from the Specs, within the Goal's scope: its capabilities' requirements, use cases, operations, pages, diagrams, and applied Features. It grows as the Specs are written, with no run.
- **The Have: how many are done.** Measured by `mde verify`: its results are the items of `evidence/package.json`, one per box, by the box's id.

The Workbench builds the page whenever it opens: the outline and the Wants from the Targets, the Goal, and the Specs as they are now, each box filled from the latest result for it. `mde verify` writes the same page as `README.md`, at the time of its run.

A box is in one of these states:

| State | Meaning | In the verdict |
|---|---|---|
| out of scope | outside the Goal's capabilities, outside the slice the work's records name, or delayed (shown with the delay's reason) | no |
| not applicable | the application does not meet a condition it needs (a Target's or a Check's `needs`), shown with why | no, and never as passed |
| later | its Target's stage has not been reached | no |
| in progress | its Target's work is started but not completed (a record `started`, not `completed`); the latest result is shown | no |
| pending (not run) | due, and no run has measured it yet | as not passed |
| passed, partial, failed, present, missing | its latest result | yes |
| waived | the user accepted it as it is ([Strategy](../work/strategy.md#waivers)), shown with the reason | not as a shortfall, and never as passed |
| out of date | measured, but files it depends on changed since | as not passed |

**Every Target of the architecture is on the page.** Each is due (completed), in progress, or later, with its dates (completed, verified, audited; *not verified since* or *not audited since* when one is older than the completion), or, when the Goal's Strategy does not keep it or the Goal leaves it out, named *not part of this strategy*, with no boxes. Nothing else drops one: its `needs` are the architecture's choice (persistence chooses a database), so they hold before any code exists, and the boxes that need them are wanted. `needs` leave out only a Target the architecture does not list, when there is no architecture yet. The verdict covers only what is due within the Goal's scope and the scopes its records name: a slice can pass while the rest of the application is out of scope or in progress, and the page says which. An application with no `work/targets.json` has no records: each Target whose stage is reached is due. Under a Strategy whose `verification` is `optional` (Prototype), the boxes are information, never a gate.

### Each Check, on its own

Beside its measured boxes, each Target kept reports its *Verify* Checks one by one, as claims (`targets/catalogue.json` `checks`, each with its id `<feature>/<promise>` as `targets/verification/<target>.md` shows it). A Check is:

- **passed or failed** as the `mde verify` rows it names (a Check reading "(`mde verify`, Schema row …)" is measured by Schema), with that row's report as its witness;
- **passed or failed** by the scenarios tagged `@feature:<feature>/<promise>` (the retired `@check:<feature>.<n>` proves nothing): passed when they all passed in the last test report, failed when one failed, the scenarios being its witness;
- **not applicable**, when the application does not meet a condition the Check states first ("With a database: …");
- **waived**, when the user waived it;
- otherwise **not run**: no row measures it and no scenario proves it. A not-run Check keeps the Evidence from passing; it is never reported as passed, and a count of tagged scenarios is no substitute for it.

Each claim carries its state, the Target and scope it belongs to, the run (commit and time of the package), and its witness.

### Each optional Feature, on each object

The optional Features the application applies are reported the same way, under the Features item: for each application (a Feature on an entity, an operation, or the application), each of its promises is passed, failed, or not run, by the scenarios tagged `@feature:<id>/<promise>` that perform an operation of that object. "optimistic-concurrency on ServiceRequest: 3 of 3 promises proven; on WorkOrder: 1 of 3" is two applications, one short. A promise proven on one object proves nothing for another.

## Content

1. **Verdict** — one line: passed, partial, or failed, and whether it is release-ready.
2. **Provenance** — one line: when it was produced, at which commit (and whether there were uncommitted changes), and by what (`mde verify`, or the agent for a run `mde verify` cannot do yet). Only this page carries provenance; the details it links to do not.
3. **Items, by group** — each with its status, its result in a few words, what it proves in one plain sentence, and a link to its report:

   | Group | Items, and the report each links to |
   |---|---|
   | Build and tests | Build: the parts it built (from `tests/raw/build.json`) and its log; Tests, the `mde:test` run: the tests each suite ran, passed and failed (from `tests/raw/<suite>.json`), with `tests/mde-test.md` and its log; each suite's [Test Report](test-report.md) (`tests/api.md`, `tests/e2e.md`) |
   | Built and tested | with a database, Storage tested (each entity's writes read back from the database itself by a passing test: *1 of 6 entities*), Migrations (the last migration run, from `tests/logs/migrate.log`: passed, and its log holding that run only) and Seed data (the entities of the Specs in the Goal's scope that the last seed loaded rows for, as the application reports in `built/seed.json`: *19 of 19 entities seeded*); [Coverage](coverage.md): API built, API tested, Backend exercised (`coverage/api.md`); with a user interface, Page set (the pages the application should have, recorded in `specs/design/page-set.md`); Pages built (a page whose code reaches the MDE runtime is not built on the real API, whatever the inventory says), Specs on pages, Pages tested, Operations tested through pages, Frontend exercised (`coverage/pages.md`); with a user interface, Screenshots: the browser scenarios that left a screenshot of each step (`tests/screenshots/`) |
   | Conformance | with a user interface, Server source: `.env`'s `SERVER_SOURCE`, and whether the frontend's code calls the MDE runtime (with the application's own backend it must be `api`, with no such call); and the checks of `mde verify`, each with its report in `checks/`: Design (the capability designs use only catalog terms), Features (each applied Feature known and allowed where it is applied, implemented once, and every promise proven by passing scenarios on each object that applies it: `checks/features.md`; [Feature](../feature.md#promises-and-checks)), Scenarios (every use case and business rule proven), Use cases (more than one operation each; authorization derived from them), Schema (entities, their storage design, and the migrated database agree), Reuse (no repeated code), Documentation (the guides in the App area's `docs/` folder, [Documentation](../documentation.md)), Diagrams (the diagrams the Method requires of these Specs, delivered, and those rendered from DOT current) |
   | Audit | what a second agent judged: the [Architecture Audit](architecture-audit.md) (`audit/architecture.md`), counted by the decisions it covers; and each [Audit Report](audit-report.md) (`audit/<target>.md`), counted from its summary line |

   Each item states its **count**: what is wanted, what there is, and the share, as *Have of Want unit (p%)*: "146 of 146 requirements (100%)", "12 of 30 diagrams (40%)", "0 of 31 decisions audited (0%)", "11 of 12 concerns genuine (92%)", "0 of 3 guides (0%)", and for code exercised "2% of its lines (want 80%)". What is wanted comes from the Specs and the Method, never from what the application happens to have: the requirements of the Specs; the Specs' entities, operations and use cases on the pages the application reports; the diagrams the Method requires; each architecture decision (each leaf section of `specs/architecture/`); the guides that apply (a user guide when there is a user interface, an admin guide when there are roles, an operations guide when the architecture states a deployment). The report the item links lists the details, so the application agent can close each gap.

   Status is one of passed, partial, failed, present (exists, but not judged by a tool), skipped, or missing. A failed check names its first problem.

   **The verdict counts every item due, and every Check due.** It is **Failed** when a check, an item, or a Check failed; **Partial** when any item is partial, missing, or pending, a Check is not run, or a blocking finding is open; a waived item or Check is neither; **Passed** only when nothing is short of what is wanted. Some shortfalls are failures, not shortfalls: with a user interface, no page inventory, or no page or page operation tested in the browser, or no browser scenario with screenshots; with a database, no entity's storage checked against it. The summary names each failed item and each one short of what is wanted.
4. **Open findings** — the open [Findings](../work/finding.md), blocking first, each linked to its entry in `work/current/findings.md`, and a line naming the resolved ones awaiting the user's acceptance.

## As data

**Written whole, fingerprinted.** `mde verify` writes this page and `package.json` together, never in part, and stamps `package.json` with the tools' version (`toolsVersion`, also in the page's `produced-by`) and a `fingerprint` of both. Never write or edit them by hand, and never as an agent: run `mde verify`. A package changed after the run wrote it, or with no fingerprint, is refused: the Workbench's Evidence dashboard shows none of its results and says why.

The Workbench reads the results from `package.json` by item id and places them in the outline it builds; an item for a box the outline no longer has (a Target dropped, a Check removed) is not shown.

`evidence/package.json` holds the same content: `verdict`, `summary`, `producedAt`, `commit`, `dirty`, the `groups` with their `items` (`id`, `title`, `proves`, `status`, `detail`, `report`, `log`, paths relative to the project), and the `findings`. Tools read it; people read the README or the Workbench's dashboard.

Its rules and checks are in the [evidence](../../targets/app/evidence.md) Target.
