# MDE AI Bootstrap

This is the entry point for an AI agent working with an MDE initiative.

## Bootstrap

1. Read the root MDE manifest (`mde.json`).
   - `mde.json` identifies and locates the five top-level MDE areas: Specs, App, Work, Evidence, and Method.
   - It is a locator, not a second source of application or Method knowledge. Do not place architecture, technology stack, features, Meta-model internals, Strategy definitions, runtime settings, navigation, or view configuration in it.
   - Resolve Method and its Meta-model through the `method` path rather than declaring the Meta-model separately in `mde.json`.
   - **If `mde.json` does not exist**, treat the initiative as new or not yet migrated and help establish the MDE context before normal work proceeds.
2. Resolve the Method from the manifest and use its Meta-model to interpret Specs.
3. Inspect the current Goal (`work/goal.md`) and Current Work (`work/current/README.md`) for the selected Strategy. If no Strategy is selected, propose one consistent with the Goal and record the user's choice. The Goal records its Strategy and scope; its Targets, with a record per Target and scope of the work (started, completed, verified, audited), are in `work/targets.json` ([Work Targets](metamodel/work/targets.md)): **whenever the Strategy or the architecture changes (its stack, or the Targets in `specs/architecture/overview.md`), review the Goal and propose its Targets anew**; record them once the user agrees. The file is empty (`{}`) until the architecture is settled. When you begin a Target's work on a scope, set that record's `started`; when the work is done and passes its verification, its `completed`: only completed Targets are graded.
4. Read the selected Strategy: [Prototype](strategy/prototype.md), [Guided](strategy/guided.md), or [Controlled](strategy/controlled.md) (which builds on Guided). For Guided and Controlled, read the relevant stage pages. Read only the Specs and App context needed for the request.
5. Work according to that Strategy. Prototype applies its Prototype Target on the MDE runtime, or its runnable baseline on a full stack; further Targets, formal design detail, the full verification, and Evidence are optional unless requested. Guided work selects applicable Targets. When the user changes the Strategy, in plain words, follow [Changing the Strategy](metamodel/work/strategy.md#changing-the-strategy) before going on.

   **Verify your own work, in every Strategy.** Each time you produce or change a Target's output, verify it yourself in the loop: `mde verify --current`, fix everything it reports, then verify again, until it passes. Each run builds and tests, so never run it to fix one item at a time. You run it, as part of the work: never ask the user to run `mde verify`, or any check, test, or build you can run yourself. When the same failure remains after a fix (the run marks it *same as the last run*), stop and record a Finding. Only when your environment cannot run commands at all, say so, and say what to run. What the Strategy decides is when the **whole** is verified and audited, and how much that gates the work; never whether you check your own work. **Only `mde verify` writes the Evidence Package** (`evidence/README.md`, `evidence/package.json`): never write or edit them yourself, not even to record what `--target` runs found; those go in Status. A package `mde verify` did not write is refused as Evidence.
6. Update the owning area: durable knowledge in Specs, executable realization in App, and execution context in Work. Produce Evidence only when the selected Strategy calls for it. Never present an unrun or missing check as passed, and never satisfy a check with its shape alone: a placeholder file, a stub, an empty handler, or a diagram of what does not exist passes no check; the audit reports it as fake.
7. Reassess the Goal and, when it changes, select and record the Strategy appropriate to the new Goal.

## What to read

Read only what the work in hand needs. Most of the Method is source material for its tools; an agent reads the compiled guidance, a few files at a time. Every file read stays in the context and is paid for on every step after it: read a page once, search before reading a large file, and never read `method/CHANGELOG.md` whole (`mde changes` prints the entries you need).

| When | Read |
|---|---|
| Every session | this file; `work/goal.md` and `work/targets.json`; `work/current/README.md` and `work/current/status.md`; the selected Strategy |
| Working in a stage | its page in `strategy/stages/` |
| Producing or changing a kind of output | the Target in `targets/` whose *Applies when* matches it (the stage page names them); before writing a Spec, its concept in `metamodel/` (`metamodel/index.md` lists them) |
| Choosing the optional Features a concept needs, or realizing them | the index, `optional-features/catalog.json` (or `optional-features/index.md`); a Feature's own file only once a Spec applies it |
| Writing a Markdown DSL block | `markdown-dsl.md` |
| Verifying (`mde verify`) | the Checks in `targets/verification/` for the Targets in scope, which `mde verify` proves |
| Auditing (`mde audit`), as the second agent: a sub-agent, or a new session, never the one that did the work | `commands/audit.md`, then `targets/audit/` for the Targets in scope |
| Choosing or changing the architecture or the stack | `architecture/`, `stacks/` |
| The user names a command: `mde proceed`, `mde verify`, `mde audit`, `mde review`, `mde release`, `mde update`, typed as text in any agent (there are no slash commands) | its page in `commands/`. `mde verify` and `mde update` also run a tool (`mde verify`, `mde update-app`), which you run yourself; the others are commands to you, not tools to look for |

Do not read these unless the user asks about them:

- `features/`: the build Features, the source the Targets are compiled from. Everything they require is in the compiled Target, in one place.
- The files of `optional-features/` that no Spec applies: an optional Feature is not a requirement until a Spec applies it.
- `CHANGELOG.md`: the Method's history. Read it only during an update ([`mde update`](commands/update.md)), from the version last reconciled to the new one.
- `metamodel/README.md`, `metamodel/okf.md`, `metamodel/metamodel-view.html`, `scripts/`: conventions for tools that read the Meta-model, not for doing the work.

For ordinary requirements and design work, prefer the source Specs over generated artifacts. Read rendered diagrams and `specs/design/authorization.json` when validating their rendering, generation, or runtime behavior; change their owning sources rather than treating generated output as an independent specification. Read relevant `evidence/` logs and reports for verification, failure diagnosis, review, and release decisions. Execution results contain observations the Specs cannot supply; inspect the affected reports and logs rather than loading all Evidence indiscriminately.

Read the Specs top down, a level at a time: a capability's overview first (it links rather than contains), then only the workflows, use cases, and entities the work touches. An entity's design (its file under `specs/design/`) is read only for design, persistence, or build work.

## Authority and boundaries

The user remains in control of the Initiative and may select a new Strategy for a new Goal or waive a control.

Strategy guides Activities; it does not impose a universal engineering workflow. Do not infer mandatory sequencing merely from framework documentation, commands, Meta-model definitions, defaults, or architecture guidance.

Commands express user intent; they do not add behavioral rules.

Meta-model files define the meaning and structure of application knowledge; they do not add workflow rules.

Architecture belongs in Specs and governs what is built. Strategy belongs in Method and governs how Activities are approached.

Skills and tools provide capabilities used to perform Activities; they do not replace Strategy.

Framework defaults are reusable starting points. Once an initiative-specific decision has been resolved into its owning area, use that resolved knowledge during ordinary work rather than repeatedly consulting defaults.

