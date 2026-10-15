---
type: target
id: architecture
title: Architecture
applies_when:
  - the work selects, resolves, or changes the application's architecture or technology stack
  - the work adds a component, layer, boundary, or cross-cutting mechanism
  - the work changes code in a way that could cross a boundary the architecture sets (checked here; the code itself is checked under the api, server, and persistence Targets)
stage: architecture
---

# Architecture

<!-- COMPILED by compile-targets.mjs from features. Skeleton (Purpose +
     applies_when) is authored; the sections below are composed from the
     contributing features, each tagged [feature: <id>]. Do not hand-edit
     the composed sections — edit the feature and recompile. -->

## Purpose

What a good application architecture specification looks like, and how to check that it, and the code, hold to it. Its shape is defined by the [Architecture](../../metamodel/architecture/README.md) concept; the architecture a project chooses, and its technology-independent rules, are in the Method's [`architecture/`](../../architecture/README.md); technology choices are in the [stacks](../../stacks/README.md).

It governs: [Architecture](../../metamodel/architecture/README.md) specifications the [Architecture Diagram](../../metamodel/architecture/architecture-diagram.md), and the [Interaction Diagram](../../metamodel/architecture/interaction-diagram.md).

## Outputs

| Output | Where | When |
|---|---|---|
| Architecture overview | `specs/architecture/overview.md` | always |
| Topic specifications | `specs/architecture/<topic>.md` | when a topic outgrows the overview |
| Targets in scope | in the overview | always |
| Architecture diagram | `specs/architecture/diagrams/architecture.md` | always |
| Interaction diagram | `specs/architecture/diagrams/interactions.md` | with the architecture diagram; a scenario for each boundary that matters |

## Evidence

The rows of the Evidence Package this Target owns: what `mde verify` measures and reports for it, each by its id. Tools take a row's title and what it proves from here.

| Row | Title | Proves | Needs |
|---|---|---|---|
| architecture | Architecture audit | A second agent judged each architecture decision: resolved, traceable to a need, and consistent with the stack and the other decisions. | — |
| architecture-overview | Architecture overview | The architecture names a stack of the Method and Targets that exist, with nothing left as a placeholder. | — |
| architecture-decisions | Architecture decisions | Every architecture decision is stated, none left as an empty heading. | — |
| okf-architecture | OKF compliance | Every architecture Spec is as the [OKF profile](../../metamodel/okf.md) requires: front matter naming a concept type the Meta-model defines, the reserved files, semantic identifiers, and links that resolve. | — |
| architecture-diagrams | Architecture diagrams | The architecture and interaction diagrams are delivered, and those rendered from DOT are current. | — |

## Composed behavior

### Content  `[feature: architecture-content]`

- The overview records layers, boundaries, request flow, and integration points, references the selected stack, and keeps UI, API, service or domain, persistence, and integration concerns separate.
- Each decision states its rationale, constraints, and consequences, and traces to the business needs it serves. It does not restate business requirements or low-level code structure.
- A small application may keep all decisions in the overview plus diagrams; split a topic into its own file only when it becomes substantial.

### Diagrams  `[feature: architecture-diagrams]`

- Create the architecture diagram with the first specification that introduces a component or layer, and the interaction diagram with it: how the layers communicate on the main request path, and in each key scenario that crosses another boundary (an integration, an event). Create the other diagrams the work relies on (use-case, logical and physical data model, state-transition, navigation) with the first specifications they depict. Update each whenever a change alters what it shows.
- **These two are required, in every Strategy,** with the architecture's overview: the [architecture diagram](../../metamodel/architecture/architecture-diagram.md) (`specs/architecture/diagrams/architecture.md`) and the [interaction diagram](../../metamodel/architecture/interaction-diagram.md) (`specs/architecture/diagrams/interactions.md`). `mde verify` counts them with the other required diagrams, and a missing one keeps the Evidence from passing.
- Each diagram lives with the section whose knowledge it shows, in that section's `diagrams/` folder ([Diagram](../../metamodel/diagram.md)): requirements, architecture, or design.
- When a diagram disagrees with the specifications or the code, resolve it in the owning concept rather than only editing the diagram.

### Resolve selections into Specs  `[feature: architecture-resolve-selections-into-specs]`

A preset name records a selection, not a complete architecture. During architecture work, read the selected architecture (`architecture/overview.md` and its relevant topic documents) and the selected stack preset, through the manifest's Method path. Record in the application's Specs the applicable layers, dependency direction, constraints, concrete technology choices, the Targets in scope, and intentional exceptions, with enough meaning to design, build, and verify the affected scope without reopening the preset. Recording a default does not imply the user confirmed it; the Strategy decides when confirmation is needed.

- Entries `mde init` writes, such as `Selected architecture: mdex-application` and `Selected stack: nest-carbon`, are inputs to this resolution. Expand them before treating the decisions as resolved. For a small scope, extend the existing overview; do not create documents just to record a selection.
- Record the adopted meaning once, in its owning topic, adapted to the application rather than copying the catalog. A source reference says where a decision came from; it does not import unstated rules. Approval, alternatives, and open questions stay in Work.
- During ordinary work, use the resolved Specs. Later changes to the Method's architecture or stacks do not change the application's decisions; consult them again only to resolve a missing decision or a requested change.
- Language, runtime, frameworks, database products, UI frameworks, build tools, hosting, and protocols are application decisions, recorded with the architecture or in a technology topic. `mde.json` only locates areas; it never holds these decisions.

## Verify and Audit

The Checks `mde verify` proves for this target compile to `targets/verification/architecture.md`; what a second agent judges compiles to `targets/audit/`, under each Feature's first Target.
