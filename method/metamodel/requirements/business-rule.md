---
type: concept-type
title: Business Rule
description: A durable constraint, derivation, eligibility condition, or policy governing business behavior, kept with its entity.
icon: ⚖️
---

# Business Rule

A Business Rule is a durable business constraint, derivation, eligibility condition, or policy. It is Requirements knowledge: its business meaning, not how it is enforced.

Three things are not Business Rules, and have their own place: who may run an operation is the [Authorization](../design/authorization.md), derived from the use cases; what an input must be (required, type, length, format) is the entity's attributes and the `operation-input` Feature; the state an operation needs is the entity's Transitions (the `state-machine` Feature). Its rules and checks are in the [business-requirements](../../targets/requirements/business-requirements.md) Target.

## Location

With its entity, when it can be: a rule about one entity is an entry of that entity's `## Rules`; a rule across the entities of one [ABE](abe.md), of its Primary Entity's `## Rules`. An entry is `- **Team membership** — …`: its name in bold, then the rule, saying when it applies and what happens when it does not hold.

Only a rule that spans ABEs or capabilities has its own file: `specs/requirements/rules/<rule>.md`, or under its capability (`specs/requirements/capabilities/<capability>/business-rules/`). The entities it governs link it from their `## Rules`.

## Identity

Each rule has an id, unique in the application: its file name, or, for an entry of an entity's `## Rules`, its name in lower case with hyphens (`Team membership` is `team-membership`). A refusal names it (`error.rule`, [business-rule responses](../../features/api/business-rule-responses.md)), and the scenarios that prove it are tagged `@rule:<id>`: one where it holds, and one where it is broken and refused.

## Structure

- Statement
- Kind
- Applies To
- Inputs
- Condition
- Constraint / Result
- Violation Outcome
- Exceptions
- Rationale / Business Basis
- Related Entities
- Related Use Cases
- Scenarios
- Standalone Prototype
- Verification Intent

## Relationships

- It governs operations, events, lifecycle transitions, relationships, or derived values of the [Entities](entity.md) it applies to.
- Use cases invoke the operations it governs; they do not repeat it.
- How it is enforced is the implementation's; no design restates it on an operation.
