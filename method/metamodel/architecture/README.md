---
type: concept-type
title: Architecture
description: A durable engineering decision or constraint affecting multiple features, components, or future changes.
icon: 🏗️
---

# Architecture Specification

Architecture records durable engineering decisions and constraints that affect multiple features, components, or future changes. It is a **structural realization** of concerns expressed through the model: it defines how the solution is structured and the constraints within which behavior and implementation operate. Its rules and checks are in the [architecture](../../targets/design/architecture.md) Target.

> **Architecture constrains behavior; Strategy guides behavior.** The Strategy may discover or refine Architecture, but must not silently override an established decision.

## Location

`specs/architecture/overview.md`, plus one `specs/architecture/<topic>.md` per topic that outgrows it. Topic documents use `type: architecture`. The application's technology-stack decisions and its Targets in scope are recorded here too.

The overview's front matter names the stack and the candidate Targets it brings, so tools can read them:

```yaml
type: architecture
stack: nest-carbon
targets: [business-requirements, architecture, application-design, api-design, ui-design, persistence-design, api, persistence, server, web-ui, testing, evidence, documentation, deployment, dev-setup, run-app]
```

`targets` starts as the stack's own list (`method/stacks/<stack>.yaml`); the architecture may remove a Target the application will never need, with the reason in the overview. A change to `stack` or `targets` changes what the Goal is held to: review the Goal's Targets (`work/targets.json`) with it ([Goal](../work/goal.md#keeping-the-goal-in-step)). Which of them a Goal uses is its Strategy's to decide ([Goal](../work/goal.md#the-contract-goal-strategy-specs-implementation)).

### Invocation convention (optional)

The architecture may declare where each entity's implementation lives and how a call to a [Feature](../feature.md) is marked there. When it does, `mde verify` checks it:

```yaml
invocation:
  entities: app/backend/src/entities       # one file per entity, named after it (ServiceRequest, service-request)
  marker: "MDE: {feature}"                 # the comment at each Feature call; {feature} is the Feature's id
```

For each entity, the Features its requirements or its capability design apply are each invoked, by their marker, in that entity's file, and no marker names a Feature the entity does not apply (catalog defaults, realized once for every entity, need no marker). Without a declared convention, only the promises proven on each entity show the wiring. MDE prescribes no class layout; the convention is the architecture's decision, recorded with its rationale like any other.

## Structure

Each decision or topic:

- Decision or principle
- Rationale
- Constraints / rules
- Consequences
- Exceptions or unresolved alternatives, when applicable

## Relationships

- It is resolved from the architecture the project chose (the Method's [`architecture/`](../../architecture/README.md)) and its selected [stack](../../stacks/README.md).
- These [Diagrams](../diagram.md) depict it and the concepts it structures:
  - [Architecture diagram](architecture-diagram.md) — components or layers and their dependencies.
  - [Use-case diagram](../requirements/use-case-diagram.md) — actors and the use cases they perform.
  - [Logical data model](../requirements/logical-data-model-diagram.md) — business entities and relationships.
  - [Physical data model](../design/physical-data-model-diagram.md) — the persisted representation.
  - [Interaction diagrams](interaction-diagram.md) — how the layers and components communicate.
  - [State-transition diagrams](../requirements/state-transition-diagram.md) — lifecycles of entities or workflows.
