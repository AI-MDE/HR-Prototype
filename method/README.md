# Method

The MDE Method provides the semantics and reusable assets needed for an AI agent to work with an MDE project while leaving the project's methodology under project control.

## Core AI contract

> **Read the project manifest. Follow the selected Method-owned Strategy. Understand the Goal and Current Work. Inspect the relevant Specs. Produce the requested result.**

## Single behavioral authority

The selected Method-owned Strategy is the project's single authoritative source for AI behavior, controls, gates, required activities, warnings, waivers, and sequencing constraints.

The framework does not impose a separate universal workflow or set of always-applicable behavioral rules. A project may choose a stringent Strategy, a lightweight Strategy, or define its own.

Framework documentation, Commands, Meta-model definitions, Defaults, Architecture guidance, and tools must not silently introduce additional project workflow rules.

## Project manifest

An MDE initiative has a root `mde.json` manifest with `type: "mde"` and paths for `specs`, `app`, `work`, `evidence`, and `method`. Application decisions belong in Specs; Workbench settings belong in App.

The manifest is a map, not a duplicate source of project knowledge.

## Work execution context

`work/goal.md` records the intended result. `work/current/` is the Current Work: its `README.md` (type `current-work`) references the selected Method-owned Strategy and records current execution context. There is no separate Objective layer.

Its status, questions, findings, and release notes sit beside it, and the user's Workbench reviews and annotations under `work/reviews/` and `work/notes/`; [Current Work](metamodel/work/current-work.md#location) lists everything `work/` may hold, and nothing else (scripts, test output, the agent's reports, copies) belongs there. Completed execution context may be preserved under `work/history/`. Provenance and inferred/confirmed status belong in Work. Git remains authoritative for version and release history.

## Evidence — proof of the built application

Evidence is optional: the active Strategy decides whether verification and an Evidence Package serve the current Goal. Prototyping requires neither. When Guided work verifies a Goal, `evidence/README.md` reports the verdict and links to the relevant test reports, coverage, audit reports, and findings as required by the selected Targets. `mde verify` proves the Checks a script settles; a second agent audits the rest (see [`mde verify`](commands/verify.md)). The concepts are defined in `metamodel/evidence/`.

Work records how the job was done; Evidence shows the result.

## Specs — durable application knowledge

Application-specific durable knowledge belongs under `specs/`. A project manifest may map different physical paths, but the common conceptual areas are:

```text
specs/
├── requirements/
├── architecture/
├── design/
├── technology/
└── integrations/
```

- Requirements describe required business/application behavior and concepts.
- Architecture describes the selected application architecture and material architecture decisions.
- Design describes realization and interaction design where needed.
- Technology records the selected technology stack and tooling.
- Integrations describe external integration contracts and related durable knowledge.

Specs record what is known. Work records what was done and why.

## Strategy

A Strategy is the project's methodology and the Method's realization of behavioral concerns. The Meta-model may declare what behavior is meaningful; Strategy defines how that behavior and the current Goal should be approached.

A Strategy may define activities, controls, gates, dependencies, warnings, review expectations, verification rigor, release conditions, and waiver behavior. It operates on knowledge through the applicable Meta-model rather than defining those knowledge types itself.

Work proceeds through a default sequence of stages (Requirements, Architecture, Design, App skeleton and tooling, Backend, Frontend, Testing, Docs), taking those the Goal needs. Each stage reads Work, Specs, and App, produces Specs or App guided by its Targets, records the work, and reports its status; when verification runs, a failure gets one fix and is then reported. Moving to the next stage is the user's decision. The Strategy decides how strictly, and when, each stage is verified.

Architecture is the complementary structural realization: it records durable structural decisions and constraints. **Architecture constrains behavior; Strategy guides behavior.** A Strategy may discover or refine Architecture, but must not silently override an established architectural decision.

`strategy/` offers three Strategies, one file each. [Prototype](strategy/prototype.md) applies the Prototype Target on the MDE runtime, or its runnable baseline on a full stack; further Targets, formal design detail, and Evidence are optional unless requested. [Guided](strategy/guided.md) works through the stage pages (`strategy/stages/`) with advisory controls; each Target is verified in the loop as it is built, and the whole when the user asks, and before a release. [Controlled](strategy/controlled.md) is Guided with immediate verification at the end of every stage, confirmed choices, and verified releases. Review is the user's feedback, at any time; it never gates the flow unless the user sets a review to wait on. Current Work links the selected Strategy.

## Architecture and stacks — choices to resolve

[`architecture/`](architecture/README.md) holds technology-independent architecture guidance. [`stacks/`](stacks/README.md) holds technology-stack presets with candidate Targets; the active Strategy decides which, if any, are selected. They are consulted when a project starts, when an unresolved choice must be made, or when the user asks for a change; once resolved into the application's Specs, the Specs govern, and later edits here do not change them.

## Meta-model

The Meta-model defines the language of knowledge: concepts, semantics, structure, relationships, constraints, and declared behavior used by Specs and Work.

The Meta-model itself is OKF knowledge. Knowledge bundles are interpreted through their applicable model, and models may extend other models through the simple `extends` relationship.

The Meta-model declares what knowledge and behavior mean; it does not impose project methodology, controls, gates, or sequencing. Those behavioral controls belong to the selected Strategy.

## Commands

The commands `mde proceed`, `mde verify`, `mde audit`, `mde review`, `mde release`, and `mde update`, said to the agent, are optional vocabulary for user intent: `mde proceed` starts, continues, or moves the work to its next stage, whichever it needs. Equivalent intent may be expressed naturally.

A Command defines what the user is asking to do. How that intent is controlled is determined by the selected Method-owned Strategy.

## Verification

Verification is a capability and activity. Whether it is required, when it occurs, and what evidence is necessary are determined by the project's Strategy and applicable Specs rather than by a universal framework lifecycle.

## Framework boundary

The framework supplies reusable capabilities, Meta-models, Commands, tools, and selection catalogs. The project supplies its selected Strategy and durable decisions.

Each initialized application owns a complete copy of the Method. The root `mde.json` points to
that local Method, normally `./method`. The installed MDE product supplies the canonical Method
used during initialization, but existing applications do not execute against a hidden Method in
the global installation.

This is especially important for the Meta-model: applications may inspect, version, extend, or
modify their own concept definitions and relationships without changing the workstation-wide
MDE installation.

## Contents

- `bootstrap.md` — minimal AI entry point that directs the AI to the project Strategy, and what to read when.
- `commands/` — optional named user intents.
- `metamodel/` — definitions and structure of knowledge concepts.
- `strategy/` — the Prototype, Guided, and Controlled Strategies, and the stage pages they share.
- `targets/` — what each kind of output must produce and pass, compiled from the build Features in `features/` (an agent reads the Targets, not the Features).
- `optional-features/` — the optional Features an application may apply to its objects (soft delete, optimistic concurrency, bookmarks…), indexed in `catalog.json`; never compiled into Targets, read when a Spec applies one.
- `architecture/` — architecture guidance, and the architecture a project chooses.
- `stacks/` — technology-stack presets, with their Targets in scope.
- `markdown-dsl.md` — representation rules for Markdown specification concepts.

There is no separate universal Workflow or Rules layer. Project behavior is controlled by the selected Method-owned Strategy.


## Targets

[Targets](targets/README.md) say what good looks like for each kind of output (requirements, design, API, persistence, UI, tests, evidence, documentation, deployment) and how to check it: when each applies, what it governs, its outputs, rules, and checks. The [Meta-model](metamodel/README.md#shape-not-judgment) gives each concept's shape; its Target gives the judgment. The Strategy decides whether Targets are consulted, which are selected, and the timing and rigor of verification; Targets never add a second workflow authority. Targets are compiled from the build [Features](features/README.md), the engineering concerns each contributing rules, checks, and audit concerns to the Targets it impacts; `scripts/compile-targets.mjs` compiles each Target from its skeleton and those Features. The [optional Features](optional-features/index.md) are the other kind ([Feature](metamodel/feature.md)): an application applies them by choice, in its requirements or its design, and proves their promises on each object that applies them.
