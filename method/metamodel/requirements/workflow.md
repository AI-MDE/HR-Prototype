---
type: concept-type
title: Workflow
description: A durable end-to-end business process spanning multiple interactions, actors, or states.
icon: 🔁
---

# Workflow

A Workflow is a durable end-to-end business process or lifecycle that sequences several [Use Cases](use-case.md) and entity operations, across actors and states, over time. It is business knowledge, not an MDE process controller: today it is described and drawn, not executed, and a later realization may implement it as a BPMN process. Its rules and checks are in the [business-requirements](../../targets/requirements/business-requirements.md) Target.

## Location

A workflow belongs to the [Capability](capability.md) whose goal it serves: one file per workflow, `specs/requirements/capabilities/<capability>/workflows/<workflow>.md`, linked from the capability's overview under Workflows. A workflow that crosses capabilities still has one owner, and links the use cases of the others. Applications from before keep theirs in `specs/requirements/workflows/`.

## Structure

- Purpose
- Trigger
- Participants / Roles
- Steps
- Resulting States / Transitions
- Exceptions / Alternate Paths
- Related Rules

Steps is a table, one row per step, in order:

```markdown
| Step | Role | Does | Reaches |
|---|---|---|---|
| Log the request | [Dispatcher](../../../roles/dispatcher.md) | [Log a service request](../use-cases/log-service-request.md) | [Submitted](../../../diagrams/state-service-request.md) |
| Review it | [Dispatcher](../../../roles/dispatcher.md) | [Review a service request](../use-cases/review-service-request.md) | Accepted |
```

- **Step** names the step in the business's words.
- **Role** links the [Role](role.md) that performs it.
- **Does** links the use case it runs, or an entity's operation when no more is involved (the entity's spec, `#operations`); several are allowed.
- **Reaches** is the state the step leaves the main record in, linking the lifecycle when there is one; blank when no state changes.

The table is the workflow: compact to read, and enough to draw it and, later, to generate a BPMN process from it (a role is a lane, a step a task, the order the sequence flow). Decisions and other paths stay prose, under Exceptions / Alternate Paths.

## Diagram

The Workbench draws the workflow from its Steps table whenever the spec is shown: a lane per role, the steps left to right, each with its state, every item linking to what its cell links. Nothing is stored, so the picture cannot fall behind the table, and an agent reading the specs never reads a picture. A hand-drawn or generated illustration that tells more of the story (the customer outside the application, what is out of scope) may be embedded as an SVG beside the spec, with every item linking to the spec it shows (`<a href>` relative to the SVG); the Workbench shows such an SVG inline so its links work. It depicts the workflow; the table stays authoritative.
