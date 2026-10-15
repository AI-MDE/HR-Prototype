# Targets

A Target says what good looks like for one kind of output, and how to check it. It covers both knowledge (requirements, design) and the built application (API, persistence, UI, tests, evidence, documentation, deployment).

Targets and the Meta-model split one job: the [Meta-model](../metamodel/README.md#shape-not-judgment) gives each concept's shape (definition, location, structure, relationships); the Target that governs it gives the judgment (rules, guidance, checks). The Strategy ([Prototype](../strategy/prototype.md), [Guided](../strategy/guided.md), or [Controlled](../strategy/controlled.md)) decides when Targets apply and how strictly; Architecture and stacks choose the technology.

## Where a Target comes from

A Target is compiled from the [Features](../features/README.md) by [`scripts/compile-targets.mjs`](../scripts/compile-targets.mjs). Only its skeleton is authored: the frontmatter (`id`, `title`, `applies_when`, and optionally `requires` and `inputs`), its **Purpose**, and its **Outputs**. Everything else comes from the Features whose `impacts` name the Target:

- **Composed behavior**, in the Target: each Feature's *Impact on <target>* section, under the Feature's title and tagged `[feature: <id>]`.
- **Verify**, in `verification/<target>.md`: each Feature's *Verify*, the Checks `mde verify` proves by script or test run.
- **Audit**, in `audit/<target>.md`: each Feature's *Audit*, under the first Target it impacts, for a second agent, a fresh session that did not build the work, judging what no script can, from the Specs and the running application.

[`mde verify`](../commands/verify.md) runs the first, and hands the second to a second agent through [`mde audit`](../commands/audit.md). Review stays the user's: their decisions, through [`mde review`](../commands/review.md).
- [`catalogue.json`](catalogue.json): every Target's id, *applies when*, requires, inputs, outputs, and path, to decide relevance without opening the Targets.

A Feature's *Rationale* and *Detail* compile nowhere. A rule a Target needs that no existing Feature covers gets a Feature of its own (for example the business-requirements concept rules in `features/business-requirements/`).

Never edit the composed sections: change the Feature and recompile (`node method/scripts/compile-targets.mjs`); recompiling an unchanged Method produces no diff. To change a Target's purpose, applies-when, or outputs, edit its skeleton part and recompile.

## Shape of a Target

```markdown
---
type: target
id: api
title: API
applies_when:
  - the work creates or changes endpoints or route handlers
stage: backend
needs:
  - backend
---

# API

## Purpose              what the Target is for and what it governs           (authored)
## Outputs              what must exist, and where                           (authored)
## Composed behavior    each contributing Feature's Impact on section        (compiled)
## Verify and Audit     a pointer to verification/<target>.md and audit/     (compiled)
```

`applies_when` is read by an agent deciding whether its work touches the Target. `stage` and `needs` are read by tools: `stage` is the Strategy stage the Target belongs to (`requirements`, `architecture`, `design`, `skeleton`, `backend`, `frontend`, `testing`, `docs`, `release`; `prototype` for the Prototype Target, `any` for one that is due whenever it applies), and `needs` the conditions of the application it requires (`ui`, `database`, `backend`, `integration`, `deployment`). Which Targets apply to a Goal, and when each is due, follows from them ([Strategy](../metamodel/work/strategy.md#which-targets-how-rigorously)).

A Target is technology-neutral. Stack-specific detail (a framework's conventions, a UI library's profile) belongs to the [stacks](../stacks/README.md), which a Target may point to as "the selected stack's".

## How the Strategy uses Targets

The stack lists candidate Targets. The active Strategy decides whether to select any, which apply to the Goal, and the verification level. Guided work records the selected Targets in `specs/architecture/` and consults those whose *Applies when* matches the work. A work step may remain unverified; a dedicated verification activity runs `mde verify` on the selected Targets and has a second agent audit them through their audit views, and they record Findings and Evidence as the Strategy requires. [Prototyping](../strategy/prototype.md) always applies the Prototype Target on the MDE runtime, or its runnable baseline on a full stack; it selects no further Targets by default and does not require an Evidence Package. A Target's outputs and checks do not create a gate on their own.

## Catalog

The [index](index.md) lists the Targets. When a Target changes, update the index with it.
