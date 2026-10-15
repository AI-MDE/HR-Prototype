---
type: concept-type
title: Use-Case Behavior Diagram
description: What happens inside one use case — its steps, branches, and outcomes.
icon: 🪜
extends: diagram
---

# Use-Case Behavior Diagram

Shows what happens inside one [Use Case](use-case.md): its steps in order, who acts at each step, the branches and conditions, and every outcome. It depicts the use case; it does not define it. Maintain one per use case in scope.

## Owner and location

Requirements owns it. Place it in `specs/requirements/diagrams/use-cases/<use-case>.dot`, rendered to `<use-case>.svg`, and embed the SVG in `specs/requirements/diagrams/use-cases/<use-case>.md`.

## Content

- Every step, branch, and outcome the use case declares; none dropped, none invented.
- The acting role or system at each step.
- Conditions on branches, and the business rules that guard them.

Split a use case whose diagram becomes tangled into several diagrams rather than letting it grow unreadable.

## Representation

Graphviz DOT source, rendered to SVG.

When to create and update it, and its checks, are in the [business-requirements](../../targets/requirements/business-requirements.md) Target.
