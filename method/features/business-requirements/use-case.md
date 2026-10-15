---
type: feature
kind: build
id: business-requirements-use-case
title: Use Case
origin: mde
impacts:
  - business-requirements
---

# Use Case

## Purpose

The "Use Case" rules of the business-requirements Target that no other Feature supplies.

## Impact on business-requirements

- Steps express business interactions and system responsibilities, not only pages or internal function calls: who acts, what is requested, the relevant context, the operation actually invoked, and its outcome.
- Distinguish the initiating trigger from later decisions. Record alternate, rejected, cancelled, and waiting outcomes where they matter; do not collapse a durable handoff or wait into an immediate function call.
- Invoke declared entity operations and preserve their authorization, rule, and lifecycle meaning. Do not duplicate business rules or invent permissions.
- A use case is not a single operation. It is what a person sets out to do, and it invokes several operations, often on several entities. An action that is one operation (submit, accept, cancel a record) is the entity's operation, invoked by the use cases that need it; viewing a record is the page that shows it. Neither is a use case of its own.
- Its actors and Invoked Entity Operations are who may run what: authorization is derived from them ([Authorization](../../metamodel/design/authorization.md)), so a role that needs an operation is an actor of a use case that invokes it. The use case carries no design: its realization is in Design.
- Connect successive interactions through compatible postconditions and preconditions. State acceptance conditions as business situations with expected results.
- Every actor named participates explicitly: the primary actor initiates and has authority to pursue the goal; a supporting actor supplies information, decides, approves, confirms, receives, or is notified. When the outcome needs another actor's approval, state the handoff and the resulting intermediate state; do not call the outcome complete before that actor acts.

## Verify

- `use-case-references` Does every use case name roles that exist as its actors, and invoke only operations its entities declare (`mde verify`, Use case references row)?

## Audit

- **Use Case:**
  - Does each have a meaningful goal, valid actors or trigger, and an observable outcome?
  - Are entry conditions, normal flow, branches, waits, and handoffs coherent?
  - Do invoked operations exist and preserve rule, authorization, and state meaning?
  - Does every named actor participate, and is the primary actor's authority (or the required handoff) explicit?
  - Are acceptance situations and expected outcomes precise enough to verify?
  - Does the flow carry the triggering business condition through, and does the outcome resolve, reduce, defer, reject, or record it?
  - Is the goal a business outcome rather than a record create, update, or status change? Does it invoke more than one operation (`mde verify` reports one that does not)?
  - Is the driving object identified and carried through (or its absence justified), and are result, supporting, and impacted objects identified with their resulting states?
  - Do durable concepts implied by needs, quantities, history, or lifecycle resolve to entities, or have a recorded reason not to?
  - Where fulfilment is quantified, are requested, fulfilled, remaining, multiplicity, and reversal defined?
  - Does each complex or quantified transaction state its important situations as test conditions that agree with the entities, lifecycle, and rules?
