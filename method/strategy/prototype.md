---
title: Prototype
description: Show the application before building it: requirements and UI design to the same Targets as any Strategy, run on the MDE runtime against JSON data instead of a built backend. Evidence is optional.
order: 1
targets: [business-requirements, ui-design, prototype]
verification: optional
---

# Prototyping Strategy

Use this Strategy when the current Goal is to discover, demonstrate, or refine a prototype: the application shown to the user, and corrected, before it is built. The Goal names the desired result.

**The requirements and the UI design are not lighter than in any other Strategy.** They meet the same Targets ([business requirements](../targets/requirements/business-requirements.md), [UI design](../targets/design/ui-design.md)), so what the user approves in a prototype is what the build starts from. Nothing else of the build is required: no architecture, application, API, or persistence design, and no API, server, or persistence, which the MDE runtime stands in for; and the verification of the whole is optional.

## How a prototype is made

By default a prototype runs on the MDE runtime, in the Workbench, against JSON data, with no backend code and no SQL: the [`mde-runtime`](../stacks/mde-runtime.yaml) stack, which installs nothing beyond the pages of step 4. It follows the [Prototype](../targets/app/prototype.md) Target, which this Strategy always applies, in four steps, each shown to the user and corrected before the next. The steps are this Strategy's stages: Status names the step the work is in, and moving on from one is the user's approval, as for any stage:

1. **Use cases and the data model**, as diagrams: the ABEs and how they relate, then each ABE's entities.
2. **The data, with navigation**: the primary entities, each with a data profile and connected sample data the user browses, from a list to a record to its related records.
3. **The site navigation**: the page set the UI conventions give, proposed for the user to confirm, and drawn as the [navigation diagram](../metamodel/design/navigation-diagram.md).
4. **The web pages**, optional: a frontend the AI generates from the agreed page set, in the chosen stack's frontend technology (for example a React app), calling the runtime's API against the same data.

The prototype is usable as soon as the sample data of step 2 exists: the runtime runs the entity specs as written, and the user tries the application live in the Workbench with no code. Step 4 is optional, for when the user wants the application's own pages.

Everything behind the pages comes from the Specs and the JSON data; a correction about meaning is made there, and a correction about the pages in the generated frontend.

Choosing the build's stack is optional during a prototype. Steps 1 to 3 do not depend on it; for step 4 the pages are written in the chosen stack's frontend technology and UI profile (for example React with Carbon), or as plain pages with a neutral style when none is chosen yet. With a stack chosen, the generated frontend can be carried into the build: its pages call the runtime only through one data-access module, so the build replaces that module with one calling the real API, and the pages stay.

When the user chooses a full stack instead (for example to try the real technology), the prototype is built as the application itself; see [On a full stack](#on-a-full-stack).

**A full stack already recorded is the build's, not the prototype's.** A stack such as `nest-carbon` in `specs/architecture/overview.md` (chosen when the project was created, or carried over) says what the application will be built on; the prototype still runs on `mde-runtime`, and only its step 4 pages take that stack's frontend technology and UI profile. Build the prototype on a full stack only when the user says so for this prototype, in those words, and record it in the Goal; never infer it from the recorded stack. On `mde-runtime`, install no backend framework, database, or container, and write no migrations.

## Stages in a prototype

A prototype takes the [stages](guided.md#stages) of the build, each named by its outcome; on the runtime, the runtime stands in for most of them:

| Stage | On the runtime | On a full stack |
|---|---|---|
| Requirements | the business requirements, as in every Strategy: capabilities, ABEs and entities, roles with their Critical Success Factors, use cases, rules: step 1 | the same |
| Architecture | none: the `mde-runtime` stack | minimal: languages and frameworks per tier, the database, how it runs |
| Design | the UI design, as in every Strategy: the page set and each role's dashboard (step 3); Authorization from the use cases; no other design | the same |
| App skeleton and tooling | none: the Workbench hosts the prototype | generated, runnable with one command |
| Backend | the runtime, and the seed data: step 2 | generated |
| Frontend | the Workbench's Live view, or an AI-generated frontend calling the runtime's API: step 4 | generated |
| Testing | none required; informal checks welcome | none required; the run before reporting |
| Docs | optional | optional |

Moving from one step to the next is the user's decision, as in every Strategy. Each step's output is verified in the loop, as in every Strategy: `mde verify --current` for the Targets this Strategy keeps (the business requirements, the UI design, and the Prototype Target), run by the agent itself, fixed, and verified again; the same failure after a fix is reported. The verification of the whole and its Evidence are optional.

## Working with the user

- **Show high, write complete.** Each step is shown at the level the user can judge (the diagrams, the data, the pages), but what is written meets its Targets: the requirements as complete as the business requirements Target asks, every role with its Critical Success Factors included, and the pages as the UI design Target asks.
- Prefer `infer → propose → visualize → let the user correct` over repeated questioning. Ask what the current step needs; for the rest, assume the default the Method or the industry pattern gives and record it as a [Question](../metamodel/work/questions.md), rather than stopping or leaving it out.
- Verification of the whole, Evidence, and release controls are optional unless the user requests them; each output is still verified in the loop.
- Record the user's feedback and each go in Current Work; [its Location](../metamodel/work/current-work.md#location) lists everything `work/` may hold, and nothing else goes there.

## On a full stack

When the user chooses a full stack (for example `nest-carbon`), the prototype is the application itself, built normally with the stack's API, services, repository, and database; no simulated backend.

- **Before building, the checkpoint.** Show the requirements (entities and relationships, roles and their success factors, use cases), the architecture in `specs/architecture/overview.md` (languages and frameworks per tier, database, and how it runs), and the design: the recorded page set and the data model expressed through [Design Catalog](../metamodel/design/design-catalog.md) defaults and any [Capability Design](../metamodel/design/capability-design.md) overrides, each as its Target asks. Building starts after the user has seen these together and said go; a suggestion, a question answered, or silence is not a go.
- **Use the current concept structure.** Keep entities as business requirements. Derive [Authorization](../metamodel/design/authorization.md) from use-case actors and invoked operations with `mde authorization` when demonstrating role-based behavior. Do not add legacy Authorization or Storage View sections to new entity specs. Record the agreed page set and navigation compactly in `specs/design/page-set.md`, with its approval in Current Work, as for a runtime prototype.
- **The runnable baseline.** The application runs from a fresh clone with one command, following the [runtime scripts](../features/server/app-runtime-scripts.md), [start and health](../features/server/app-start-contract.md), [configuration](../features/server/env-contract.md), and [runnable migrations and seeds](../features/persistence/runnable-migrate-seed.md) Features: `mde:start` creates the configured database when it is missing, applies the migrations and the seed data, and starts every tier; creating the database is never left to the user.
- **Run it before saying it is done.** From a clean state (the database dropped or absent), run `mde:install`, `mde:start`, and `mde:health`, open the application, and go through each page once. Report what you ran and what you saw; when a step fails, report the actual error and fix it, never hand the user steps to make it start.

## Targets and verification

This Strategy's Targets are those its front matter names: the [business requirements](../targets/requirements/business-requirements.md) and the [UI design](../targets/design/ui-design.md), as in every Strategy, and the [Prototype](../targets/app/prototype.md) Target. No other Target is required, on the runtime or on a full stack: not the architecture, application, API, or persistence design, nor the API, server, persistence, testing, Evidence, documentation, or deployment. Consult one only when the user asks or it helps the immediate work, without taking on its Outputs or Checks.

The verification of the whole is optional: no Evidence Package, coverage report, or release gate is required for this Goal. Each Target's output is still verified in the loop as it is produced. State what was actually tried, and never label the prototype or an unrun check as verified.

## Completing the Goal

Demonstrate the result (on the runtime, the four steps in the Workbench; on a full stack, the running application) and ask the user to judge whether it meets the Prototype Goal. Record that decision and material limitations in Work. If the next Goal is to build the application, select the [Guided](guided.md) or [Controlled](controlled.md) Strategy explicitly: the prototype's Specs (requirements, data profiles, page set) and its pages carry over as the starting point, the recorded page set preserving the agreed navigation even when no frontend was generated. Follow the [transition assessment](guided.md#transition-from-prototype): the requirements and UI design already meet their Targets, so it is about the rest of the build (the architecture and full stack, the application, API, and persistence designs, the frontend's move from the runtime); prior approval covers only what the user saw, and nothing the prototype showed is verified Evidence.
