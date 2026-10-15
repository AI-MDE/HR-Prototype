---
type: target
id: method-change
title: Method change
applies_when:
  - the work changes anything under `method/`, or documentation that explains it
  - the work brings an incoming file (an import, an existing modification) into the Method
stage: any
---

# Method change

<!-- COMPILED by compile-targets.mjs from features. Skeleton (Purpose +
     applies_when) is authored; the sections below are composed from the
     contributing features, each tagged [feature: <id>]. Do not hand-edit
     the composed sections — edit the feature and recompile. -->

## Purpose

What a good change to MDE's Method looks like, and how to check it: its Meta-model, Strategy, Targets, architecture, stacks, commands, or documentation. The Method stays internally consistent, versioned, and in agreement with its documentation.

It governs: The Method's files and the documentation that explains them.

## Outputs

| Output | Where | When |
|---|---|---|
| Version | `method/VERSION.md` | every change |
| Changelog entry | `method/CHANGELOG.md` | every change |

## Composed behavior

### Commands stay target/feature-agnostic  `[feature: commands-stay-target-agnostic]`

- **Commands** express intent and stay Target-agnostic: a command never names a specific Target, concept, or required artifact, or hard-codes a check. A new required artifact or check is added to the Target that owns it, and the command defers to the Targets in scope.

### Incoming file handling  `[feature: incoming-file-pipeline]`

An imported file or an existing modification is identified (its source and affected scope recorded in Work), analyzed against the existing Specs and Method, and given a disposition: accepted, rejected, or partly used, with its resulting changes traced. Unrelated existing modifications are never claimed as newly produced work.

### Method internal consistency  `[feature: method-internal-consistency]`

- **Meta-model**: shape only (definition, location, structure, relationships); the contract test enforces it ([Shape, not judgment](../metamodel/README.md#shape-not-judgment)).
- **Targets**: judgment (rules and checks) for one kind of output, technology-neutral.
- **Strategy**: when Targets apply and how strictly; it holds neither shape nor judgment of its own.
- **Architecture and stacks**: the chosen architecture's rules, and technology choices; a stack-specific rule belongs to its stack.

Never introduce a second authority for the same thing: one fact, one home.

- Indexes (the Meta-model index, the Targets index, stage tables, area READMEs) change together with the definitions they list.

Every change to the Method increments `method/VERSION.md` and adds a `method/CHANGELOG.md` entry (`YYYY-MM-DD — x.y.z — headline`, then what changed and why), so an application's `mde update-app` sees it. A change to the tools does the same in `tools/package.json` and `tools/CHANGELOG.md`.

### Method and documentation consistency  `[feature: reference-doc-reconciliation]`

- Documentation explaining a changed definition is updated in the same change. It never adds a control the Strategy does not have, or describes a capability as implemented when it is not.

### Semantic references  `[feature: semantic-references]`

- References resolve to their owning documents, using the Meta-model's names and paths, keeping relationship labels and distinct roles visible; missing or ambiguous references are reported, and referencing a concept does not imply it is implemented.

## Verify and Audit

The Checks `mde verify` proves for this target compile to `targets/verification/method-change.md`; what a second agent judges compiles to `targets/audit/`, under each Feature's first Target.
