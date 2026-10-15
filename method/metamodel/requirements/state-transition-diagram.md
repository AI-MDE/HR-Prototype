---
type: concept-type
title: State-Transition Diagram
description: The lifecycle states of an entity or workflow, with the events or operations and guards that move it between them.
icon: 🔀
extends: diagram
---

# State-Transition Diagram

Shows the lifecycle of an [Entity](entity.md) or [Workflow](workflow.md) that has meaningful states: the states, the events or operations that cause transitions, and the guards that constrain them. Create one only where the states are meaningful to the business.

## Owner and location

Requirements owns the significant business lifecycles: the entities and workflows whose states the business reasons about (an order, a leave request, an approval). Place each in `specs/requirements/diagrams/state-<entity>.md`. Every other state diagram (a lifecycle that matters only to how the application works: a page, a job, a connection, a sync) belongs to Design, in `specs/design/diagrams/state-<name>.md`. Reference a diagram instead of keeping a copy of it in another section.

## Content

- States, named as in the owning concept's status or lifecycle definition.
- Transitions labelled with the event or operation, and the guard where one applies.
- Initial and terminal states.

## Representation

A Mermaid `stateDiagram-v2` in a Markdown fence.

When to create and update it, and its checks, are in the [business-requirements](../../targets/requirements/business-requirements.md) Target.
