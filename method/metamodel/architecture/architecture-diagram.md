---
type: concept-type
title: Architecture Diagram
description: The system's components or layers and the dependencies between them.
icon: 🏗️
extends: diagram
---

# Architecture Diagram

Shows the system's components or layers and the direction of their dependencies. It is an explanatory view of the [Architecture](README.md) decisions, not a separate source of truth.

## Owner and location

Architecture owns it. Place it in `specs/architecture/diagrams/architecture.md`, under `## Architecture`. How its layers communicate is the [Interaction Diagram](interaction-diagram.md)'s.

## Content

- Components or layers, named as in the architecture specifications.
- Dependency direction between them, and the boundaries to external systems.
- Only what the architecture specifications decide; leave implementation detail to Design.

## Representation

A Mermaid `flowchart` in a Markdown fence, per the [Markdown DSL](../../markdown-dsl.md).

When to create and update it, and its checks, are in the [architecture](../../targets/design/architecture.md) Target.
