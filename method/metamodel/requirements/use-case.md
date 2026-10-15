---
type: concept-type
title: Use Case
description: A behavioral specification describing how an actor or external trigger achieves a meaningful goal.
icon: 🎯
---

# Use Case

A Use Case describes how an actor or external trigger uses the system to achieve a meaningful goal. Its rules and checks are in the [business-requirements](../../targets/requirements/business-requirements.md) Target.

A use case is not a single operation. Submitting, accepting, or cancelling a record is an operation of its [Entity](entity.md); a use case is what a person sets out to do, and it invokes several operations, often on several entities, to do it ("Dispatch a service request": assign technicians, plan the work efforts, schedule). An action that is only one operation is listed under the entity's Operations and invoked by the use cases that need it, never written as a use case of its own. Viewing a record is not a use case either; it is the page that shows it. `mde verify` reports a use case that invokes fewer than two operations.

## Location

One file per use case: `specs/requirements/use-cases/<use-case>.md`, or under its capability (`specs/requirements/capabilities/<capability>/use-cases/`) when the application is organized by capability. Its behavior is a `usecase` block in the [Markdown DSL](../../markdown-dsl.md).

## Structure

- Goal
- Actors
- Trigger
- Preconditions
- Input
- Context
- Flow
- Alternatives / Conditions
- Outcome
- Output
- Postconditions
- Related Use Cases
- Invoked Entity Operations
- Related Pages
- Features (the [optional Features](../feature.md) the use case needs, such as `notifications` or `save-for-later`; the retired `## Aspects` section is not read)

## Relationships

- It invokes declared [Entity](entity.md) operations; the [Business Rules](business-rule.md) that govern them stay owned by those concepts, not repeated in the flow. Invoked Entity Operations lists them one entity per line, as a link to the entity, a dash, and its operations (`— Approve, Reject`), naming each operation as the entity declares it (a parenthesis adds a note); the Workbench reads this list to walk the use case against live data, and `mde authorization` reads it, with the Actors, to derive who may run each operation ([Authorization](../design/authorization.md)).
- Its actors are [Roles](role.md).
- [Workflows](workflow.md) sequence use cases.
- Its realization (pages, API contracts, data) is in Design, never in the use case; its behavior is drawn by the [Use-Case Behavior Diagram](use-case-behavior-diagram.md).
