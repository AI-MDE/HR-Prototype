# OKF Model and Tooling Conventions

## Purpose

MDE uses OKF as the universal representation for durable knowledge. The MDE Meta-Model is an opinionated model expressed through OKF rather than a special representation embedded in tooling.

This document defines the small set of conventions needed for models, model extension, semantic directories, generic viewers and DSLs, and type-specific tooling.

## How MDE extends OKF

MDE is an application of OKF, not a fork of it. A file is valid OKF when it has a `type`; everything else in this table is what MDE adds on top. **Anything not listed here is not part of the MDE contract.**

| # | Extension | The rule | Status |
|---|-----------|----------|--------|
| 1 | Models | A bundle may declare its governing model with `model:` in its root `README.md` frontmatter. A concept's `type` resolves to the type definition with that id in that model. | Contract. `mde init` writes `model:`; the Workbench does not read it yet and uses the installed model. |
| 2 | Type definitions | A model defines each concept type in its own file, organized in area folders: `type: concept-type` with `title`, `description`, and an emoji `icon`. Type ids are the filenames and are unique across the model. | Enforced by test; read by the Workbench for titles and icons. |
| 3 | `extends` | A type definition may name one base type it specializes; a model may name one model it builds on. See [Extension](#extension). | Contract, informational: no tool resolves it yet. A test checks that each base exists and chains do not cycle. |
| 4 | Directory semantics | `README.md` gives a directory its meaning; `index.md` is navigation only. | Contract; `index.md` rules enforced by the OKF profile. |
| 5 | Profile conventions | Lowercase-kebab-case types, one modeled object per file, `title` required for Markdown DSL concepts. | Defined in the [OKF profile](okf.md). |
| 6 | Structure only | A type definition says what a concept is and what shape it has: its definition, where instances live, their structure, and their relationships. What good looks like, how to write or maintain it, and how to check it belong to the [Targets](../targets/README.md) that govern it. See [Shape, not judgment](#shape-not-judgment). | Enforced by test (no Guidance, Rules, Checks, or Maintain section in a type definition). |

**Status** means: *enforced* is checked by a test or a tool, *informational* is defined and valid to write but nothing consumes it yet.

### Shape, not judgment

The Meta-model and the Targets split one job between them, and each sentence has exactly one home. Ask of it: *is this the shape of the thing, or a judgment about doing it well?*

| A type definition holds (shape) | Its Target holds (judgment) |
|---|---|
| Frontmatter: `type`, `title`, `description`, `icon`, `extends` | **Applies when**: which work uses it |
| A short definition of the concept | **Governs**: the concept types and outputs it covers |
| **Location**: where instances live | **Outputs**: what must exist |
| **Structure**: sections, fields, and their meaning | **Rules**: quality criteria, guidance, how to write and maintain it |
| **Relationships**: to other concepts | **Checks**: how to verify it |

A section such as *Guidance*, *Rules*, *Maintain*, or *Checks* is judgment and belongs to the Target. The Strategy decides when Targets apply and how strictly; it holds neither shape nor judgment of its own.

These rules govern knowledge under `/specs` and the model itself. Other Method files, such as commands, the Strategy, Targets, architecture guidance, stacks, and catalogs like `optional-features/catalog.json`, are Method assets. They may use `type:` and other frontmatter as defined by the README of their own folder; that vocabulary does not extend the model, and they need no type definition here. If Specs begin to reference such an asset as a typed concept, define its concept type in this model first.

## Model

A knowledge bundle may declare the model that governs its concepts. A model defines concept types, structure, relationships, constraints, semantics, and declared behavior.

A model is itself an OKF knowledge bundle.

```text
Knowledge Bundle
      |
      | governed by
      v
Model / Meta-Model Bundle
```

Meta-model concepts use ordinary Markdown with YAML frontmatter for machine-readable structure and Markdown body content for meaning, guidance, and examples.

## Type definitions and discovery

Type definitions live in the model directory, organized in folders by area: `requirements/`, `architecture/`, `design/`, `work/`, and `evidence/`, with shared definitions such as `diagram.md` at the root. The folders are for people; they do not change type identity:

- A type id is the definition's filename without `.md`, wherever it sits in the tree. A concept declaring `type: entity` resolves to `requirements/entity.md`.
- A folder's `README.md` that declares `type: concept-type` defines the type named after the folder: `requirements/README.md` defines `requirements`. A folder README without it only describes the folder.
- Type ids are unique across the whole model. Two definitions with the same id are an error, not an override.

Type definition files declare `type: concept-type` and own their `title`, `description`, and `icon` frontmatter. `icon` is a single emoji used for display; it is an MDE addition to OKF, not an upstream field.

`index.md` is the browsable type catalog, grouping links with icons and descriptions drawn from those definitions. It has no populated frontmatter and is not a required machine registry. Tooling discovers type definitions from their frontmatter and filenames; unknown types remain browsable without model metadata. No separate JSON type catalog is maintained.

## Authored knowledge and runtime representations

Application concept knowledge is authored in Markdown using the [Markdown DSL](../markdown-dsl.md), the [OKF profile](okf.md), and the owning type definition. The individual Markdown type definitions and authored concepts are authoritative regardless of the selected Strategy or whether an application is generated or interpreted.

Runtime or build tooling may derive JSON or another representation from authored OKF knowledge. These derived forms are implementation artifacts, not separately authoritative specifications. Verify tool support before relying on a conversion path; record missing support in Work and address its realization through Design.

This authoring convention does not prohibit JSON for schemas, tool configuration, or instance and sample data. Strategy controls how work is approached and verified; it does not change the source of application truth.

## Structure and behavior

A model may describe both structure and declared behavior.

```text
Meta-Model
   |
   +-- Structure -> Architecture
   |
   +-- Behavior  -> Strategy
```

Architecture and Strategy are not embedded execution code. Architecture realizes structural concerns as durable solution decisions and constraints. Strategy realizes behavioral concerns as guidance for how goals and behavior should be pursued.

Execution belongs to a human, AI, runtime, or tool.

## Extension

`extends` is MDE's only extension mechanism, at two levels. At both, it means: build upon the referenced definition and add or refine local meaning. It is not a programming-language class system.

**Concept types.** A type definition may declare one `extends: <type-id>`, where `<type-id>` is the name of another type definition (its filename without `.md`, lowercase-kebab-case):

```yaml
---
type: concept-type
title: Use-Case Diagram
description: The actors of the application and the use cases each performs.
icon: 🎯
extends: diagram
---
```

- The extending type is a specialization. Its definition states only what it adds or refines; the base type's meaning still applies.
- At most one base type.
- Resolution looks for `<type-id>.md` in the declaring model first, then in the models it extends. A cycle or an unresolved base is an error to report, never something to guess around.
- A document may declare either the base type or a specialized type. A document that holds several kinds (such as one `diagrams.md`) declares the base type. Instances do not repeat `extends`.
- A tool that supports a base type may treat a specialized type as that base unless it knows better.

**Models.** A model's root `README.md` may declare `extends: <relative path to another model directory>`, resolved relative to that README. Types are looked up locally first, then in the extended model:

```text
MDE Model
    |
    v
Healthcare Model
    |
    v
Physical Therapy Model
```

**Status.** Informational today: no tool resolves `extends`. A test verifies that every declared base exists and that chains do not cycle, so what is written stays valid for when a tool does.

## Directory semantics

Keep OKF navigation separate from directory semantics.

```text
requirements/
├── index.md
├── README.md
├── entities/
├── use-cases/
└── rules/
```

- `index.md` is navigation and progressive disclosure.
- `README.md` is the semantic definition of the directory when the directory itself represents a concept.
- other Markdown files represent contained concepts.

For example:

```yaml
---
type: Requirements
---

# Requirements

Contains the requirements knowledge for the application.
```

A directory without a semantic `README.md` remains an ordinary organizational directory.

The semantic root `README.md` is also the natural place for bundle-level model metadata when needed, keeping such metadata out of the navigation-only `index.md`.

## Workspace exploration

A generic OKF viewer may be given any workspace root. The root need not itself be a knowledge bundle.

The viewer explores directories, discovers OKF knowledge scopes, reads semantic directory descriptions, and resolves the applicable model for each scope. A workspace may therefore contain knowledge governed by different models.

## How a viewer discovers the metamodel

A knowledge bundle declares its applicable model through a `model` field in the YAML frontmatter of its semantic root `README.md`. This is an MDE convention layered on OKF. The reference identifies the model directory and resolves relative to the declaring `README.md`, not the viewer's working directory.

For example, given this workspace:

```text
workspace/
  mde/method/metamodel/
    README.md
    index.md
    requirements/
      README.md
      entity.md
  app/specs/
    README.md
    customer.md
```

`project/specs/README.md` declares:

```yaml
---
type: specs
model: ../../mde/method/metamodel
---
```

The viewer follows these steps:

1. Explore the workspace and read directory `README.md` frontmatter to find model declarations. The workspace root itself need not declare a model.
2. Apply each declaration to its directory and descendants. A nearer directory `README.md` with its own `model` declaration starts a new model scope; a README without that field leaves the inherited scope unchanged.
3. Resolve the declared model directory. Its `README.md` explains the model and its `index.md` provides browsable navigation. The index is optional for discovery and is not parsed as a required registry.
4. For a concept such as `customer.md` declaring `type: entity`, find the definition whose id is `entity` anywhere in that model directory's tree (here `requirements/entity.md`). Read the definition's frontmatter for its title, description, and icon, and its body for semantics and guidance. Only definitions declaring `type: concept-type` are treated as type definitions.
5. If the model declares `extends` in its root README frontmatter, resolve that model reference relative to the declaring README as well. Look for a type locally first, then in the extended model. Detect extension cycles and report unresolved references.

If no model is declared, or a model or type definition cannot be resolved, the viewer continues displaying the concept as ordinary OKF knowledge. It preserves the declared type and makes unresolved references visible rather than guessing a model from folder names.

This describes the discovery contract for generic viewers. The current Workbench metadata reader still uses the bundled MDE metamodel directory; per-scope `model` resolution and model inheritance remain to be implemented.

## Generic viewer and DSL

The generic viewer and DSL operate on OKF, not on hard-coded MDE concepts.

They should be able to:

- discover knowledge scopes and concepts;
- determine concept types;
- discover and navigate the applicable model;
- inspect properties and relationships;
- follow `extends`;
- navigate from knowledge to the model that defines its meaning.

MDE is one model expressed through OKF.

## Tooling

Tooling is separate from both knowledge and the model.

```text
Knowledge ----> Model

Tooling ------> Model

Viewer -------> Knowledge
   |
   +----------> Tooling
```

The model does not declare its viewers, editors, or implementation tools. Tools declare which models and concept types they support.

A generic OKF viewer/editor is the fallback. Type-specific tools may enrich the experience for concepts such as Entity, UseCase, BusinessRule, Requirements, or Architecture.

This applies equally to file concepts and semantic directory concepts.

## Tool registry

Tool declarations belong to the tooling package, not the model. A tooling package may expose a simple registry or manifest associating concept types with viewers, editors, or other capabilities.

The physical plugin/discovery mechanism is intentionally left open until a concrete implementation requires it.

## Principles

1. OKF provides the universal knowledge representation.
2. A Meta-Model is itself OKF knowledge.
3. Knowledge is interpreted through its applicable model.
4. `extends` is the simple extension mechanism for concepts and models.
5. `index.md` is navigation; `README.md` may give a directory semantic identity; folders organize type definitions by area without changing their ids.
6. Architecture realizes structural concerns and constrains the solution.
7. Strategy realizes behavioral concerns and guides the work.
8. Architecture constrains behavior; Strategy guides behavior.
9. Models describe knowledge; tools operate on models and knowledge.
10. Models never depend on tools.
11. Generic OKF tooling remains the fallback when no specialized tool is available.
12. Do not add additional modeling machinery until a concrete requirement demonstrates the need.
