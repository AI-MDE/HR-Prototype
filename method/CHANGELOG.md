# MDE Method Changelog

Changes to the Method (`method/`), newest first. The version is in [VERSION.md](VERSION.md). An application's own copy of the Method carries this file, so after `mde update-app` it shows what changed since the application's previous version.

2026-10-14 — 0.3.115 — Changing the Strategy, in any direction.

- **[Changing the Strategy](metamodel/work/strategy.md#changing-the-strategy)**: the user says so in plain words; there is no command. The agent records it in the Goal's front matter and *Strategy* section and in Current Work's link together, and logs it in Status; proposes the Goal's Targets anew (in `work/targets.json`, added ones `{ "*": {} }`, dropped ones `leftOut` with the reason, records of work done kept); and brings the work up to the new rigor. Stricter: from Prototype, Guided's transition assessment; to Controlled, a full verify and an audit of every completed Target not verified or audited since its completion, before the next stage. Looser: nothing redone, the gates relax from now on.
- [Goal](metamodel/work/goal.md#keeping-the-goal-in-step) and the [bootstrap](bootstrap.md) point to it; before, only Prototype to Guided or Controlled was described.

2026-10-14 — 0.3.114 — A faster, shorter loop.

From the agents' last sessions: each `mde verify --target` rebuilt and re-ran every test (about two minutes), agents fixed one item per run (nine rounds for one Target), stopped after each slice, and read the whole CHANGELOG.

- **[How a stage runs](strategy/guided.md#how-a-stage-runs)** and the [bootstrap](bootstrap.md): fix everything a run reports, then verify once more, never one item per run; each failure gets one fix: one marked *same as the last run* is a Finding, never another round. Work in whole pieces (a file written whole, not a fragment per step). Existing code that disagrees with the Method is what changes. Carry the stage through until its Targets are completed or a Question or Finding blocks them; do not stop to report after each piece.
- **What to read** ([bootstrap](bootstrap.md)): every file read is paid for on every later step; never read `method/CHANGELOG.md` whole.
- **[`mde update`](commands/update.md)**: read the entries `mde update-app` prints, or `mde changes` (after the reconciled version), not the whole CHANGELOG.
- **[`mde verify`](commands/verify.md)** in the loop: no rebuild when the sources are unchanged; only the Targets' own suites when declared; repeats marked.
- **[Runtime scripts](features/server/app-runtime-scripts.md)**: optional `mde:test:api`, `mde:test:ui`, `mde:test:unit`, one suite each; no role reinstalls dependencies on its own.
- **For an application:** declare `mde:test:api` and `mde:test:ui` (and `mde:test:unit` when it has unit tests), each running one suite and leaving its raw results as `mde:test` does; drop any reinstall from `mde:build`, `mde:test`, and `mde:start`.

2026-10-13 — 0.3.112 — `work/targets.json` is a record per Target and scope.

- **[Work Targets](metamodel/work/targets.md)** is a log of the work: the first level is the Target, the second a scope of its work (`*` for the whole Goal, a capability for a slice, or one requirement such as `use-case:<name>` or `page:<name>`), and the value that scope's record: `started`, `completed`, `verified`, `audited` (dates), `waived`, `delayed` (until when, and why), or `leftOut` (on `*`). No more `targets`, `leftOut`, `scope`, and `slices` at the top, nor a slice's `stage`: a Target is **later** until a record is started, **in progress** while one is started and not completed (what `mde verify --current` checks), and **completed** when every started record is; stale when its `verified` or `audited` is older than its `completed`. `delayed` replaces `deferred`; waivers sit on the Target's record.
- **The Goal's scope goes back to `work/goal.md`**'s front matter (`scope: capabilities: [...]`), [Goal](metamodel/work/goal.md).
- The agent sets `started` as a Target's work on a scope begins, and `completed` when it is done and passes: [bootstrap](bootstrap.md), [How a stage runs](strategy/guided.md#how-a-stage-runs), [`mde proceed`](commands/proceed.md) (a new slice is a new record; no stage to move), [Architecture](strategy/stages/architecture.md) (the Goal's Targets listed, `{ "*": {} }` until started). `mde verify` writes `verified`, the audit `audited` ([`mde verify`](commands/verify.md), [`mde audit`](commands/audit.md)).
- Also in [Current Work](metamodel/work/current-work.md), [Strategy](metamodel/work/strategy.md), the [Evidence Package](metamodel/evidence/evidence-package.md), [Coverage](metamodel/evidence/coverage.md), and [running the tests](features/testing/running-the-tests.md).
- **For an application:** `mde update` converts `work/targets.json` from its first shape (or from before the file), moving the Goal's scope back to `work/goal.md`. A Target reached under the old stage is started, not completed: mark it completed when `mde verify --current` passes for it.

2026-10-13 — 0.3.111 — The loop verifies what is in progress, without naming it.

- **`mde verify --current`** is the loop's command, in the [bootstrap](bootstrap.md), [How a stage runs](strategy/guided.md#how-a-stage-runs), every stage page, [Prototype](strategy/prototype.md), [Strategy](metamodel/work/strategy.md), [Work Targets](metamodel/work/targets.md), [`mde verify`](commands/verify.md), and [`mde proceed`](commands/proceed.md): it verifies every Target in progress in the current slice, as `work/targets.json` says (its stage reached, not yet completed), so the agent never names them. `--target <id>` stays, for one Target, completed or not; [`mde update`](commands/update.md) uses it for the Targets a Method change affects.

2026-10-13 — 0.3.110 — Only `mde verify` writes the Evidence.

- **[Bootstrap](bootstrap.md)**, [`mde verify`](commands/verify.md), and the [Evidence Package](metamodel/evidence/evidence-package.md): only `mde verify` writes `evidence/README.md` and `package.json`. The agent never writes or edits them, not even to record what its `--target` runs found: those go in Status. A package `mde verify` did not write as it is (no fingerprint, or edited since) is refused as Evidence. An agent on professional had written its own `package.json` ("produced by: mde verify (agent)"), in a shape the tool never writes.

2026-10-13 — 0.3.109 — `mde update`: the agent updates the Method and brings the application in line.

- **[`mde update`](commands/update.md)**, a command said to the agent: it runs `mde update-app` itself, merges the files the application changed (with MDE's versions saved beside the report), reads the CHANGELOG from the version last reconciled, brings the Specs, App, and Work in line with each change, verifying the affected Targets in the loop, and records in Status the version now reconciled. A change that needs the user is a Question; it never changes the Goal, Strategy, or approved stages on its own. Before, the tool printed a prompt for the user to copy into their AI.
- The [bootstrap](bootstrap.md), the Method [README](README.md), and [Current Work](metamodel/work/current-work.md) name it; the CHANGELOG is read during an update, from the version last reconciled.

2026-10-13 — 0.3.108 — The agent verifies its own work, in every Strategy; it never asks the user to run verify.

- **[Bootstrap](bootstrap.md)**: a rule of its own, *Verify your own work, in every Strategy*: each time a Target's output is produced or changed, the agent runs `mde verify --target <id>` itself, fixes what it reports, and verifies again; it never asks the user to run `mde verify`, or any check, test, or build it can run. Only when its environment cannot run commands does it say so. Its item 5 had told Guided agents to verify "at the activity its Strategy requires" and "not turn every work step into a verification gate", the opposite of the loop; an agent on 0.3.105 asked the user to run verify.
- **"Delayed verification" now means the whole, not the loop:** the [Strategy](metamodel/work/strategy.md)'s `verification` decides when the whole is verified and audited, never whether the agent checks its own work. Said so in [Guided](strategy/guided.md) (its description and body), [Controlled](strategy/controlled.md), [Prototype](strategy/prototype.md) (its Targets are verified in the loop too), the [Testing stage](strategy/stages/testing.md), the [Goal](metamodel/work/goal.md) example, the Method [README](README.md), [`mde verify`](commands/verify.md), and [`mde proceed`](commands/proceed.md).
- **Every stage page** ends with *Verify in the loop*, where the agent reads it during the stage.

2026-10-13 — 0.3.107 — Industry patterns as the catalog now is: common models by subject, patterns that select from them.

- **[Industry patterns](features/business-requirements/industry-patterns.md):** the catalog is a canonical model of common business models organized by subject (`model/subjects/`), and industry patterns that select from it, each naming the *concepts applications typically add*. The agent takes the common concepts a pattern selects from their subject pages (recognizing them by *Also known as* and *In industries*, not copying every industry's attributes), maps a subject to the application's capabilities and its concepts to ABEs, and adds what the business needs beyond the common model in its own Specs, specializing the canonical concept named. A relationship the catalog marks `review` is a question to decide, not a given. The pattern examples name today's patterns (equipment service, crane rental orchestration, professional services); the catalog's own `AGENTS.md` (*Using the catalog*) has the detail.
- **[Domain](metamodel/requirements/domain.md):** its *Industry patterns* section records the common concepts taken, what was added beyond them, and what was left out.

2026-10-12 — 0.3.106 — The Features report is generated; the reuse Feature no longer points at a retired proposal.

- **`scripts/features-report.mjs`**, run by `compile-targets.mjs`: MDE's `docs/features-report.md`, every build Feature by its primary Target with a one-line abstract, the other Targets it impacts, and its Checks, then the optional Features, linked to their files. It was written by hand once, and had gone stale (retired Features listed, every link broken); now it is regenerated with the Targets. It is written only where the Method sits beside MDE's `docs/`, never in an application's copy.
- **[Engineering for reuse](features/server/engineering-for-reuse.md)** no longer refers to `docs/engineering-for-reuse.md`, a proposal built on what the Method has since retired (`implementedBy`, guard rules, the Test Vocabulary); it is archived.

2026-10-12 — 0.3.105 — Each output judged on its own Target; OKF compliance verified; verification in the agent's loop.

- **On the output, not the source.** Code is judged against the architecture on the Target that produced the code. [Conformance](features/architecture/conformance.md) impacts the server, and a new [architecture conformance](features/web-ui/architecture-conformance.md) the web UI: their Audit Reports carry a *Conformance* section, one row per decision the output realizes (where, how checked, conforms or violates), with the code's dependency diagram ([Audit Report](metamodel/evidence/audit-report.md)). The [Architecture Audit](metamodel/evidence/architecture-audit.md) judges each decision as written (resolved, traceable, consistent), never the code, so the architecture can be completed at its own stage. The [Diagrams](features/architecture/diagrams.md) audit judges the diagrams against the decisions; whether the code matches them is the server's and the web UI's.
- **Diagrams by output.** The one Diagrams row is now a row per Target: *Requirements diagrams* (business-requirements), *Architecture diagrams* (architecture), *Navigation diagram* (ui-design, from a new [navigation diagram](features/ui-design/navigation-diagram.md) Feature), *Physical data model* (persistence-design). An architecture is no longer short for a navigation diagram Design has yet to draw.
- **OKF compliance** ([OKF profile](metamodel/okf.md), *Verification*): `mde verify` proves the script part per output, a row each on business-requirements, architecture, and application-design: front matter naming a concept type the Meta-model defines (a folder's `README.md` defines the folder's type), the reserved `index.md` and `log.md`, no sequential identifiers, links that resolve.
- **Generate, verify, fix** ([How a stage runs](strategy/guided.md#how-a-stage-runs), [`mde verify`](commands/verify.md), [`mde proceed`](commands/proceed.md), [Work Targets](metamodel/work/targets.md), [bootstrap](bootstrap.md)): each time a Target's output is produced or changed, the agent verifies that Target (`mde verify --target <id>`), fixes, and verifies again until it passes; the same failure after a fix is a Finding. `completedAt` is set only when the Target passes. The whole verification and the audit stay when the Strategy says.

2026-10-11 — 0.3.104 — The work's Targets in one file, `work/targets.json`, with dates; only completed Targets are graded.

- **[Work Targets](metamodel/work/targets.md)** (new): `work/targets.json` holds the Goal's `targets`, `leftOut` (each with its reason), and `scope`; its `slices` (vertical slices, the last the current one), each with its `scope` (capabilities, use cases), its `stage`, what it `deferred`, and, for each Target, three dates: `completedAt` (the agent, when its work in the slice is done), `verifiedAt` (`mde verify`, when all its evidence passes after completion), `auditedAt` (`mde audit`, when a second agent has judged it); and the user's `waived`. Dates, never statuses: whether a Target passes stays the Evidence's.
- **Phase aware.** A completed Target is graded; one whose stage is reached but not completed is *in progress*, measured and shown, never counted in the verdict; a verification or audit older than the completion is stale (*not verified since*, *not audited since*). [`mde verify`](commands/verify.md) grades only completed Targets; [`mde audit`](commands/audit.md), without a scope, audits the completed Targets whose audit is missing or stale, within the slice's scope; [`mde proceed`](commands/proceed.md) sets `completedAt`, moves the slice's `stage`, says each Target's dates before approval, and adds a slice when the user starts the next. A Target in progress had been graded as failed as soon as its stage was reached (proServices, at Frontend with the Backend begun but not done).
- **Moved:** [Goal](metamodel/work/goal.md) front matter keeps only `strategy` (its `targets`, `leftOut`, `scope` are in `work/targets.json`); [Current Work](metamodel/work/current-work.md) no longer has `stage`; `work/current/scope.json` (deferrals and waivers) is retired. [Strategy](metamodel/work/strategy.md), [Coverage](metamodel/evidence/coverage.md), the [Evidence Package](metamodel/evidence/evidence-package.md) (an *in progress* state), the [bootstrap](bootstrap.md), [Guided](strategy/guided.md), the [architecture stage](strategy/stages/architecture.md), and [running the tests](features/testing/running-the-tests.md) say so. `mde update-app` writes the file from the old places once and removes them.

2026-10-11 — 0.3.103 — Sample data has one place and one shape: `app/data/seed.json`, keyed by entity name.

- **[Meaningful seed data](features/persistence/meaningful-seed-data.md)**, the [application-design](targets/design/application-design.md) Target's outputs, and [Design](metamodel/design/README.md): the sample data is `app/data/seed.json`, an object keyed by entity name exactly as its spec titles it, each a list of records with the entity's attribute names, references by `id`. The runtime and the Workbench's live data read it; the application's own seed loads the same records. Never say the data can be browsed before it is there, in that shape. "The project's sample or seed location" had let an agent write `seed/seed-data.json` keyed `professionals`, `clients`, which nothing reads, and then tell the user to browse it.

2026-10-11 — 0.3.102 — No live data before there is sample data.

- **[Requirements](strategy/stages/requirements.md):** at the end of the stage, the agent points the user to what exists (the Specs, their diagrams, the workflows), never to live data that does not; entities have records only once sample data is written (the Prototype's data step, or the application's seed), which it offers to write if the user wants to see them. An agent had told the user to "try the entities (they have Live data)" at the end of Requirements, with no data.
- **[Entity](metamodel/requirements/entity.md):** the runtime runs an entity from its spec once sample data exists for it.

2026-10-11 — 0.3.101 — A check is never met by its shape alone.

- **The rule** ([bootstrap](bootstrap.md), [`mde verify`](commands/verify.md), [`mde audit`](commands/audit.md)): a placeholder file, a stub, an empty handler, or a diagram of what does not exist passes no check; the audit reports it as fake, and it is a Finding against the work. On proServices, four capability folders each holding one line (`export const capability='…'`) had been added to pass Slices and layers.
- **Slices and layers** (`layers-kept`, [capability vertical slices](features/server/capability-vertical-slices.md)): each capability's folder holds its slice, a route, a service, and a repository, each real code naming the capability's entities.

2026-10-11 — 0.3.100 — `mde audit` audits every Target in scope, not only the architecture.

- **[`mde audit`](commands/audit.md)** says it plainly: the audit covers every Target the Goal keeps whose stage is reached, one Audit Report each (`evidence/audit/<target>.md`), named before starting; the architecture's decisions are one part of it (`evidence/audit/architecture.md`). A Target skipped is reported, never silent. Agents had read it as the architecture audit alone.

2026-10-11 — 0.3.99 — The Evidence Package's rows are defined by the Targets; Schema is the Specs against the database.

- **Each Target has an `## Evidence` table**: the rows of the [Evidence Package](metamodel/evidence/evidence-package.md) it owns, each with its id, its title, what it proves, and the condition it needs. `scripts/compile-targets.mjs` carries it into `targets/catalogue.json` (`evidence`). The tools measure a row by its id and take its words and its Target from the Method, no longer from their own code.
- **Storage tested** is a row of its own (the persistence Target): each entity's writes read back from the database by a passing test. The **Schema** row is the Specs (entities and their storage design) against the migrated database, and nothing else; [readable test data](features/testing/readable-test-data.md)'s `storage-checked` is measured by Storage tested.

2026-10-10 — 0.3.98 — The commands are text, `mde <command>`, in every agent.

- **No slash commands.** The [bootstrap](bootstrap.md) names the commands as the user types them to the agent, in any agent: `mde proceed`, `mde verify`, `mde audit`, `mde review`, `mde release`. Slash forms are gone: Codex refuses a project's `/verify`, and Claude Code's own `/verify` is another skill.

2026-10-10 — 0.3.97 — What a script can prove, Target by Target: Requirements, Architecture, Server, Run the application, Development setup.

The Requirements stage had no script Check at all, and Architecture only its diagrams; most of Server's Checks were never run. Each Check below is measured by its own row of `mde verify`; whether the content is right stays the audit's.

- **Business requirements:** Entity placement ([ABE](features/business-requirements/abe.md)), Entity model and Operations used ([Entity](features/business-requirements/entity.md)), Use case references ([Use Case](features/business-requirements/use-case.md)), Roles ([Role](features/business-requirements/role.md)), Business rules ([Business Rule](features/business-requirements/business-rule.md)), Capabilities ([Capability](features/business-requirements/capability.md)), Domain and Requirement links ([Domain](features/business-requirements/domain.md)).
- **Architecture:** Architecture overview (a stack of the Method, Targets that exist, no placeholder) and Architecture decisions (none an empty heading).
- **Server:** Slices and layers, Logging, Stack conformance, No placeholders; `slices-live` is measured by Live slices (the API suite's captured server log), `operations-marked` by Operation markers (not applicable while traceability is off).
- **Run the application** now holds the Features that are about running it, moved from Server: [runtime scripts](features/server/app-runtime-scripts.md) (Runtime scripts), the [start contract](features/server/app-start-contract.md) (Start and health: `mde:start` leaves `evidence/tests/logs/start.log`, `mde:health` its answer in `health.log`; `mde verify` reads them and starts nothing), [standard operations](features/server/standard-root-operations.md), and [base-path routing](features/web-ui/base-path-routing.md) (Base path). `build-log-present` and `test-log-present` are measured by the Build and Tests rows; they were never run.
- **Development setup** holds the [configuration contract](features/server/env-contract.md) (Configuration: every `.env` key in `.env.example`, `.env` not tracked, no port or secret in source); `readiness-logs-present` and `imports-declared` are measured by Readiness logs and Imports declared.

2026-10-10 — 0.3.96 — `mde audit`: the audit is its own command, run by a second agent.

No audit had ever run: `mde verify` asked "a second agent, a fresh session" to audit, which the agent doing the work cannot open, so it ran the `mde verify` tool and stopped.

- **New [`mde audit`](commands/audit.md)**, said to the agent: it starts a sub-agent to audit, when its tool can, and keeps out of its judgment; otherwise it asks the user to open a new session and say `mde audit` there. The second agent judges each Target's Audit concerns and each architecture decision, by reading the Specs and driving the running application, and writes the Audit Reports and the Architecture Audit. Tests are claims; it judges their honesty. Then `mde verify` counts them.
- **[`mde verify`](commands/verify.md)** runs the tool, then hands the audit to `mde audit`; until it has run, the Evidence shows it not done.
- **Commands are named as they are said:** `mde proceed`, `mde verify`, `mde audit`, `mde review`, `mde release`, said to the agent (the slash forms only where the agent has them; Codex refuses `/verify`, and Claude Code's own `/verify` is another skill). The [bootstrap](bootstrap.md) says only `mde verify` is also a tool; the others are commands, not tools to look for.

2026-10-10 — 0.3.95 — `use-cases-proven` is measured by the Scenarios row.

- The Check `ui-design-operation-coverage/use-cases-proven` named a "UI row" that no longer exists, so it was never run; it is measured by the Scenarios row (every use case and business rule proven by a scenario).

2026-10-10 — 0.3.94 — No separate design-decisions log: a decision is recorded where it applies.

- **`specs/design/design-decisions.md` is retired**, with the `design-decisions-log` Feature. As a log apart from what it decided, it gathered restatements of the architecture, the catalog, and the requirements.
- **Where a decision goes now** ([Design](metamodel/design/README.md)): a choice across the application is an architecture decision (`specs/architecture/`, judged by the Architecture Audit); a choice about one entity or operation, a line on why in its [Entity Design](metamodel/design/entity-design.md); a Feature's realization, the [Design Catalog](metamodel/design/design-catalog.md) itself; a choice for one page, its line in the page set (the [UI architecture](architecture/ui.md), page defaulting, `Custom` patterns, the lifecycle control).
- [Current Work](metamodel/work/current-work.md): durable decisions go where they apply, never in a notes file.

2026-10-10 — 0.3.93 — An operation's design has a home again: Entity Design; Features only for reusable behavior.

Since 0.3.62, design was only catalog terms in a JSON capability design, "no prose"; what did not fit had to become a term. Each operation's inputs, transaction and failure behavior had nowhere to go, so designs invented Features to hold them and applied them to every operation (on proServices, 14 Features in 71 applications: 166 promises for six entities). This returns an operation's own design to short prose, as 0.3.59 had it.

- **[Entity Design](metamodel/design/entity-design.md) is back**, at the entity's own path under `specs/design/`: one short entry per operation whose realization needs deciding (inputs and outputs, what it records, the operations it calls, its transaction and failure behavior). The [Entity](metamodel/requirements/entity.md) points to it.
- **What every operation does the same way** (one transaction, inputs checked against the model, the standard errors) is the architecture's, stated once: not a Feature applied to each operation, and not a catalog default. The [Design Catalog](metamodel/design/design-catalog.md) keeps defaults for the application and every entity only; `mde verify` reports an operation default.
- **[Design in Features](features/application-design/design-in-catalog-terms.md)**: a Feature is applied for a reusable behavior with promises worth proving; never invented to hold one operation's design. The "no design prose" rule is gone; the Audit asks for the opposite.
- [Design](metamodel/design/README.md) and the [application-design](targets/design/application-design.md) Target list the Entity Design; persistence names a `<referenced entity>_id` per to-one relationship. The Business Rule's *Design Semantics* section is removed (its enforcement is the implementation's).

2026-10-10 — 0.3.92 — Business rules back with their entities; `guard` retired.

Since 0.3.62 a capability design named a `guard` on each operation, as free text. Designs filled it with the operation's every check (a rule or two, the state it needs, who may run it, its required inputs), one sentence per operation, and each sentence became a "rule" to prove. Rules worked before as requirements in their own right; this returns to that.

- **The design vocabulary has no `guard`.** A design does not restate a business rule on an operation; how a rule is enforced is the implementation's. `mde verify` reports a `guard` left in a design as retired.
- **A [Business Rule](metamodel/requirements/business-rule.md) stays with its entity** when it can: an entry of the entity's `## Rules` (`- **Team membership** — …`), or of its ABE's Primary Entity's for a rule across the ABE. Only a rule spanning ABEs has its own file, linked from the entities it governs.
- **Each rule has an id** (its name as an id, or its file name): a refusal names it (`error.rule`, [business-rule responses](features/api/business-rule-responses.md)), and its scenarios are tagged `@rule:<id>`, proving it both ways: where it holds, and where it is broken and refused. The Check `readable-test-data/guards-refused` is now `readable-test-data/rules-proven`.
- **Not rules, and kept apart:** who may run an operation is the [Authorization](metamodel/design/authorization.md), derived from the use cases; what an input must be is the entity's attributes and `operation-input`; the state an operation needs is its Transitions (`state-machine`). The Business Rule's definition no longer lists authorization.

2026-10-09 — 0.3.91 — Implementation is not the design's: `implementedBy` leaves the Design Catalog.

- **[Design Catalog](metamodel/design/design-catalog.md)**: a Feature's entry is its realization, the columns it adds, and its parameters; no `implementedBy`, file, component, or path. The catalog says what the application chose, never where it is built.
- **[Engineering for reuse](features/server/engineering-for-reuse.md)**: implementing each Feature once, in one shared component, is a rule for the server, not a design record; where it lives is the code's. Its Check is renamed `features-implemented-once` (was `terms-implemented-once`): implemented once by the Reuse row, every promise proven by the Features row.
- [Coverage](metamodel/evidence/coverage.md): what is built comes from the implementation map only.

2026-10-09 — 0.3.90 — Input files for the requirements.

- **[Domain](metamodel/requirements/domain.md)** gains *Inputs*: the files the user gave at the start (briefs, notes, spreadsheets, screenshots), kept as given in `specs/requirements/inputs/` and listed with links. The agent reads them before writing the requirements; they are source material, not Specs.

2026-10-09 — 0.3.89 — No Test Vocabulary: common phrases, tests as claims, an honesty Audit.

- **The Test Vocabulary is retired.** `metamodel/design/test-vocabulary.md` and the standard phrases (`metamodel/test-vocabulary.json`) are removed; an application keeps no `specs/design/test-vocabulary.json`. [Readable test data](features/testing/readable-test-data.md) asks for common phrases instead: a few plain, generic patterns, each implemented once for every entity, with no list to follow or check. The Check `readable-test-data/vocabulary-steps` is removed.
- **Tags say what a scenario does.** Besides `@<use-case>`, `@<entity>.<operation>`, `@rule:` and `@feature:`: `@refusal` (the tagged operation is proven refused), `@storage` (the scenario reads the stored record back from the database; the Schema row counts it), and, for an end-to-end scenario, `@page:<page>` for each page it uses. [Coverage](metamodel/evidence/coverage.md) reads only tags, never the wording of steps. [End-to-end tests](features/testing/end-to-end-tests.md) and the [testing](targets/app/testing.md) Target's Baseline say the same.
- **Tests are claims, and the Audit judges their honesty.** A passing scenario is the agent's claim that what it names works; it counts as Evidence. The testing Audit asks whether each scenario does what its name and tags say, whether its assertions check the claimed outcome (not a condition always true, a mock, or a control merely present), whether `@storage` and `@refusal` scenarios really read the database and assert the refusal, and whether any step is hollow.

2026-10-09 — 0.3.88 — Design decisions are decisions only.

- **Design decisions log**: `specs/design/design-decisions.md` holds one short entry per decision: the choice, why, and the alternatives set aside. It never restates another Spec (requirements, architecture, the catalog, the capability designs), and it says nothing about implementation: no file paths, components to build, or test notes. The Audit asks it.

2026-10-09 — 0.3.87 — All Targets per architecture.

- **The [Evidence Package](metamodel/evidence/evidence-package.md) includes every Target of the architecture.** The only exclusion is *not part of this strategy*; a Target's `needs` never drop an architecture Target. They apply only when there is no architecture yet.

2026-10-09 — 0.3.86 — A Target the architecture chooses declares its needs.

- **The architecture's choice meets a Target's `needs`.** On the [Evidence Package](metamodel/evidence/evidence-package.md), a Target the architecture lists is no longer left out because the code it needs is not built yet. Before, proServices (PostgreSQL chosen, no `app/` yet) lost persistence and persistence-design as *needs database*.

2026-10-09 — 0.3.85 — Every architectural Target is in the Evidence.

- **Every Target of the architecture is on the [Evidence Package](metamodel/evidence/evidence-package.md).** A Target the Strategy does not keep, or the Goal leaves out (`leftOut`), is named *not part of this strategy* instead of disappearing from the page. Before, a left-out Target (proServices' `deployment`) was missing from the Evidence with no word of why.

2026-10-08 — 0.3.84 — Seed data and migrations in the Evidence; the Aspects and Design Terms retired.

- **Seed data and migrations are measured.** [Runnable migrate/seed](features/persistence/runnable-migrate-seed.md) now requires:
  - the seed reports what it loaded, in `evidence/built/seed.json`: when it ran, and for each entity the rows loaded, rewritten every run;
  - sample data covers every entity of the Specs in the Goal's scope;
  - `migrate.log` and `seed.log` hold the latest run only, ending with its exit.
  
  Two new Checks follow: `migrations-run` and `seed-covers-entities`. The [Evidence Package](metamodel/evidence/evidence-package.md) gains the items **Migrations** and **Seed data** (*19 of 19 entities seeded*), under persistence, with a database.
- **Phase 5 of the unified Feature: the old forms are retired.**
  - The Aspect concept and `metamodel/aspects.json` are removed.
  - The runtime and the Workbench's entity designer read the [optional Feature catalog](optional-features/index.md); its parameters now carry their type, values and default. The runtime's `audit` Feature is `audit-trail`.
  - These are no longer read, and `mde verify` reports each one with the way out (`mde migrate-features`):
    - a requirement's `## Aspects` section and the attribute table's Aspects column;
    - a former Aspect or Design Term name;
    - the catalog's `terms` form and an entity's `terms`;
    - the storage marker `aspect: <name>` (now `feature: <id>`);
    - the tags `@term:` and `@check:` (now `@feature:<id>/<promise>`), and a `term:` deferral.
  - The aliases stay in the optional Features only for `mde migrate-features`.
  - Updated to match: [Feature](metamodel/feature.md), [Design Catalog](metamodel/design/design-catalog.md), the requirement concepts, [Data Model](metamodel/design/data-model.md), [Coverage](metamodel/evidence/coverage.md), and the Features for applying optional Features and for test tags.

2026-10-08 — 0.3.83 — The Goal records its Strategy and its Targets, and is reviewed whenever either source changes.

- **The [Goal](metamodel/work/goal.md) states its Targets.** Front matter `targets` (the Targets it is held to, or `pending` before the architecture is settled) and `leftOut` (the architecture's Targets it deliberately does not take). Its text gains a *Strategy* section and a *Targets* section, with the date settled and the reason for each Target left out. Tools read the Goal's record; only without one do they derive the Targets from the Strategy and the architecture.
- **Keeping the Goal in step.** The Goal is written before the architecture exists, and both its sources can change after it is written. So the agent reviews `work/goal.md` whenever the Strategy or the architecture changes (another stack, a Target added to or removed from the overview) and proposes the Targets anew, recording them once the user agrees. This is stated:
  - in the [bootstrap](bootstrap.md), step 3;
  - in the [Architecture stage](strategy/stages/architecture.md): bring the Goal in step when the architecture is settled;
  - in [Guided's transition from Prototype](strategy/guided.md#transition-from-prototype);
  - in the [architecture concept](metamodel/architecture/README.md);
  - in [Strategy](metamodel/work/strategy.md).
- **Out of step is visible.** A Goal whose Targets no longer match its Strategy and architecture (one it holds that they no longer give, or one they give that it neither keeps nor leaves out) is shown as out of step on the Evidence page, and in the package's README, until it is reviewed.

2026-10-08 — 0.3.82 — The unified Feature: build Features and optional Features; Aspects and Design Terms become Features.

What `docs/MDE-Unified-Features-Proposal.md` (revision 7, in the MDE repository) proposes, in the Method:

- **One concept, two kinds** ([Feature](metamodel/feature.md)):
  - A **build Feature** (`kind: build`) always applies, through the Targets it is compiled into: everything in `features/`.
  - An **optional Feature** applies only where a Spec applies it, and is never compiled into a Target.
  - Whether an optional Feature is a business need or a technical choice is recorded where it is applied: in the requirements, or in the design. `appliedIn` limits where it may be.
- **The optional Feature catalog**, [optional-features/](optional-features/index.md): the 37 Features of the proposal's section 6 (7 where an Aspect and a Design Term overlapped, 17 former Aspects, 13 former Design Terms).
  - Each Feature has its meaning, parameters, realizations, constraints and promises.
  - The former names are aliases (`softDelete` → `soft-delete`, `concurrency.version` → `optimistic-concurrency`).
  - `scripts/compile-optional-features.mjs` writes `catalog.json` and `index.md`, and fails if an optional Feature leaks into the build. `compile-targets.mjs` runs it.
  - Bookmarks and Annotations move here from `features/web-ui/`, with their guidance.
- **Promise ids.** Every build Feature's Verify Check now begins with an id its author wrote (`` - `page-operations-tested` Is every… ``). The Check's id is `<feature>/<promise>`, and a scenario that proves it is tagged `@feature:<feature>/<promise>`. `targets/catalogue.json` keeps the 0.3.81 positional id as `alias`.
- **Proof per application.** An optional Feature's promises are proven on each object that applies it ([Evidence Package](metamodel/evidence/evidence-package.md)).
- **The design.**
  - The [Design Catalog](metamodel/design/design-catalog.md) records the Features the application uses (`features`: realization, `implementedBy`, `adds`) and its own Features, with the defaults.
  - [Capability Designs](metamodel/design/capability-design.md) apply `features`.
  - The verbs of an operation (`guard`, `sets`, `delegates`…) and the model properties (`unique`, `index`, `check`, `label`) are the Method's [design vocabulary](metamodel/design/design-vocabulary.json), not Features.
  - Older `terms` catalogs are read through the aliases.
- **The requirements.** Entities, use cases and the Domain list `## Features`. An older `## Aspects` is read the same way. The Aspect (`metamodel/aspect.md`, since retired) concept and `aspects.json` stay for migration; the MDE runtime still reads `aspects.json`.
- **Invocation convention** ([Architecture](metamodel/architecture/README.md)). The architecture may declare where each entity's implementation lives and how a Feature call is marked; `mde verify` then checks it.
- **Elsewhere:**
  - [business-requirements](features/business-requirements/aspects.md) and [application-design](features/application-design/aspect-realization.md) teach choosing and realizing optional Features;
  - [Design in Features](features/application-design/design-in-catalog-terms.md), [engineering for reuse](features/server/engineering-for-reuse.md) and [readable test data](features/testing/readable-test-data.md) use Feature ids and `@feature:` tags;
  - the Evidence row is **Features** (it was Design terms);
  - the [bootstrap](bootstrap.md) reads the optional catalog's index, and a Feature's file only once applied.
- **Migration:** `mde migrate-features` (tools 0.3.133) rewrites an application's names, catalog, designs, storage markers and tags.

2026-10-08 — 0.3.81 — Strategy, Targets, and testing: a standard defined once, applied deliberately, verified claim by claim.

The decisions of the Strategy, Targets, and Testing review (`docs/MDE-Strategy-Targets-Testing-Review.md` in the MDE repository), all approved:

- **Strategy owns workflow controls; Targets own quality criteria.** [Strategy](metamodel/work/strategy.md) gains "Who owns what": a Strategy refers to a Target's criteria and never copies them; a Target creates no gate by itself; a Feature contributes Checks without activating a Target.
- **The testing baseline moves into the Testing Target.** A new authored section, [Baseline](targets/app/testing.md#baseline), carried through compile. It covers Behavior, API, UI, Persistence, Security and concurrency, Coverage (80% unless `mde.json` sets another) and Artifacts. Each obligation states the application fact it applies on; one whose condition does not hold is *not applicable*, never passed. Relaxing one that applies is the user's recorded decision.
  - [Guided](strategy/guided.md) and the stage pages ([Testing](strategy/stages/testing.md), [Backend](strategy/stages/build-backend.md), [Frontend](strategy/stages/build-frontend.md)) refer to it and keep only timing, gates, and waivers.
- **Each Check is a claim, reported on its own.** `compile-targets.mjs` gives every Verify Check an id, `<feature>.<n>`, shown in `targets/verification/<target>.md`. `targets/catalogue.json` lists each Target's `checks`: id, text, `needs` (from a leading "With a database:" and the like), and the `mde verify` rows it names (`measures`).
  - The [Evidence Package](metamodel/evidence/evidence-package.md) reports each Check as passed or failed (by the row it names, or by scenarios tagged `@check:<id>`), not run, not applicable, or waived, each with its witness.
  - A not-run Check keeps the Evidence from passing.
  - [Readable test data](features/testing/readable-test-data.md) adds the `@check:<id>` tag.
- **Waivers are the user's, and recorded.** In `work/current/scope.json` under `waived`, by item or Check id, with the reason ([Current Work](metamodel/work/current-work.md), [Strategy: Waivers](metamodel/work/strategy.md#waivers)). A waived box or Check is shown as waived, never as passed. Controlled's release needs every applicable Check passed or waived ([Release](strategy/stages/release.md)).
- **[`/verify`](commands/verify.md)** reports each Check's state and never presents an inapplicable Check, or a waiver, as passed.

2026-10-06 — 0.3.68 — Reconcile Prototype guidance and strategy handoff.

- Bootstrap permits relevant Evidence reads for verification, diagnosis, review, and release; source-first reading remains the default for specification work.
- Guided and Controlled assess existing Prototype outputs against their applicable Targets and the current Meta-model before skipping completed stages; supported gaps are filled and remaining questions and work recorded.
- Method summaries reflect the required runtime Prototype Target and the full-stack runnable baseline.
- Prototype uses Capability Design and generated Authorization instead of instructing new applications to author legacy entity sections.
- The agreed prototype page set is retained compactly in `specs/architecture/ui.md`, including when no frontend is generated; the Feature, compiled Target, and user guidance agree.

2026-10-08 — 0.3.80 — The Goal's contract: scope, Targets, stage; the Evidence page's outline comes from it.

- **[Goal](metamodel/work/goal.md#the-contract-goal-strategy-specs-implementation): the contract, in layers.**
  - The architecture offers the candidate Targets.
  - The Goal sets the scope, the whole application or a slice of capabilities (`scope` in `work/goal.md`), and names its Strategy (`strategy`).
  - The Strategy keeps the Targets that apply.
  - The Specs count the Want; the implementation, measured by `mde verify`, the Have.
- **[Strategy](metamodel/work/strategy.md#which-targets-how-rigorously):** each Strategy's front matter states its Target logic (`targets: architecture`, or a list) and its rigor (`verification: optional | delayed | immediate`).
  - [Prototype](strategy/prototype.md): `[prototype, business-requirements]`, optional.
  - [Guided](strategy/guided.md): architecture, delayed.
  - [Controlled](strategy/controlled.md): architecture, immediate.
- **[Targets](targets/README.md): each states its `stage` and `needs`** (`ui`, `database`, `backend`, `integration`, `deployment`), read by tools, alongside `applies_when`, which agents read. The compiler carries them into each Target and `catalogue.json`.
- **[Architecture](metamodel/architecture/README.md):** the overview's front matter names the `stack` and its candidate `targets`.
- **[Current Work](metamodel/work/current-work.md):**
  - Its front matter records the `stage` reached.
  - `scope.json` keeps only deferrals within the Goal's scope; the slice is the Goal's.
- **[Evidence Package](metamodel/evidence/evidence-package.md#outline-want-and-have): Outline, Want, and Have.**
  - The boxes come from the Targets the Goal applies, the Wants from the Specs within its scope, the Haves from `mde verify` (the items of `package.json`, by id).
  - Box states: out of scope, later, pending, the result, or out of date.
  - The verdict covers only what's due within the scope.
- **Goals and Strategies** (`docs/goals-and-strategies.md` in the MDE repository) gains the contract, for users.

2026-10-08 — 0.3.79 — A use-case wizard embeds the working page, step by step.

- **[Use-case wizards](features/ui-design/use-case-wizards.md) are rewritten around the application's own pages.**
  - The wizard is a shell (the use case's steps from its Spec, the current step, the subject so far, Back, Next, Cancel) with the current step's real working page embedded in it.
  - The page is embedded as a nested view in embedded mode, without the application's menus. An `<iframe>` is used only for another application's page, on the same origin.
- **Context in, completion out.** The shell gives the page what the step needs through its address, and the page signals when its part is done, with the result. Only then is Next enabled.
- **Forbidden:** sending the user elsewhere to do a step ("Open working page"), and asking the user to type or confirm what a page did (a "Step outcome" box). A page that can't signal completion isn't yet a wizard step; fix the page.
- **The user's words:** steps, goal and outcome as the Spec names them for a person, never operation ids, and no list of operations.
- **Writes and Cancel:**
  - Writes happen where each page makes them.
  - Cancel shows which steps were already saved.
  - A use case whose Spec makes the flow all-or-nothing gathers its inputs and writes in one final step.
- **Tested as walked:** each wizard is walked by an end-to-end scenario through every embedded page, with a screenshot per step.
- The audit questions are rewritten to match.

2026-10-08 — 0.3.78 — The page set is a Design Spec.

- **The agreed page set moves out of Architecture into Design, as a Spec of its own:** `specs/design/page-set.md` (type `design`), no longer a section of `specs/architecture/ui.md`.
  - One line per page: its purpose, its main entity or use case, its roles, and its links.
  - It's what the pages built are measured against, and what the [navigation diagram](metamodel/design/navigation-diagram.md) draws.
  - Listed in the [Design area](metamodel/design/README.md).
- The Method's own UI conventions stay in `method/architecture/ui.md`. Only the project's page set moves.
- **Updated:** the [Prototype](features/prototype/prototype.md) Feature (its site-navigation step and audit question), the [Prototype Strategy](strategy/prototype.md), the [Diagrams](features/architecture/diagrams.md) Feature, the [Evidence Package](metamodel/evidence/evidence-package.md), and the prototype docs.

2026-10-08 — 0.3.77 — Where the pages get their data is spelled out, and checked against the code.

- **[env-contract](features/server/env-contract.md): `.env` declares `SERVER_SOURCE` and `API_BASE`.**
  - `SERVER_SOURCE` is `api` (the application's own backend) or `runtime` (the MDE runtime, a prototype only).
  - `API_BASE` is the backend's path prefix, such as `/api`, proxied to `API_PORT`.
  - The frontend reads its data only through `API_BASE`.
  - Once the application has its own backend, `SERVER_SOURCE` is `api`, and no frontend code calls the MDE runtime. The Feature gains a Verify question for this.
- **[data-source-switch](features/prototyping/data-source-switch.md): every page moves to the backend together** when the application gets its own. Never one entity at a time, and no page keeps reading the runtime's sample data behind the backend's back.
- **The inventory of what's built is `evidence/built/inventory.json`** (formerly `evidence/coverage/raw/implementation.json`, which is still read).
  - Each page's data source is found from what its code calls, never written as a constant ([code-coverage-matrix](features/documentation/code-coverage-matrix.md)).
  - Updated in [Coverage](metamodel/evidence/coverage.md), the [Evidence layout](metamodel/evidence/README.md), the [evidence](targets/app/evidence.md) Target and [Testing](strategy/stages/testing.md).
- **[Evidence Package](metamodel/evidence/evidence-package.md):** new items **Server source** (Conformance) and **Page set** (the intended pages, recorded in `specs/architecture/ui.md`). Pages built no longer credits a page whose code reaches the runtime.

2026-10-08 — 0.3.76 — The navigation diagram belongs to Design.

- **The [Navigation Diagram](metamodel/design/navigation-diagram.md) moves from Architecture to Design.**
  - The concept is now in `metamodel/design/`, and the diagram itself at `specs/design/diagrams/navigation.md`.
  - How a person moves through the pages is interaction design, realized within the UI conventions and the page set the Architecture records.
- **[Diagrams](features/architecture/diagrams.md):**
  - The architecture and interaction diagrams stay with the architecture Target.
  - The navigation diagram rule now compiles into the [UI design](targets/design/ui-design.md) Target (a new *Impact on ui-design*).
- The [index](metamodel/index.md), the Design and Architecture area pages, the Frontend stage, and the Prototype's site-navigation step link to it there.

2026-10-07 — 0.3.75 — A testing baseline in every Strategy; the architecture, interaction and navigation diagrams required.

- **[Testing](strategy/stages/testing.md#control) states what every application must prove, in every Strategy.** These are not chosen by risk, and a manual check or smoke test doesn't stand in for any of them:
  - every operation through the API;
  - every page operation in a real browser against the real backend and database, with a screenshot of each step;
  - every create, update and delete checked in the database itself;
  - the page inventory;
  - code exercised, measured against the threshold (80% unless set);
  - the required diagrams.

  "Test what matters for the risk" now applies only beyond this baseline.
- **[Guided](strategy/guided.md): the testing baseline isn't advisory.** Guided delays when it's verified, not whether it's built.
- **[Frontend](strategy/stages/build-frontend.md) and [Backend](strategy/stages/build-backend.md): done means proven.**
  - A page needs its inventory entry, a passing browser scenario performing every operation it offers (with screenshots), and its place in the navigation diagram.
  - An operation needs its scenario and, for a write, its database check.
- **Features say it in so many words:**
  - [end-to-end-tests](features/testing/end-to-end-tests.md): "Every page operation must be tested in the browser, with screenshots." It applies in every Strategy, with new Verify questions.
  - [readable-test-data](features/testing/readable-test-data.md): "Check every write in the database itself."
  - [coverage-threshold](features/testing/coverage-threshold.md): coverage is always measured.
  - [diagrams](features/architecture/diagrams.md): the three diagrams are required, with a Verify question and a navigation audit question.
- **New concept: [Navigation Diagram](metamodel/design/navigation-diagram.md)** (`specs/architecture/diagrams/navigation.md`). It draws the agreed page set as a map: each role's entry, the pages, and the links between them. It's required with a user interface.
  - The Prototype's site-navigation step now draws it.
  - Listed in the [index](metamodel/index.md) and the Architecture area.
- **[Evidence Package](metamodel/evidence/evidence-package.md):**
  - **The verdict counts every item.** Any failed item fails the run, and anything short keeps it from passing.
  - **Some shortfalls are failures:** an untested UI, no screenshots, or an unchecked database.
  - **New item:** Screenshots.
  - **Fingerprinted:** written whole by `mde verify`, never edited by hand.

2026-10-07 — 0.3.74 — Verify, audit, and review: three words, three actors.

- **The terms.** *Verify* is what MDE does by script (`mde verify`). *Audit* is what MDE asks a second agent, a fresh session that did not build the work, to judge. *Review* is kept for the user's decisions (`/review`, the Workbench's Reviews and Annotations).
- **Features have two sections instead of `## Checks`** ([Features](features/README.md#verify-audit-and-review)):
  - `## Verify`: the Checks a script or test run settles. They compile into `targets/verification/<target>.md` for each Target the Feature impacts.
  - `## Audit`: what needs judgment. It compiles into `targets/audit/<target>.md` under the Feature's first Target, with any audit guidance the Feature already had.
  - The 231 existing Checks were sorted: 47 to Verify, 184 to Audit. Most requirements, design and UI questions need judgment.
- **[`/verify`](commands/verify.md) runs both.** First `mde verify`, then an audit by a second agent of the Targets in scope. The audit writes `evidence/audit/<target>.md`. Status reports the verification and the audit separately. The Strategies ([Guided](strategy/guided.md), [Controlled](strategy/controlled.md), [release](strategy/stages/release.md)), [bootstrap](bootstrap.md) and [Targets](targets/README.md) say the same.
- **Evidence concepts.**
  - New: [Audit Report](metamodel/evidence/audit-report.md) (`evidence/audit/<target>.md`). It gives a verdict, a witness and a fix per concern, ending with *N genuine · M fake · K not-exercised*.
  - Renamed: Architecture Review is now [Architecture Audit](metamodel/evidence/architecture-audit.md) (`evidence/audit/architecture.md`, formerly `evidence/architecture/review.md`). Its Feature is now [evidence-architecture-audit](features/evidence/architecture-audit.md).
  - The Evidence Package's "Reviews" group is now "Audit". Documentation moves to Conformance, since a script counts the guides.
- The "AI review" and "semantic review" wording in Features is now "audit".

2026-10-07 — 0.3.73 — Multi-record sections: a row is found by its data.

- **Standard UI phrases for rows** (test-vocabulary.json). In a section showing many records (a table, a list, cards), a row is found by its record's data: its display label, or the value it shows in a column; never by its position. The phrases cover:
  - the rows a section shows, exactly and in order, or including these;
  - a row's values, by label or by a column's value;
  - no row for a record, and how many rows;
  - pressing a control in a row, and performing an operation through a row;
  - a row's control state.
- **[stable-selectors](features/web-ui/stable-selectors.md):** each row's accessible name carries its record's display label, tables have column headings, and row controls are named for what they do; with a Check for it.
- [end-to-end-tests](features/testing/end-to-end-tests.md) lists the row phrases.

2026-10-07 — 0.3.72 — Tests that look at a section of a page.

- **Standard UI phrases for a section of a page** (test-vocabulary.json). A section is found by its accessible name, the name a person sees ("the Contacts section"), never by a CSS path or its position among `div`s. The phrases check that it:
  - is shown, or not shown;
  - shows, or does not show, a text;
  - shows these field values;
  - lists these records;
  - is empty.

  Further phrases cover a control in a section (shown, hidden, enabled, disabled, selected, expanded), pressing a control within a section, and filling in a section's form.
- **[stable-selectors](features/web-ui/stable-selectors.md):** every section of a page (a panel, a card, a tab, a wizard step, a list) is a named region, a `section` or `role="region"` named by its visible heading or an `aria-label`, with a Check for it.
- [end-to-end-tests](features/testing/end-to-end-tests.md) lists the section phrases.

2026-10-07 — 0.3.71 — Standard test phrases, for the API and the pages; the AI extends them.

- **New metamodel/test-vocabulary.json: the Method's standard test phrases**, the starting vocabulary every application adopts.
  - **API phrases:** create, run an operation, list, two at once, succeeds or rejected, cannot, read back, history, journal, storage.
  - **UI phrases** (`surface: "ui"`), which act through the pages as a person does: signed in, opens a page or a record, starts a use case, fills in, presses, performs an operation on a page, creates on a page, the page shows, lists, says, cannot, and still shows after a reload.
  - Fields and controls are found by their accessible names, and each When step that changes the screen is followed by a screenshot.
- **The AI extends the vocabulary as needed** (Test Vocabulary, [readable-test-data](features/testing/readable-test-data.md)). A new phrase is generic (any entity, any page), states its meaning, and has one implementation; it never renames or duplicates a standard phrase.
- **[end-to-end-tests](features/testing/end-to-end-tests.md)** uses the standard UI phrases.

2026-10-07 — 0.3.70 — Every evidence item counts Have against Want; the page inventory.

- **[Evidence Package](metamodel/evidence/evidence-package.md):** each item states its count, *Have of Want (p%)*, and its report lists the details. Wants come from the Specs and the Method, never from what the application happens to have:
  - the requirements;
  - the Specs' entities, operations and use cases, on the pages the application reports;
  - the diagrams the Method requires;
  - each architecture decision (each leaf section of `specs/architecture/`);
  - the guides that apply.

  Coverage becomes the group **Built and tested**: API built, API tested, Backend exercised, Pages built, Specs on pages, Pages tested, Operations tested through pages, Frontend exercised.
- **Pages, from the application's inventory** ([Coverage](metamodel/evidence/coverage.md)): pages are not designed, so the application reports the pages it generated and the entities, operations and use cases each covers; the Specs want all of theirs on built pages, and tested there.
- **The page inventory** ([code-coverage-matrix](features/documentation/code-coverage-matrix.md)): the application lists every page it generated, with its kind, ABE or use case, file, data source, entities, and operations. Since pages are not designed, this is how the evidence knows what was generated and what is missing.
- **[running-the-tests](features/testing/running-the-tests.md):** after each `mde verify`, every item below its Want is work. Close the gap, or defer it in `scope.json` with a reason; never lower a Want.

2026-10-07 — 0.3.69 — Coverage by surface: is it built, and is it tested? Deferred or missed?

- **One [Coverage](metamodel/evidence/coverage.md) concept**, replacing Implementation Coverage and Test Coverage. It has one report per surface, each answering whether the surface is built and whether it is tested:
  - **API**, `coverage/api.md`: every operation, use case, guard rule and design term the server realizes, then the backend code the tests exercised;
  - **Pages**, `coverage/pages.md`: every page the application lists, built (on the real API) and tested in the browser, its operations, the use cases walked; then the frontend code exercised.
- **Four states per requirement:** tested; built but not tested (a gap in the tests); deferred to a later slice (intentional); missed (in scope, not built, which is a Finding). A requirement a passing test proves is built. Items lead with what is done, as "n of N (p%)".
- **[Current Work](metamodel/work/current-work.md) records scope when the work is sliced:** `work/current/scope.json` names the slice and what it defers, until which slice and why. Without it, everything the Specs state is in scope.
- **The implementation map lists the pages** ([code-coverage-matrix](features/documentation/code-coverage-matrix.md)): each page's file, its data source (`api` or a prototype substitute), its capability, its use cases, and the operations its controls perform.
- **Test Vocabulary:** `surface: "ui"` marks a phrase that acts through the pages, and `{page}` names the page. [end-to-end-tests](features/testing/end-to-end-tests.md) uses both, and leaves the frontend's coverage in `coverage/raw/frontend/`.

2026-10-07 — 0.3.68 — Coverage in two directions, and evidence that says what it found.

- **Coverage has two directions, each its own report:**
  - **Built, Specs → code:** [Implementation Coverage](metamodel/evidence/coverage.md) (renamed from Code Coverage), `coverage/implementation.md`. For each requirement (use case, guard rule, entity operation, design term), the code that builds it, layer by layer. It draws on terms' `implementedBy`, tables in the migrations, and the application's own map, `coverage/raw/implementation.json`, which the [code-coverage-matrix](features/documentation/code-coverage-matrix.md) feature asks the application to write from its code. A requirement nothing shows built is not built.
  - **Tested, tests → app:** [Test Coverage](metamodel/evidence/coverage.md), `coverage/tests.md`. The requirements passing tests prove, counted by kind, then the code the instrumented runs executed, which was `code.md` before.

  Read together, each requirement is built and tested, built but untested, or not built.
- **Build and test runs say what they did** ([app-runtime-scripts](features/server/app-runtime-scripts.md)): `mde:build` writes `tests/raw/build.json`, the parts it built; each suite writes `tests/raw/<suite>.json`, from which the package counts its tests.
- **Test Vocabulary:** `checks: "storage"` marks a phrase that checks an entity's storage against the migrated database, so the Schema item covers the database too.
- **[Evidence Package](metamodel/evidence/evidence-package.md):**
  - results say what they found: a failing check names its first problem, and a count names what is missing;
  - Diagrams counts the diagrams the Method requires of the Specs against those delivered.

2026-10-07 — 0.3.67 — A tidy Evidence area.

- **[Evidence](metamodel/evidence/README.md) has one layout:**
  - `README.md` and `package.json`, the package, as a page and as data;
  - `checks/<check>.md`, one report per conformance check, replacing a folder per check;
  - `tests/<suite>.md`, with its screenshots, logs and `raw/` runner output;
  - `coverage/tests.md` and `code.md`, with each instrumented run's tool output in `coverage/raw/<run>/`;
  - `architecture/review.md`.
- **Reports and raw output are kept apart.** People read the reports; raw output (logs, coverage files, runner JSON) lives under `logs/` and `raw/`. Each run replaces its own, so nothing from earlier runs or abandoned attempts piles up.
- **[Evidence Package](metamodel/evidence/evidence-package.md):**
  - `mde verify` writes it whole on every run, with `evidence/package.json` as data for the Workbench's Evidence dashboard;
  - items are grouped (Build and tests, Coverage, Conformance, Reviews), each with its status, result, report, and a plain sentence on what it proves;
  - statuses now include partial and skipped.
- [Test Report](metamodel/evidence/test-report.md), [Code Coverage](metamodel/evidence/coverage.md) and [captured-command-output](features/testing/captured-command-output.md) follow the layout; the evidence Target's Outputs table is updated.

2026-10-07 — 0.3.66 — End-to-end tests with screenshots.

- **New feature [end-to-end-tests](features/testing/end-to-end-tests.md)**, compiled into the testing, evidence and web-ui Targets:
  - end-to-end scenarios run in a browser against the real application (its frontend, backend and own database), never a prototype runtime or substitute; a page still on one fails visibly;
  - scenarios are Gherkin in the Test Vocabulary (tagged `@e2e`), with screen phrases implemented once for every page;
  - each use case with a screen has its main flow walked as its actor, with the outcome asserted after a reload;
  - a screenshot follows each step that changes the screen, plus one at the end and one at failure, under `evidence/tests/screenshots/e2e/`;
  - the run is instrumented for code coverage;
  - one command, `mde:e2e`, run from `mde:test`.
- **[Test Report](metamodel/evidence/test-report.md):** the end-to-end report `evidence/tests/e2e.md` shows each step with its screenshot, as a storyboard of the use case.

2026-10-07 — 0.3.65 — Test and code coverage, generated.

- **[Test Coverage](metamodel/evidence/coverage.md)** is generated by `mde verify`:
  - rows come from the Specs: use cases, guard rules, entity operations, and now each design term applied;
  - a scenario proves a requirement by its tag, or an operation by performing it;
  - a provisional transition has no operation, and so no row.
- **Test Vocabulary:** a phrase that performs an entity operation names it in `operation` (a fixed name, or `{operation}` from the step). With `refusal` set, the phrase proves the operation is refused to a role.
- **[Code Coverage](metamodel/evidence/coverage.md)** says where its data comes from:
  - each instrumented run leaves its tool's coverage summary and report in a folder under `evidence/coverage/`, with a `run.json` naming the run, the tool and each exclusion with its reason;
  - the threshold is `coverage.threshold` in `mde.json`, 80% by default;
  - with a generic engine, an operation's service code is the code implementing its design terms.

2026-10-06 — 0.3.64 — Design terms are described and verified.

- **[Design Catalog](metamodel/design/design-catalog.md):** each term has a `description`, in plain words for the designer and the reviewer: what it gives, not how. `means` stays the precise contract.
- **Every applied term is verified by scenario:** at least one scenario tagged `@term:<id>` exercises what its `means` says and passes. Structural terms (`unique`, `index`, naming) are verified against the migrated test database.
- **Features:** [engineering-for-reuse](features/server/engineering-for-reuse.md) now requires each applied term to be described, implemented once and verified. A term without passing verification is not done. [readable-test-data](features/testing/readable-test-data.md) adds the `@term:` tag. Recompiled into the server, persistence, application-design and testing Targets.

2026-10-06 — 0.3.63 — Engineering for reuse, and tests as readable data.

- **New feature [engineering-for-reuse](features/server/engineering-for-reuse.md)**, compiled into the server, persistence and application-design Targets:
  - each entity's model is declared once, and nothing restates its fields;
  - a generic path, written once, serves every entity;
  - per-entity code is only rules, decisions and justified overrides;
  - mature libraries carry the infrastructure;
  - a working pattern is never copied into another file;
  - each design term is implemented once.
- **[Design Catalog](metamodel/design/design-catalog.md):** each term records its `implementedBy`, the one component that implements it. This is the reuse map: the first design that applies a term causes its implementation, and every later one reuses it.
- **New Test Vocabulary** (`specs/design/test-vocabulary.json`): the application's step phrases, each with its keyword, pattern, meaning, table and one implementation. The AI writes it as it tests, and adds a phrase only when none can say what a scenario needs.
- **New feature [readable-test-data](features/testing/readable-test-data.md)**, compiled into the testing Target:
  - scenarios and data are Gherkin with tables;
  - records are named by display label, never by id;
  - steps are only vocabulary phrases, with no per-entity step definitions;
  - shared data is a shared background;
  - scenarios are tagged with the use case, each operation, and `@rule:<rule>` for each guard's rejection;
  - every guard is proven both ways.

2026-10-06 — 0.3.62 — Design is stated in the application's own terms: a design catalog, and a capability design per capability.

- **New [Design Catalog](metamodel/design/design-catalog.md)** (`specs/design/catalog.json`): the application's design vocabulary. Each term is defined once, by the AI as it designs, with:
  - what it applies to;
  - what it means, in one technical sentence;
  - how this application realizes it;
  - its options;
  - the storage columns it adds;
  - the Method aspect it adopts.

  Its defaults hold for the application, every entity and every operation unless a design says otherwise. The Method's aspects are the starting vocabulary.
- **New [Capability Design](metamodel/design/capability-design.md)** (`specs/design/capabilities/<capability>/design.json`): the catalog terms each entity and each operation applies, with their options, and storage names only where they differ. It contains no prose. It replaces Entity Design, the per-entity design files.
- **[Data Model](metamodel/design/data-model.md):** an entity's Storage View follows from the catalog's naming convention, the columns its terms add, and the capability design's overrides. Nothing that follows from the convention is written.
- **New feature [design-in-catalog-terms](features/application-design/design-in-catalog-terms.md)**, compiled into the application-design and persistence-design Targets:
  - design only in catalog terms;
  - nothing written that is absent;
  - every fact once, at its source;
  - one term per meaning.

  What doesn't fit becomes a term, or a decision with its rationale.
- **Follow-on updates:** Entity, Design, optimistic locking, storage, API and application-design wording.

2026-10-06 — 0.3.61 — Pages are generated, not designed: no page specifications, UI catalog, or navigation diagram.

- **Removed concepts:** Page, UI Catalog and Navigation Diagram. A page is generated from the requirements, and the generated page is the design, reviewed running, not as a document describing it. The requirements already say what a page needs:
  - the entities and their operations;
  - the use cases and their actors;
  - the roles and their success factors (a role's dashboard is its factors);
  - the authorization derived from the use cases.
- **New: [UI conventions](architecture/ui.md#ui-conventions-the-pages-are-generated-not-designed)** in the UI architecture. They are:
  - each ABE gets a list and a detail page;
  - each use case gets a flow (a wizard when it has steps);
  - each role gets a landing page (its dashboard and use-case launcher);
  - actions follow authorization and the lifecycle;
  - routes follow the entities.

  An application states only where its conventions differ, once. A choice for one page that the conventions do not make is a design decision.
- **Feedback lands where it lasts:**
  - a correction about meaning goes to the requirements;
  - a correction that holds for every page goes to the conventions;
  - a correction for one page goes to that page's code, which is then maintained, not regenerated, with a test that keeps it.
- **The page vocabulary moves:** the patterns, canvases, panels, actions and services move from the Page concept into the UI architecture, as the language the conventions and UI rules are written in.
- **The UI rules follow:**
  - the ui-design Target produces the pages, any conventions that differ, and decisions, no longer page specs or a catalog;
  - the prototype's step 3 proposes the page set in the conversation, with no diagram;
  - the build-frontend stage generates by the conventions.
- **The UI check proves use cases:** each use case is proven by a test scenario tagged with it (`@<use-case>`) or with each operation it invokes (`@<entity>.<operation>`); see the Evidence Package's UI row.

2026-10-06 — 0.3.60 — An oversight role reads every entity.

- [Role](metamodel/requirements/role.md) and [Authorization](metamodel/design/authorization.md): a role with oversight of the whole application, which no use case describes (a system administrator), declares `reads: all` in its frontmatter and may read every entity. A role's Permissions / Constraints explain in words; they do not grant.

2026-10-06 — 0.3.59 — Requirements hold business meaning only: use cases are more than one operation, workflows live in their capability, and an entity's design and authorization move out.

- [Use Case](metamodel/requirements/use-case.md): a use case is not a single operation. It is what a person sets out to do, invoking several operations; an action that is one operation is the entity's, and viewing a record is a page. Its Design Semantics section is gone. `mde verify` reports a use case that invokes fewer than two operations.
- [Workflow](metamodel/requirements/workflow.md): it belongs to its capability (`capabilities/<capability>/workflows/`). Its Steps are a table (`Step | Role | Does | Reaches`), which the Workbench draws as swimlanes and a later realization can turn into BPMN. It describes; it does not execute.
- [Capability](metamodel/requirements/capability.md): the overview points rather than contains. It adds Workflows and Conceptual Data Model links, and `workflows/` is a reserved folder.
- [Entity](metamodel/requirements/entity.md): no `## Authorization`, `## Design Semantics`, or `## Storage View`. Each operation says what it requires and what it does. Specs from before still work.
- New Entity Design (`metamodel/design/entity-design.md`, since replaced by Capability Design): an entity's Design Semantics and Storage View, at the entity's own path under `specs/design/`. The [Data Model](metamodel/design/data-model.md) is its Storage View.
- New [Authorization](metamodel/design/authorization.md): `specs/design/authorization.json`, generated by `mde authorization` from the use cases' actors and the operations they invoke. Nobody writes it by hand.
- [Bootstrap](bootstrap.md): never read derived files (SVGs, rendered diagrams, `authorization.json`, evidence), and read the Specs top down, a level at a time. On serviceProvider, the entities' requirement text is 55% smaller.
- Features and Targets follow: business requirements, persistence design, API design, application design, and prototype.

2026-10-06 — 0.3.58 — A workflow can carry a linked illustration.

- [Workflow](metamodel/requirements/workflow.md): a workflow may embed an SVG of itself. It shows the roles as lanes, the steps in order with their states, and what is outside the application. Every item links to the spec it shows: lanes to roles, steps to use cases, states to the lifecycle, checks to rules, and out-of-scope items to the Domain's scope. The Workbench opens each item's spec from it.

2026-10-06 — 0.3.57 — A Storage View column can say it is an aspect's.

- [Data Model](metamodel/design/data-model.md): a column that stores no attribute may also be `aspect: <name>`, for a column an aspect needs, such as `aspect: ordering` for a position or `aspect: softDelete` for a deletion marker. Before, the markers were only `key`, `foreign key`, `audit`, and `version`, so such columns had nothing correct to say.

2026-10-05 — 0.3.56 — The Entity concept's example Relationships table is shown as an example.

- The example table in [Entity](metamodel/requirements/entity.md) is now a code block. Its links (`../customer/customer.md`) are illustrations, and as live links they pointed at files that do not exist, which the Method's link check reported.

2026-10-05 — 0.3.55 — Annotations and bookmarks for the application's own users, each defined by an interface a package implements.

- **Annotations for end users** ([Feature](optional-features/collaboration/annotations.md), in the web-ui, api, and persistence Targets; the new `annotations` application aspect turns it on).
  - Users note a part of a page or a record. A note is private or shared with everyone who may see its target, open or resolved, and found again by `id`, `data-testid`, then path. A note whose element is gone is shown as detached.
  - It replaces the development-only reviewer annotations, which assumed a library MDE no longer ships and a Workbench embedding handshake.
- **Bookmarks** ([Feature](optional-features/collaboration/bookmarks.md)) realize the `bookmark` aspect: a ☆/★ toggle on the record's page and a **Bookmarks** list in the shell, both per user. A record that is gone or out of reach stays listed as unavailable, without revealing its label.
- **An interface, so one package fits any application.** Both are meant to ship as a front-and-back package, and each Feature defines what joins them:
  - the HTTP contract (`/api/annotations`, `/api/bookmarks`, with the shapes and refusals);
  - the ports the application supplies to the back half: its current user, its `canView` authorization, a `label` for records, and its store with the package's migration;
  - the front half's mount (`mountAnnotations`, `mountBookmarks`, `bookmarkToggle`).

  An application uses MDE's package where one exists for its stack, and otherwise implements the same interface.
- web-ui checks: annotations are no longer a development-flag tool.

2026-10-05 — 0.3.54 — Starting the application again restarts it.

- **`mde:start` restarts** ([start contract](features/server/app-start-contract.md), [script roles](features/server/app-runtime-scripts.md)). It first stops the application's own run, if one is still going, then starts afresh, so starting is always safe to repeat.
  - It knows its own run by what it recorded when it started: each tier's process id, kept in the App area (for example `app/logs/run.json`), and checked to still be that process before stopping it.
  - It stops each tier's whole process tree, and the database only when this application started it.
  - A port held by anything else is reported (the port and the process holding it) and left alone; `mde:start` never kills a process it did not start.
  - The Prototype's pages follow the same rule.
- Why: a start left behind (an old development server) held the port, and the next start failed, or, before ports were strict, moved to another port.

2026-10-05 — 0.3.53 — ABEs: entities grouped around a primary concept under their capability; relationships as a table; a conceptual data model, and one logical model per ABE.

- **ABE** (Aggregate Business Entity), a new [concept](metamodel/requirements/abe.md):
  - A cohesive set of entities around one primary business concept, in a folder under its home capability (`capabilities/<capability>/<abe>/`), named after its Primary Entity.
  - The **Primary Entity** is the entity spec named after the folder, an ordinary `type: entity`. Its spec also carries the ABE's purpose, the rules that span its entities, and its `## Levels` (which supporting entities are `Standard` or `Enterprise`; the rest are `Simple`, matching the industry pattern variants).
  - A new [Feature](features/business-requirements/abe.md), in the business-requirements and Prototype Targets, tells the agent to find a capability's ABEs first, give each one home, and specify only the entities at the Goal's level.
  - Industry patterns map to ABEs, and their variants to the levels.
- **Entities move into their ABE folders** ([Entity](metamodel/requirements/entity.md)). Applications created before ABEs keep `specs/requirements/entities/`; the runtime reads both. Entity names are unique across the application.
- **Capabilities** ([Capability](metamodel/requirements/capability.md)): a capability folder holds `overview.md`, `use-cases/`, `business-rules/`, `events/`, and its ABE folders (every other folder). The overview lists `## ABEs` instead of `## Entities`. Business events about an ABE's entities live in its `events/`.
- **Relationships as a table**: `Related | Role | Cardinality | Kind | Cascade | Description`.
  - Cardinality is `1`, `0..1`, `0..*`, or `1..*`.
  - Kind is `association`, `composition`, or `reference`; it also states the related records' lifecycle.
  - Cascade is what an `update` or `delete` does: `cascade`, `restrict`, `detach`, or `none`.
  - The bullet form is still read in older specs.
- **Data model diagrams in two levels:**
  - The new [Conceptual Data Model Diagram](metamodel/requirements/conceptual-data-model-diagram.md) (`erd.md`) shows the ABEs by capability, with links labeled by role and no cardinality.
  - The [Logical Data Model Diagram](metamodel/requirements/logical-data-model-diagram.md) is now one per ABE (`erd-<abe>.md`). It shows the ABE's entities and attributes at the application's level and its Primary Entity, with neighbouring ABEs' entities as bare boxes. Composition is drawn as a solid line, reference as dashed.
  - The diagrams Feature's update rules and checks follow. The physical model stays split by capability.
- The Prototype's step 1 draws the conceptual model, then each ABE's logical model, at the Simple level; step 2's primary entities are the ABEs' Primary Entities.
- Icons: the logical data model diagram's icon is now 🔗, no longer the 🧩 it shared with Capability.

2026-10-04 — 0.3.52 — Use-case wizards: every role starts from what it wants to do.

- **Use-case wizards.** A new [Feature](features/ui-design/use-case-wizards.md), in the ui-design, web-ui, and Prototype Targets. It applies to every application with a UI, not only prototypes.
  - Each role has a **use-case launcher**: the use cases whose actors include it, grouped by capability. It updates when the role changes, and is in the navigation diagram.
  - Each use case a user performs is a **wizard**, with steps derived from its Spec: choose a subject that meets the preconditions, enter the inputs, review, act through the declared operations, show the outcome.
  - Each step **reuses** an existing list, detail, or form component, never a copy. The use cases come **from the Specs** (the runtime's `GET /use-cases`, or generated at build time), never from a hand-written list.
  - Nothing is written before the Act step, a failed operation shows the server's message there, and Back keeps what was entered.
  - It came from serviceProvider. Asked for this, its AI produced a hand-copied catalog of tiles linking to list pages, with hints, filtered by role only on load.

2026-10-04 — 0.3.51 — A prototype's pages always name their application, and show their errors.

- **Prototype step 4** ([Prototype](features/prototype/prototype.md)):
  - When the pages' server is started other than by the Workbench's App view, their build configuration defaults the application to the project folder it sits in, and the runtime address to `MDE_WORKBENCH_PORT`.
  - A failed call is shown with the runtime's message, never as an empty list.
  - Why: serviceProvider's pages, on a server started before the App view set these, sent no application. The Workbench answered "Unknown entity", and the pages showed no data and no error.

2026-10-04 — 0.3.50 — A busy port is an error, never a silent move.

- **Busy ports.** In the [configuration contract](features/server/env-contract.md), a server whose port is busy now fails with that error and never moves to another port (a Vite app sets `strictPort`), so the address the Workbench opens is the one the server runs on. serviceProvider's pages had moved from 5173, held by an old hrDemo dev server, to 5179, and Launch opened hrDemo.

2026-10-04 — 0.3.49 — Every port is set in the project's .env.

- **Ports in one place.** The [configuration contract](features/server/env-contract.md) now puts every port in the `.env` at the project root, next to `mde.json`, with `.env.example` committed listing each one with its default. That covers the pages' server (`WEB_PORT`), the API (`API_PORT`), the database (`DB_PORT` or its connection URL), and the Workbench (`MDE_WORKBENCH_PORT`). Source, scripts, and tool configuration read them and never hard-code a port: a Vite config, a proxy target, a container file, and `package.json`'s `"mde": { "url": "http://localhost:${WEB_PORT}" }` all count. An address between tiers is built from them. A tier in its own folder loads the root `.env` (Vite: `envDir`). A new Check covers it. Ports had been scattered: in a backend `.env`, a Vite config, a proxy fallback, and `package.json`.
- The Prototype's step 4 starts the pages' server on `WEB_PORT` and declares its address with `${WEB_PORT}`.

2026-10-04 — 0.3.48 — A prototype's pages have a home in the Workbench and reach the right runtime.

- **Prototype step 4** ([Prototype](features/prototype/prototype.md)) now says how the generated pages reach the runtime and how the user opens them:
  - The runtime's paths are from the Workbench's root, with no prefix. The serviceProvider prototype called `/api/data/…` and got 404s.
  - Every request names its application with `folder=`, since one Workbench serves several.
  - Both the address and the application come from configuration: `MDE_RUNTIME_URL` and `MDE_PROJECT`, or their `VITE_` copies.
  - The App area's `package.json` has an `mde:start` that starts the pages' development server and declares its address (`"mde": { "url": … }`), so the Workbench's App view starts it (Start) and opens it (Launch). The pages had no such script, so the App view could neither start nor open them.
  - A new Check covers this.

2026-10-04 — 0.3.47 — Data models are drawn in Mermaid with their attributes; each diagram is a page of its own; large diagrams split by capability.

- **Data models in Mermaid.** The [logical](metamodel/requirements/logical-data-model-diagram.md) and [physical](metamodel/design/physical-data-model-diagram.md) data models are now a Mermaid `erDiagram` in their page (`erd.md`, `pdm.md`), not Graphviz DOT rendered to SVG. The logical model shows each entity's business attributes with a logical type, identifier first, and crow's-foot cardinality with a verb label on each relationship. A many-to-many relationship is one line unless the business gives the association meaning of its own. The physical model shows columns with `PK`, `FK`, `UK`. The DOT drawings (bare boxes, junction diamonds, numbers at the line ends) were hard to read on a model of any size. Use-case behavior stays in DOT.
- **One diagram per page.** Each diagram is a page of its own, typed with its kind, never a page collecting several ([Diagram](metamodel/diagram.md)).
- **Large diagrams split by capability.** A logical data model of more than about a dozen entities, or a use-case diagram of more than about fifteen use cases, becomes one page per capability (`erd-<capability>.md`, `use-cases-<capability>.md`, likewise `pdm-<capability>.md`), each of the same kind. The overview page (`erd.md` with entities and relationships only, `use-cases.md` with actors and capabilities) links them.
- The Prototype's first step draws both diagrams in Mermaid; the render step added in 0.3.45 is no longer needed there.

2026-10-04 — 0.3.46 — Hierarchy and Tags aspects; Sorted Items; roles state their Critical Success Factors, and each gets a dashboard.

- **New aspects.** `hierarchy` (entity): instances form a tree through a parent of the same entity, with no cycles; options for the parent relationship, maximum depth, leaf-only use, and what deleting a parent does. `tags` (entity): users attach any number of tags and find instances by them; free or controlled vocabulary, shared or personal. A classification the business reasons about stays an attribute or an entity.
- **Sorted Items.** The `ordering` aspect (relation) is labelled Sorted Items and defined for line items: each child has its position, items are inserted, moved, and removed, and positions close up. New options: the position `field`, whether users may `reorder`, and `numbering` sequential or gapped. Its name is unchanged, so existing declarations stand.
- **Critical Success Factors.** A new [Feature](features/business-requirements/role-success-factors.md), in the business-requirements and ui-design Targets. Each role that owns outcomes states three to five Critical Success Factors in its new `## Critical Success Factors` section ([Role](metamodel/requirements/role.md)). Each factor has a measure defined from the model, a target, an at-risk threshold, and the action the role takes through a use case. In Design, each such role gets a dashboard page, its starting page by default. The dashboard has one panel per factor, showing value against target and status, and each panel leads to the records behind the measure and to the action.

2026-10-04 — 0.3.45 — The Prototype's first step renders its data model.

- **Step 1 renders the logical data model.** The [Prototype](features/prototype/prototype.md)'s first step now says how each diagram is drawn: the use cases in Mermaid; the logical data model in Graphviz DOT (`erd.dot`), rendered to `erd.svg` with `mde render-diagrams` and embedded in `erd.md`, never redrawn in Mermaid. The step is shown only when `mde render-diagrams --check` passes. The Method acceptance test found an agent that wrote the DOT source, then drew the model again in Mermaid and never rendered it.

2026-10-04 — 0.3.44 — Requirements start from industry patterns; Status has a fixed shape.

- **Industry patterns.** A new [Feature](features/business-requirements/industry-patterns.md), in the business-requirements and Prototype Targets: when eliciting a domain, consult the [MDE Industry Patterns](https://github.com/AI-MDE/Industry-Patterns) catalog, take the closest pattern's concepts, relationships, lifecycles, baseline rules, and roles that the business needs (in the variant the Goal needs, Simple for a prototype), named in the business's own words; turn its modeling questions into Questions with defaults; check the model against its anti-patterns; and record what informed the model in the [Domain](metamodel/requirements/domain.md)'s new `## Industry patterns` section (or that none matched, or that the catalog could not be reached).
- **Status's shape.** [Status](metamodel/work/status.md) has one section each, in order: `## Stage`, `## Approved`, `## Progress`, `## Next` (and `mde init` writes it so). The Prototype's four steps are its stages. The Method acceptance test found that an agent following the old template (Progress and Next only) never wrote the stage and its state.

2026-10-04 — 0.3.43 — Diagrams live with their section; one command, `/proceed`, moves the work forward.

- **Diagrams live with the section whose knowledge they show**, in its `diagrams/` folder, read and reviewed with the Specs they depict: `specs/requirements/diagrams/` holds the use cases and their behavior, the logical data model, and the significant business lifecycles; `specs/architecture/diagrams/` the architecture and the interaction between its layers; `specs/design/diagrams/` the physical data model, navigation, and every other state diagram. They were under `docs/diagrams/`, an area the manifest does not declare. The [Interaction Diagram](metamodel/architecture/interaction-diagram.md) moves from Design to Architecture: it shows how the layers and components communicate (who calls whom, by what means, in what order) on the main request path and in each key scenario that crosses another boundary, and is created with the architecture diagram. The architecture `diagrams` Feature takes its rules and gains Checks it lacked; the application-design `diagrams` Feature, which held only that rule, is gone.
- **One command moves the work forward.** [`/proceed`](commands/proceed.md) replaces `/start`, `/next`, `/build`, and `/go`: from the state of the work, it starts (records the Goal and the Strategy), applies answered questions, continues the stage under way, or, when a stage is done, records the user's approval and starts the next; after the last, it says whether the Goal looks achieved. The commands are now `/proceed`, `/verify`, `/review`, and `/release`.

2026-10-04 — 0.3.42 — What an agent reads, and commands that follow the flow.

- **What to read.** The [bootstrap](bootstrap.md) has a reading map: what to read in every session, in a stage, for a kind of output (the matching Target and the Spec's concept), when verifying or choosing a stack, and for a command; and what an agent does not read unless asked: `features/` (the source the Targets are compiled from; the Target holds everything they require), `CHANGELOG.md`, and the Meta-model's tooling conventions (`metamodel/README.md`, `okf.md`, `metamodel-view.html`, `scripts/`). The Method is about 99,000 words; a stage needs a few thousand.
- **Commands follow the flow.** `/next` is new: the user moves to the next stage, which is their approval of the stage before; it is recorded in [Status](metamodel/work/status.md) under the new **Approved** entry, with the stage's state at the time (a stage left failed or blocked is recorded so, not as a pass; under Controlled, an unmet check needs the user's waiver). `/start` records the Goal, the chosen Strategy, the stages the work takes, and the first one. `/build` works as a stage runs. `/verify` runs `mde verify`, assesses the Targets' Checks, fixes a failure once, and reports. `/review` acts on the user's Reviews and Annotations (the agent never writes them). `/release` follows the release instructions. `/go` continues the current stage; moving on is `/next`. The "workflow profile" `/verify` mentioned, which existed nowhere, is gone.

2026-10-04 — 0.3.41 — Every link in the Method stays inside the Method.

An application gets its own copy of `method/` and nothing beside it, so a link out of `method/` (to the MDE repository's docs, its tools, or a work file of its own) was dead in every application, and two links pointed at files that no longer exist. Fixed: the Cucumber profile link in [architecture/testing](architecture/testing.md) now names the Gherkin traceability Feature; requirements visualization in the Requirements stage points at the Prototype Strategy; the Markdown DSL library, the features cleanup record, and two changelog entries are named, not linked. The Method's contract test now fails on any link that leaves `method/` or leads nowhere.

2026-10-03 — 0.3.40 — Development sign-in accounts are listed beside the seed.

The [runnable migrate/seed](features/persistence/runnable-migrate-seed.md) Feature: when the application has sign-in, the seed's development accounts are listed in the App area's `data/accounts.md` (one table, `Email | Password | Role`, fictional, development only), kept in step with the seed. The Workbench's App view shows them. The persistence Target and its verification are recompiled with the new rule and check.

2026-10-03 — 0.3.39 — A use case's Invoked Entity Operations have a readable form.

The [Use Case](metamodel/requirements/use-case.md) concept gives the Invoked Entity Operations format: one entity per line: a link to the entity, a dash, and its operations (`— Approve, Reject`), each operation named as the entity declares it. The Workbench reads it to walk the use case against live data.

2026-10-03 — 0.3.38 — One flow for every Strategy: stages in order, verified once-fixed, moved on by the user.

- Every Strategy works through a default sequence of stages: Requirements, Architecture, Design, App skeleton and tooling, Backend, Frontend, Testing, Docs. The AI takes those the Goal needs and says which it skips. Two new stage pages: [App skeleton and tooling](strategy/stages/skeleton.md) (dev setup and run app, moved from Backend) and [Docs](strategy/stages/docs.md) (documentation, moved from Release). Release follows the sequence when the user asks for one.
- [How a stage runs](strategy/guided.md#how-a-stage-runs) replaces the step loop: read Work, Specs, and App; plan; produce, guided by Targets and shaped by the Meta-model; record and trace; verify; report status (passed, failed, or blocked on a question) with the recommended next step.
- A failed verification gets one fix and one more verification; if it still fails, the work stops and the user decides.
- Moving to the next stage is the user's decision, and is the approval of the stage before.
- The Strategies differ in when verification happens: delayed for Prototype and Guided, immediate (at the end of every stage) for Controlled. Controlled no longer requires a review before acceptance.
- Review is the user's feedback and corrections to the Specs, at any time; it never holds up the work unless the user sets a review to wait on.
- The [Prototype](strategy/prototype.md#stages-in-a-prototype) Strategy maps each stage to what it becomes on the runtime (Backend is the runtime plus seed data; no skeleton) and on a full stack.
- [Status](metamodel/work/status.md) records the stage and its state; [Goal](metamodel/work/goal.md): the AI says when it looks achieved, the user decides and sets the next.
- The docs (goals and strategies, workflow, operating concepts, prototyping) describe the same flow; the outdated prototype "phases" are gone.

2026-10-03 — 0.3.37 — A reference type may be written `Client ref`.

The [Entity](metamodel/requirements/entity.md) concept lists `Client ref` beside a bare entity name as a reference type, as specs commonly write it; the runtime reads both.

2026-10-03 — 0.3.36 — A prototype's pages call the runtime through the Workbench.

The [prototype](features/prototype/prototype.md) Feature's generated pages call the MDE runtime's API as the Workbench serves it for the application (`mde workbench <app>`), rather than a separate `mde runtime` process, which is removed (tools 0.3.35). A frontend on a local development server calls it directly.

2026-10-03 — 0.3.35 — A prototype is usable as soon as its sample data exists.

Now that the runtime runs entity specs as written, the [Prototype](targets/app/prototype.md) Target says the prototype is usable after step 2: once the sample data exists, the user tries the application live in the Workbench with no code (lists, profiles and related records, create and edit forms, state changes, use cases), and `mde runtime` serves the same as an API. Step 4, generated pages, is optional, for when the user wants the application's own look and page flow. The [prototype](features/prototype/prototype.md) Feature states the seed's form (each entity's records under its name, `id`s for referenced records, parents before children, the spec's state values), that it loads on the first run into `app/data/data.json` (delete it to reload), and that role-based behavior needs each entity's Authorization written as the table.

2026-10-03 — 0.3.34 — The runtime runs an entity from its spec as written.

The MDE runtime read only JSON entity definitions, so an application specified the Method's way (Markdown entity specs) gave it an empty model, and a prototype's data and pages had nothing to run on. It now reads the [Entity](metamodel/requirements/entity.md) spec itself: attributes (types, enum values, references, the key), single-valued relationships as references (the other side is derived), operations (Read gives listing and viewing; a prohibited one is left out), states, transitions written `Active → Inactive: Deactivate`, and authorization written as an operation-by-role table of Yes, No, or Conditional, which it enforces. The Entity concept documents these forms; prose authorization stays readable but is not enforced, and rules are not executed. An entity defined both in Markdown and in JSON is refused, so the two cannot drift.

2026-10-03 — 0.3.33 — A prototype's pages are generated against the runtime's API.

Step 4 of the [Prototype](targets/app/prototype.md) Target no longer needs page specs or a UI catalog: the AI generates the frontend from what the user agreed in steps 1 to 3 (the requirements, the data profiles, the page set and navigation), in the chosen stack's frontend technology and UI profile (a React app with Carbon for `nest-carbon`) where the stack's frontend lives, or as plain static pages in `app/prototype/` with no stack. The pages call the MDE runtime's API, served on its own port by `mde runtime <app>`, separate from the Workbench (`GET /model`, `GET /data/<entity>[/<id>]`, `POST`/`PATCH`/`DELETE /api/<entity>[/<id>]`, `POST /api/<entity>/<operation>`, `POST /use-cases/<name>/run`), sending the acting role in `x-role` and `x-actor`; a frontend on a local development server calls it directly, with the runtime's address in its configuration. There is still no backend code and no SQL. A correction about meaning goes into the Specs; one about the pages, into the generated frontend. When the next Goal is to build, the generated frontend can be carried over, its calls moved to the real API, and the page specs are written from the pages the user agreed.

2026-10-03 — 0.3.32 — A prototype is a mode of the Prototyping Strategy, not a stack.

The `prototype` stack added in 0.3.31 is removed. A prototype is always shown by the MDE runtime against JSON data, whatever stack the application has: steps 1 to 3 of the [Prototype](targets/app/prototype.md) Target (use cases and data model, the data with navigation, the site navigation) do not depend on the stack, and only step 4, the pages, takes the chosen stack's UI profile (its `ui:` setting), or a neutral style when no stack is chosen yet. Choosing a stack is optional during a prototype and is not a commitment to build on it.

Step 4 now describes what the runtime supports today: each page spec's structure shown in the Workbench, with its interactions tried live against the data (each entity's list, profile, and forms with related records, and each use case run step by step). Rendering a page spec itself as a working page in the stack's UI profile is not yet supported, and is recorded as a limitation when the pages are shown.

2026-10-03 — 0.3.31 — A prototype is shown in four visuals, on the MDE runtime against JSON data.

A prototype is the application shown to the user, and corrected, before it is built. It now has its own Target, Feature, and stack:

- **The [Prototype](targets/app/prototype.md) Target**, compiled from the new [prototype](features/prototype/prototype.md) Feature, makes it in four steps, each shown to the user and corrected before the next: (1) the use-case and logical data model diagrams; (2) the data with navigation: the primary entities, each with a data profile and connected fictional sample data in the runtime's JSON data, browsed from a list to a record to its related records; (3) the site navigation: the page set and the navigation diagram; (4) the web pages, from page specs and the UI catalog, rendered live by the runtime against the same data. Everything shown comes from the Specs and the JSON data; no frontend or backend code, SQL, or migrations are written for a prototype.
- **The prototype stack** (`stacks/prototype.yaml`, since removed): the MDE runtime, in the Workbench, against JSON data (`app/data/seed.json`), with the business-requirements, UI design, and Prototype Targets.
- **The [Prototyping Strategy](strategy/prototype.md)** always applies the Prototype Target and uses the prototype stack by default; the planned "prototype stack with simulated backend" phase is now how a prototype is made. When the user chooses a full stack instead, the prototype is the application itself, with the checkpoint, the runnable baseline, and running it before reporting it ready, as before. The prototype's Specs carry over as the starting point when the next Goal is to build.

2026-10-02 — 0.3.30 — Page specs and the UI catalog are written so they can be checked.

Page specs and the UI catalog restated what other layers define, and nothing tied them together: UI had the weakest verification. Their references now follow formats a tool can check (`mde verify`'s UI row):

- A Page (`metamodel/design/page.md`, since removed)'s Users link the role specs; an action that changes or fetches data names the entity operation it invokes as `` `entity.op` `` (`` `employee.create` ``), an action that only navigates links the page it opens; Navigation links page specs.
- The UI catalog (`metamodel/design/ui-catalog.md`, since removed)'s Page column is the page id (the spec's file name), a route belongs to one page, and operations deliberately without a page are listed under `## Operations without a page` with the reason.
- A scenario that performs an entity operation is tagged with it (`@employee.create`, the `gherkin-traceability` Feature), so each operation a page offers is tied to its test.
- The `ui-catalog` and UI design `operation-coverage` Features check these; the Evidence Package has a UI row.

2026-10-02 — 0.3.29 — A prototype is agreed before it is built, and it starts on its own.

A new application under the Prototyping Strategy was generated with no stop for the user, without design, and handed over with instructions to create its database by hand; `mde:start` then failed.

- **The checkpoint.** Before any application code, the [Prototyping Strategy](strategy/prototype.md#before-building-the-checkpoint) shows the user, together, the conceptual requirements (entities and relationships, roles, use cases), a minimal architecture (`specs/architecture/overview.md`: languages and frameworks per tier, the database, how the application runs), and a minimal design (the page set, one line per page, and the data model as the entities' Storage Views), and waits for an explicit go. It is the Strategy's one gate.
- **The runnable baseline.** Even with no Targets selected, a prototype follows the runtime scripts, start and health, configuration, and runnable migrations and seeds Features from the start. The [runnable migrations and seeds](features/persistence/runnable-migrate-seed.md) Feature now requires the project to create its database when it is missing (`mde:start`, or a `db:create` step it runs first), reporting the exact connection when it cannot, and rules out schema auto-synchronization as a substitute for migrations; [start and health](features/server/app-start-contract.md) brings up the application's own database before its components. The persistence and server Targets carry both, recompiled, so Guided and Controlled work gets them too.
- **Run it before saying it is done.** The prototype is reported ready only after the agent has run `mde:install`, `mde:start`, and `mde:health` from a clean state and gone through each page; a failure is reported with its actual error and fixed, never handed to the user as setup steps.

2026-10-02 — 0.3.28 — An entity's storage lives in the entity file only.

An application kept its physical data model in a separate file, `specs/design/data/physical.md`, beside the entities' own Storage Views, and the entity specs, that file, and the migrations drifted apart (`hire_date` against `start_date`, a missing `employment_type`, `project_role` against `role_on_project`). The Method had invited the second copy: the Data Model named both `specs/design/data-model.md` with its tables and a Storage View on each entity. The earlier rule is back: one entity, one file.

- The [Data Model](metamodel/design/data-model.md) is the set of entities' `## Storage View` sections; there is no separate data model file. Conventions that span entities (column naming, shared types, migration rules) belong in the architecture's persistence topic.
- A Storage View's column table is `Column | Attribute | Type | Constraints`: every attribute has exactly one column, and a column that stores no attribute says what it is (key, foreign key, audit, version), so a rename is one edit of the attribute and its row.
- A Storage View starts with ``Table: `<name>` ``, so a tool can find its table.
- The `storage-view-model` Feature (persistence design) says to fill the entity's Storage View and never create a separate physical model file or restate the attributes, with a check for both. The persistence-design Target no longer lists a data model file among its outputs, and the physical data model diagram is drawn from the Storage Views. The Specs folder catalog no longer has a `specs/design/data` folder.

2026-10-02 — 0.3.27 — The Features compile into the agreed Targets, with the Method's own compiler.

0.3.26 stripped the Targets instead of cleaning up the Features. This undoes that: every rule and check of the Targets agreed before the strip (0.3.25) is back, and now comes from a Feature, compiled by the Method's earlier compiler, [`scripts/compile-targets.mjs`](scripts/compile-targets.mjs), with its logic unchanged. No Target is edited by hand.

- **How a Target is compiled.** Only its skeleton is authored: frontmatter (`id`, `title`, `applies_when`), Purpose (what it is for and what it governs), and Outputs. Its *Composed behavior* is each contributing Feature's *Impact on* section, tagged `[feature: <id>]`; its checks compile into `targets/verification/<target>.md` and the Features' *Audit* into `targets/audit/<target>.md`; `targets/catalogue.json` indexes them. Two changes to the compiler: links in copied Feature text are re-based, so they resolve from the Target's folder; and it no longer writes `targets/aspects-catalogue.json`, since aspects are independent of Features and their catalog is `metamodel/aspects.json` (`metamodel/aspects.json`, since retired).
- **Features trimmed to the agreed Targets.** A Feature's `impacts` names only the Targets that include it; 89 *Impact on* sections the agreed Targets never included moved to the Feature's *Detail* section, which compiles nowhere (11 Features, mainly architecture ones whose guidance lives in `architecture/`, now feed no Target). Each remaining *Impact on* section and Checks section holds the agreed text. *Impact on api* and *Impact on persistence* come before *Impact on api-design* and *Impact on persistence-design*, because the compiler takes the first heading that begins with the id.
- **New Features for what the Targets held themselves**: the business-requirements concept rules (domain, capability, entity, use case, business rule, role, business event, workflow, glossary, aspects, diagrams); application design (what design does, policy in requirements, use-case and aspect realization, the capability index, verifying requirements and design, diagrams); UI design (the page set, actions and their target, maintenance, operation coverage, the built page, diagrams); architecture (resolving selections into Specs, content, conformance, diagrams); API design and persistence design rules; dev setup's readiness logs; testing's running the tests; and checks spanning several Features of one Target. Evidence attaches to existing Features (the Evidence Package to `evidence-attachment`, test reports to `use-case-execution-report`, code coverage to `code-coverage-matrix`), with new `features/evidence/` Features for test coverage and the architecture review.
- **No duplicated guidance.** Seven Features that fed no Target and repeated what now lives elsewhere are removed: `authentication`, `business-event-recording`, `layering-boundaries`, `repository-pattern`, `transaction-boundaries`, and `capability-slices` (their guidance is in `architecture/`), and `carbon-ui-profile` (it is the stack profile `stacks/carbon-ui.md`). `ui-patterns` no longer repeats the preferred page patterns, which the Page (`metamodel/design/page.md`, since removed) concept defines.
- Links to the agreed Targets' section anchors now point to the Feature that holds the rule. The Targets and Features READMEs and the Targets index describe the compiled shape.

2026-10-02 — 0.3.26 — Targets list their Features instead of copying them.

With Features back as the source, the Feature guidance that 0.3.19 had copied into the Targets comes out of them, so each piece of guidance lives in one place.

- **Every Target has a Features section**: each Feature whose `impacts` names it, with a one-line purpose. The agent reads the Target, then the *Impact on* section and Checks of each listed Feature that applies to the work. The Targets README describes the shape: Applies when, Governs, Outputs, Features, Rules (only what no Feature supplies), and Checks.
- **Feature-built Targets** (API, deployment, integration, persistence, run app, server, testing, web UI, Method change) keep their scope and outputs, and their Checks ask that the outputs exist and pass the listed Features' Checks. Their rules were all Feature content.
- **Targets with their own judgment** keep it and drop what a Feature supplies. Business requirements: business-transaction analysis and governed values. Application design: decisions and traceability, and sample data. UI design: the page set, pattern selection, operation coverage, and the UI catalog. Persistence design: storage-view derivation, audit history, and optimistic locking. Development setup: the install-dev script. Documentation: the guide and release-note rules. Architecture, API design, and evidence are unchanged.
- **Features catch up** where the Target held the newer decision. The user guide explains how to perform every implemented use case, step by step with a screenshot per step (`app/docs/`). Documentation is updated in the same step as the change. Release notes come from the Git range and become the release tag's message. Sample data is a concrete design output. Evidence and guide paths in the restored Features now follow the current layout: `evidence/tests/logs/`, the Evidence Package, `evidence/coverage/`, and `app/docs/`.
- Links into removed Target sections now point to the Feature: operation coverage, runtime scripts, and data sources.

2026-10-02 — 0.3.25 — Features are back, as the source of the Targets.

The Feature catalog (`features/`), removed in 0.3.3 through 0.3.19 as its Features were folded into the Targets, the Strategy, the Meta-model, and the architecture, is restored: all 109 Features, each as it was just before its removal. Features are the source; Targets are compiled from them. A Feature's `impacts` names the Targets it contributes to, and its *Impact on* sections and Checks become those Targets' Rules and Checks. Guidance is changed in the Feature, and the Target is recompiled. The [Features README](features/README.md) and the [Targets README](targets/README.md) say so.

2026-10-02 — 0.3.24 — Progressive elaboration and the Prototype's phases.

- Requirements work starts conceptual and descends (conceptual, structural, behavioral, detailed, implementation) only as far as the Goal needs, whatever the Strategy. The [Requirements stage](strategy/stages/requirements.md#progressive-elaboration) states it for Guided and Controlled. Controlled may require more depth, but still starts conceptually.
- The [Prototyping Strategy](strategy/prototype.md) describes its Phase 1 behavior (no Targets, light requirements, the whole application built normally on the selected stack, no simulated backend) and a phased roadmap: a prototype stack with a simulated backend is planned for Phase 2, and Phase 3 is reserved. It prefers infer, propose, visualize, and let the user correct over repeated questioning.
- Requirements and UI visualization are optional capabilities, not Strategies or gates; see Prototyping and Progressive Visualization in the MDE documentation (`docs/prototyping.md`).

2026-10-02 — 0.3.23 — Three Strategies, one file each.

`strategy/` mixed whole Strategies with the parts of one: its README was at once the folder's introduction, the Guided Strategy with its soft and strong rigor, and rules meant for every Strategy, beside a complete Prototyping Strategy and seven stage pages that only Guided used. Now each file in `strategy/` is a Strategy, and an agent reads just the one Current Work links:

- **[Prototype](strategy/prototype.md)**: discover and demonstrate; no Targets or Evidence required. Unchanged.
- **[Guided](strategy/guided.md)** (formerly Guided at soft rigor): the stages, the step loop, questions, findings, review, and user authority, with advisory controls. The Architecture choice and the release still block.
- **[Controlled](strategy/controlled.md)** (formerly Guided at strong rigor): Guided plus what changes. Controls block until satisfied or waived, open questions wait for an answer, proposed defaults need confirming, consequential work is reviewed, and a release is verified.

The stage pages moved to `strategy/stages/`. Each states Guided's behavior, with a **Controlled** line where Controlled differs, instead of soft and strong pairs. The README is gone. What `work/` may hold, which applies whatever the Strategy, moved to [Current Work](metamodel/work/current-work.md#location), including the list of what never goes there. Current Work links the Strategy file and no longer records a rigor.

2026-10-02 — 0.3.22 — What belongs in `work/`.

An agent used `work/current/` as a scratch area: one-off repair scripts, test screenshots and traces under `logs/`, its own impact analyses under `reviews/`, and design decisions and elicitation notes under `notes/`. The Method had said that notes, reviews, and logs live in `work/current/` without saying what they are, and the Workbench actually keeps the user's reviews and annotations in `work/reviews/` and `work/notes/`.

- Current Work now has a Location table listing everything `work/` may hold and what writes each item: the Goal, the current work's README, status, questions, findings, release notes, the latest method-update report, the user's reviews and annotations, and `work/history/`. Nothing else belongs there.
- New Work concepts **Review** (`work/reviews/<id>.json`: a review session the user conducts in the Workbench, page statuses and notes between two commits) and **Annotation** (`work/notes/*.jsonl`: notes the user attaches to documents and page elements).
- The Strategy's Review section says reviews and annotations come from the user; the agent reads them, makes the changes, answers in Specs or questions, records what it cannot resolve as Findings, and never writes them. "Work and durable knowledge" says what never goes in `work/`: scripts (deleted after use, or kept in the App area as a project operation), test output and logs (evidence), the agent's own analyses (conclusions in findings and status, not separate reports), durable knowledge (Specs), and copies (Git).

2026-10-02 — 0.3.21 — Prototyping Strategy and deferred verification.

The active Goal selects a Method-owned Strategy: Prototyping allows direct iteration without required Targets, formal design artifacts, verification, or Evidence; Guided retains its soft/strong rigor and stage controls. Targets are optional until selected by Strategy. Guided work can commit steps pending verification and verify at a dedicated activity. Bootstrap and Method descriptions now honor Strategy authority over Target selection and Evidence.

2026-10-02 — 0.3.20 — The AI explores the aspect catalog for every concept.

The business-requirements Target gains an **Aspects** rule and checks: for the application, each entity, its attributes and relationships, its operations, and each use case, go through the catalog entries (`metamodel/aspects.json`) whose `appliesTo` matches and decide from the business need whether to declare one (with its options), leave it out, or ask with a default; never declare one to fill a checklist. The Aspect concept is rewritten as shape only: Location (the catalog; declarations in the owning concept), the structure of a catalog entry and of a declaration, and relationships; its stale mention of Method Features is gone. Domain and Use Case gain an Aspects section, as Entity already had.

2026-10-02 — 0.3.19 — Every Target in the new shape; the Features are gone.

All Targets now have one shape (Applies when, Governs, Outputs, Rules, Checks) and the remaining 79 Features are folded into them; `features/` is removed. Each Feature has one home:

- `api` (the six API Features: boundary and coverage with `// MDE` markers, contracts, validation, status codes, rule-identifying rejections, a generated and validated `openapi.yaml`, proving endpoints and rules are real); `server` (slices and layers, source trace, boundary validation, runtime scripts by role, operations map, start and health, configuration, logging, serving under a base path); `dev-setup` (`install-dev` and its readiness logs, declared dependencies); `run-app` (build and full regression); `persistence` (schema, atomic and runnable migrations, seeds, audit history, optimistic locking, proof against a real database with a schema dump), with the design halves of audit and locking in `persistence-design`; `integration` (specification, adapter isolation, ownership, reliability, tests, data conversion); `deployment` (the production runtime baseline, and container, orchestration, cloud, and reverse-proxy folders when selected); `testing` (running tests, techniques, scenarios, real-browser UI tests asserting outcomes, captured UTF-8 output with the server's own log, classification, reports, coverage), which also takes the Strategy's Testing guidance; `web-ui` (controls that act on the right object, lifecycle changes, data and display labels, business dates, states, styling, selectors, navigation, the shell, login and route guard, data sources, and the development affordances: role switcher, annotations, guided workflows); `method-change` (each layer keeps its job, consistency, versions, incoming files).
- The Carbon UI profile becomes a stack profile, `stacks/carbon-ui.md`, used by `nest-carbon`.
- The deprecated prototyping Target is removed (its facets are in `web-ui`), as are `targets/verification/` (each Target carries its own Checks) and the stale `targets/catalogue.json`. The Targets index is rewritten by area; the Method README describes Targets instead of Features.
- Evidence paths move from `reports/` and `work/current/verification/` to `evidence/tests/` and `evidence/coverage/`.

2026-10-02 — 0.3.18 — Documentation and Work: the last concepts become shape only.

The `documentation` Target is rewritten in the new shape and holds the guides' rules (as built, updated in the same step as the change, a mismatch is a Finding, real configuration, screenshots from the running application) and the release notes' (from the Git range, grouped, with reasons, limitations disclosed, the tag message, `CHANGELOG.md`), with their Checks. Its outdated outputs are dropped (per-capability docs; the diagrams belong to the requirements and UI design Targets) and its verification view is removed. The Strategy core gains **Findings and questions**: how questions are asked, kept, and resolved, and how findings are kept and closed, with rigor deciding whether open questions block. Documentation, Release Notes, Finding, and Questions keep only their structure. The requirements Target gains the review of material ambiguity before requirements are claimed complete.

With this, every type definition in the Meta-model is shape only.

2026-10-02 — 0.3.17 — Evidence: a Target of its own.

A new `evidence` Target (`targets/app/evidence.md`) holds what good evidence looks like and how to check it: the Evidence Package (written by `mde verify`, never a missing check shown as passed, only linked details, provenance on the page alone, release needs it current), test reports (not-run and skipped shown as such, every scenario naming its spec ids, server logs kept), test coverage (rows from the Specs, gaps visible), code coverage (real instrumentation, instrumented runs named, matrix from Specs and Architecture, gaps as Findings, exclusions listed), and the architecture review. The Evidence concepts keep only their content and structure. The Strategy's Testing and Release stages, its stage table, and every stack's Targets in scope include it.

2026-10-02 — 0.3.16 — Design: shape in the Meta-model, judgment in the Targets.

The four design Targets are rewritten in the new shape and hold all design judgment:

- `application-design`: what design does, policy staying in requirements, decisions and traceability (from the Strategy's Design stage), use-case realization, aspect realization, sample data, the capability index, and verifying requirements and design (from the removed Verification concept), with the interaction diagram's maintenance.
- `ui-design`: the page set and patterns, action targets (no fallback to a first record), terminal scope, list behaviors, maintenance ownership, operation coverage, the built page, the UI catalog, and the navigation diagram. The `ui-design/` and `ui-shared/` Features (page defaulting, UI catalog, page patterns, operation coverage) are folded in and removed.
- `api-design`: operations and access on entities, no design-time endpoint table; an API Contract only for outside consumers.
- `persistence-design`: storage following the entities, keys, constraints, migrations, and the physical data model diagram.

The design concepts keep only shape: the Design README says where design knowledge lives (its ownership table and the capability index), Page keeps its structure, page patterns, and composition vocabulary, Data Model its structure and Storage View, and API Contract and Integration gain explicit Locations. A new UI Catalog concept defines the one-row-per-panel inventory. The Verification concept is removed. The Strategy's Design stage keeps only its control. The design Targets' verification views are removed; Features not yet folded are listed in each Target.

2026-10-02 — 0.3.15 — The architecture Features are part of the chosen architecture.

The ten Features in `features/architecture/` are rules of the mdex-application architecture, so they fold into its topic documents in `architecture/`, each now ending with Conformance checks; the folder is gone.

- `overview.md`: capability slices, layering (capabilities talk through interfaces; UI, routes, services, repositories each in their place), explicit cross-cutting concerns, and **one request context** (correlation id, principal, transaction) established at the boundary and passed down.
- `domain-and-access.md`: transaction boundaries owned by the service layer, the identity context, authentication, and one shared access enforcer.
- `persistence.md`: the repository per capability as the persistence boundary.
- New `business-events.md`: one shared recorder, an immutable journal with delivery kept separate, recording in the business transaction (transactional outbox for publication), and the journal as evidence.

The architecture Target's conformance rule checks these; it still lists the six Features that belong to other areas. Targets, verification views, and Features that referred to the removed ones point at the topic documents.

2026-10-02 — 0.3.14 — Architecture: shape in the Meta-model, judgment in the Target.

The `architecture` Target is rewritten in the new shape. Its Rules hold how to resolve the chosen architecture and stack into Specs (moved from the Architecture concept), what the overview contains, conformance of the code, and when to create and update the diagrams the architecture relies on; its Checks cover them. The Architecture concept keeps its definition, Location, the structure of a decision, and its relationships (the chosen architecture, the stack, the diagrams); the Architecture Diagram concept loses its Maintain section. The Target lists the 16 Features it still relies on until they are folded, and its verification view is removed. Links to "Resolve selections into Specs" point at the Target.

2026-10-02 — 0.3.13 — Requirements: shape in the Meta-model, judgment in the Target.

The `business-requirements` Target is rewritten in the new shape (Applies when, Governs, Outputs, Rules, Checks). Its Rules and Checks now hold everything the requirements concepts used to say about doing them well: each concept's guidance and checks, Entity behavior, the Use Case business-transaction analysis, which occurrences qualify as business events, glossary scope, when to create a workflow, when to create and update each requirements diagram, and governed values (from the `governed-values-from-specs` Feature). The requirements concepts keep only their definition, Location (now explicit for every concept), Structure, and Relationships, and link to the Target. Its verification view is removed; the views that pointed at Entity and Use Case checks point at the Target's Checks.

2026-10-02 — 0.3.12 — The Meta-model is shape; Targets are judgment.

The OKF contract (`metamodel/README.md`) gains rule 6, *Structure only*, and a "Shape, not judgment" section: a type definition holds a concept's definition, location, structure, and relationships; what good looks like, how to write and maintain it, and how to check it belong to the Target that governs it. The Targets README is rewritten around the Target shape (Applies when, Governs, Outputs, Rules, Checks) and how the Strategy's step loop uses Targets in scope. The existing definitions have not moved yet; that follows area by area.

2026-10-02 — 0.3.11 — No more `defaults/`: `architecture/` and `stacks/`.

- `defaults/architecture/` moves to `architecture/`: the technology-independent guidance. Its `overview.md` now carries in its frontmatter the name, description, and layers of the architecture a project chooses (`mdex-application`), and `architecture/README.md` explains the folder.
- `defaults/architectures/`, which held only that one preset, is removed.
- `defaults/stacks/` moves to `stacks/`. Each stack preset now ends with `targets:`, the Targets in scope for an application on that stack, which the application records with its resolved stack and the Strategy's step loop chooses from.

The Method README, the Architecture concept, and the Strategy's Architecture stage point to the new folders.

2026-10-02 — 0.3.10 — One Strategy, by stage.

The Strategy moves from `defaults/strategies/soft.md` and `strong.md` to `strategy/`: one Strategy whose rigor, `soft` or `strong`, a project records in `work/current/README.md`.

- `strategy/README.md` is read in full: the two rigors, the control principle, the stages, the step loop, review, Work and Specs, and user authority.
- One file per stage, in order: Requirements, Architecture, Design, Build: backend, Build: frontend, Testing, Release. Each states its control at both rigors side by side and links the Targets it uses.
- The step loop uses Targets: before a step, take the Targets in scope (recorded in `specs/architecture/` when the stack is resolved) whose *applies when* matches the step; follow them; at the end, check their checks, run `mde verify`, record findings, commit. The old "Target contracts and verification gate" section is replaced by it.
- Testing instructions and Cucumber move to the Testing stage; release instructions to Release; design guidance to Design.

Bootstrap, the Method README, the Strategy concept, the start command, and the documentation point to `strategy/`.

2026-10-02 — 0.3.9 — The documentation Features are part of the Meta-model.

The six remaining Features in `features/documentation/` are removed; the folder is gone.

- Code coverage matrix → Code Coverage: one row per required operation (from the Specs), one column per Architecture layer, and each cell says whether that layer is not implemented, not tested, partly tested, tested, or not applicable. A missing layer is a Finding against the requirement; an untested one against the tests. The page also says which test runs were instrumented. The Evidence Package row gives line coverage and the gap counts.
- Operator guide → Documentation, as its Operations guide section (configuration, install, deployment, start, stop, health, troubleshooting, from the real configuration). It is `<app>/docs/operations-guide.md`, the name the concept already used.
- Capability docs → Documentation's rules: update, in the same step, the documentation a change affects (user guide sections of changed use cases, the operations guide, API documentation).
- Stale-doc detection → Documentation's rules: a guide or screenshot that no longer matches is a Finding.
- Changelog → Release Notes: give the reason for each change, and a project that keeps a `CHANGELOG.md` adds each release's notes to it.
- Evidence attachment → already covered by the Evidence Package.

The documentation and deployment Targets and their verification view link to these concepts.

2026-10-02 — 0.3.8 — The user guide explains how to perform each use case.

The user guide is organized around the use cases: getting started (purpose, roles, sign-in, navigation), then one section per use case, grouped by role, with its goal, preconditions, the steps as the user does them with a screenshot at every step, the result, and what can go wrong; then the glossary terms the user meets. This takes over the per-use-case walkthroughs (`docs/walkthroughs/`) the capability-docs Feature used to require, so the steps are written once. Screenshots live beside the guide in `<app>/docs/screenshots/<use-case>/`, preferably captured by the UI test that proves the use case. A large guide may use one page per use case under `<app>/docs/user-guide/`.

2026-10-02 — 0.3.7 — The User guide Feature is part of the Documentation concept.

The Documentation concept now defines the user guide itself: one whole-application manual for a non-technical user (purpose, sign-in, main screens, every primary task), linking to the per-use-case walkthroughs instead of repeating them, with screenshots of the running interface, plus its Checks. The Feature is removed; the documentation Target and its verification view link to the concept.

2026-10-02 — 0.3.6 — Test Report, Test Coverage, and Code Coverage are back.

They remain concepts of their own, defining the details in `evidence/tests/` and `evidence/coverage/`; the Evidence Package summarizes each in one row and links to it. They no longer carry per-file provenance: only the Evidence Package records when it was produced and from which commit.

2026-10-02 — 0.3.5 — The guides live in the App area.

The user, administrator, and operations guides ship with the product, so they live in the App area's `docs/` folder (`app/docs/`), not in the project's `docs/`, which keeps the diagrams. Documentation, the Evidence Package, bootstrap, the Method README, and the strong Strategy say so.

2026-10-02 — 0.3.4 — Evidence is one page.

`evidence/README.md`, the Evidence Package, is the page a reviewer reads: a verdict, one provenance line, a status table with a row per check (build, tests, test coverage, code coverage, architecture review, documentation) linking to the details, and the open findings. Everything else in `evidence/` is the tool output it links to; nothing else is added there.

- The Evidence area keeps two concepts: Evidence Package and Architecture Review. Test Report, Test Coverage, and Code Coverage are now rows of the package and the details they link to.
- The Evidence base concept and its per-file provenance and freshness rules are removed: only the package says when it was produced and at which commit.
- Findings move to Work (`work/current/findings.md`, [Finding](metamodel/work/finding.md)), with a summary table the package reads.
- The guides move to `docs/` ([Documentation](metamodel/documentation.md)), beside the diagrams; they are part of the product, not proof of it.
- Verification moves to Work, as guidance both Strategies use.

Bootstrap, the Method README, and both Strategies describe the new layout.

2026-10-02 — 0.3.3 — Seven Features folded into the Strategy and the Meta-model.

- Design decisions log and Traceability to business specs → both Strategies, in a new "Design decisions and traceability" part of Design control: record significant choices in `specs/design/design-decisions.md`, trace every design artifact to the requirement it realizes, trace use cases by step id, and treat a nominal "traces to" line as drift.
- Business transaction analysis → the Use Case concept, as its "Business transaction" section and Checks: business condition, objects by role (driving, result, supporting, impacted), business-result goals, one trigger per use case, quantified fulfilment, and situations stated as test conditions.
- Change rationale → the Changelog Feature: entries give the reasoning, not only the change.
- Release notes → a new Work concept, Release Notes (`work/current/release-notes.md`), which becomes the release tag's message; both Strategies' release instructions point to it.
- Schema from entities and Physical data realization → the Data Model design concept, with Guidance and Checks: storage follows the entities and their Storage Views, migrations create every declared column, and APIs do not leak database details.

Targets and verification views now link to these homes. The Feature files are removed.

2026-10-01 — 0.3.2 — Agents are told about the Evidence area.

`mde.json` now locates five areas, adding Evidence (`evidence/`). Bootstrap tells the agent that Evidence is what a reviewer reads instead of the code, to run `mde verify` after changing the application, and to keep the written evidence (guides, architecture review) current. The Method README describes the area. Both Strategies run `mde verify` at the end of a step that changed the application and check the evidence package before release; `strong` stores test reports, screenshots, and coverage under `evidence/` instead of `reports/`. The Test Report concept names the report `mde verify` writes.

2026-10-01 — 0.3.1 — The Method keeps a changelog.

`CHANGELOG.md` records what changed in each Method version, newest first, and travels with the Method into every application.

2026-10-01 — 0.3.0 — The Meta-model is organized by area, Evidence becomes part of the model, and concepts carry their own guidance and checks.

**The Meta-model is a hierarchy.** Type definitions moved from one flat folder into area folders: `requirements/`, `architecture/`, `design/`, `work/`, and `evidence/`. Type ids are unchanged (`type: entity` now resolves to `requirements/entity.md`), so no Specs change. A folder's `README.md` that declares `type: concept-type` defines the folder's type, and ids must be unique across the model. `mde update-app` recognizes the moves, so an application's copy is reorganized rather than duplicated.

**How MDE extends OKF is a written contract.** `metamodel/README.md` states the five additions (models, type definitions, `extends`, directory semantics, profile conventions), each with its status, and declares anything else outside the contract.

**Evidence is part of the model.** A reviewer who does not read the code reads the application's top-level `evidence/` folder. New concepts: Evidence (provenance and freshness), Evidence Package, Test Report, Test Coverage, Code Coverage, Documentation, Architecture Review, and Finding.

**New concepts.** Status, Questions (open questions live in `work/current/questions.md`), Glossary, Business Event, and the diagram kinds, each its own concept in the area that owns it: Use-Case, Use-Case Behavior, Logical Data Model, and State-Transition (Requirements); Architecture (Architecture); Interaction, Physical Data Model, and Navigation (Design). Diagrams live in `docs/diagrams/`; the data models and use-case behavior are Graphviz DOT rendered to SVG, the others Mermaid.

**Concepts carry their own guidance and checks.** Use Case, Business Rule, Role, Capability, Domain, Entity, Questions, Architecture, and Design gained Guidance and Checks sections, and the Page concept gained the Canvas/Panel composition model.

**Strategies.** Both Strategies gain Step control (verify, then commit, at the end of every step), Testing instructions, and Release instructions for `/release`.

**Work layout.** The Current Work is `work/current/README.md` (not `work/current.md`), with `status.md`, `questions.md`, notes, reviews, and logs beside it.

**Version.** The Method has its own version in `VERSION.md`, separate from the tools, and this changelog.
