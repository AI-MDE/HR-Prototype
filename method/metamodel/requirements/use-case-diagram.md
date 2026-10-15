---
type: concept-type
title: Use-Case Diagram
description: The actors of the application and the use cases each performs.
icon: 🎯
extends: diagram
---

# Use-Case Diagram

Shows the actors and the [Use Cases](use-case.md) they perform. It depicts the Role and Use Case concepts; it does not define them.

## Owner and location

Requirements owns it. Place it in `specs/requirements/diagrams/use-cases.md`.

## Content

- Actors, named as the [Roles](role.md) they represent, including external systems that trigger a use case.
- Use cases, named exactly as their Use Case concepts.
- Which actor performs which use case, grouped by [Capability](capability.md).

When one diagram would show more than about fifteen use cases, split it, one page per capability: `use-cases-<capability>.md`, each a Use-Case Diagram of its own showing the capability's use cases and the actors that perform them. `use-cases.md` then shows the actors and the capabilities they use, and links each capability's page.

## Representation

Mermaid has no native use-case diagram. Use a `flowchart` with actors as one node shape and use cases as another, and keep that convention consistent across the application.

When to create and update it, and its checks, are in the [business-requirements](../../targets/requirements/business-requirements.md) Target.
