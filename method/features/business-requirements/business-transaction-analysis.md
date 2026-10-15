---
type: feature
kind: build
id: business-transaction-analysis
title: Business transaction analysis
origin: mde
impacts:
  - business-requirements
default: n/a
---

# Business transaction analysis

## Purpose

Confirm that a use case expresses a real business objective and a coherent business interaction
rather than a generic record operation. Identify the business condition that starts the work, the
business object that carries that condition, the actor's goal, the intended business outcome, the
high-level steps, and the **important situations and results that become test conditions**.

Detailed application mechanics — per-step state-change tables, API/UI behaviour, executable
examples — belong to the **use-case realization in design**, not the business use case.

A structurally complete use case is still defective when its trigger disappears from the main
flow or its outcome only says that a record was created without explaining the business result.

## Applicability

Applies to the relevant Requirements concepts in scope. The current Meta-model defines concept structure; keep unresolved questions and provenance in Work.

## Impact on business-requirements

**Business transaction.** A use case expresses a real business objective, not a generic record operation. A structurally complete use case is still defective when its trigger disappears from the flow, or its outcome only says a record was created. For every non-trivial use case, work out:

- **Business condition** — the real situation that causes the transaction.
- **Objects involved, by role** — not a flat noun list:

  | Role | Meaning |
  |---|---|
  | Driving | Carries the business need and anchors the transaction |
  | Result | Created or changed to achieve the goal |
  | Supporting | Selected, consulted, or validated |
  | Impacted | Materially changed as a consequence (records, balances, totals, availability, lifecycle states) |

- **State change** — before, change, and after, for the driving, result, and impacted objects.
- **Outcome reconciliation** — how the business condition ends: resolved, partially resolved, deferred, rejected, or still open.

Trigger, preconditions, flow, alternatives, objects, and outcome tell one causally connected story.

- **Goal states a business result.** "Fulfil all or part of an approved staffing demand", not "Create a project assignment". Record creation and status changes belong in the result.
- **Find the missing driving object.** When a trigger, rule, step, quantity, or outcome refers to something with identity, state, history, quantities, or lifecycle (a demand, request, application, case, order, claim, reservation), check whether the entity model is missing it. Do not force it into a result entity because that one is convenient to persist.
- **One trigger per use case.** Different triggers needing a different driving object, decision, goal, or outcome are separate use cases. Alternate flows vary the same transaction; they do not add a later lifecycle goal.
- **Quantified fulfilment.** Where a need is measured (staffing, orders, payments, capacity, inventory, budget, quotas), define the requested amount and unit, fulfilled and remaining amounts, whether fulfilment is partial or additive, whether several results may fulfil one need or one result several needs, the over-fulfilment policy, and reconciliation after cancellation or reversal.
- **Situations become test conditions.** State the important situations (completion, partial fulfilment, exceptions, cancellation, insufficient capacity, unauthorized participation) as conditions with one expected business result each: "the candidate has only 40% available against a 60% demand" → "a 40% assignment is created and the demand stays open for 20%". Concrete values, state tables, and API or UI mechanics belong to the use-case realization in Design.

## Audit

- Does the main flow preserve the business condition named by the trigger and explicitly resolve,
  reduce, defer, reject, or record it in the outcome?
  · evidence: trigger + main flow + outcome
  · when: audit
- Is the driving business object identified and carried through the transaction, or is its absence
  explicitly justified because the trigger is an immediate event with no durable business object?
  · evidence: use-case object roles + entity model
  · when: audit
- Is the business goal expressed as a business outcome rather than only a record create/update or
  status-change operation?
  · evidence: Business Goal vs. Data Created / Changed / Viewed
  · when: audit
- Are result, supporting, and materially impacted objects identified, with their resulting states
  reconciled?
  · evidence: object roles + state-change table + outcome
  · when: audit
- Do durable concepts implied by needs, quantities, history, and lifecycle resolve to entities, or
  have a documented reason not to?
  · evidence: use-case wording vs. entity model + open questions
  · when: audit
- Where fulfilment is quantified, are requested, fulfilled, remaining, multiplicity, and reversal
  semantics defined?
  · evidence: use case + rules + entity properties
  · when: audit
- Does each complex or quantified transaction surface its important situations as **test
  conditions** (situation + one expected business result) that agree with the use case, entity
  cardinalities, lifecycle, and business rules — rather than forcing executable examples or
  per-step state tables into the business use case?
  · evidence: use-case Test Conditions section
  · when: static + audit

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on business-requirements

**Business transaction.** A use case expresses a real business objective, not a generic record operation. A structurally complete use case is still defective when its trigger disappears from the flow, or its outcome only says a record was created. For every non-trivial use case, work out:

- **Business condition** — the real situation that causes the transaction.
- **Objects involved, by role** — not a flat noun list: the driving object (the request, demand, case, order, application, review, or work item that carries the need through the flow), the result object (created or changed to achieve the goal), supporting objects (selected, consulted, or validated), and impacted objects (records, balances, totals, availability, or lifecycle states materially changed).
- **State change** — before, change, and after, for the driving, result, and impacted objects.
- **Outcome reconciliation** — how the business condition ends: resolved, partially resolved, deferred, rejected, or still open.

Trigger, preconditions, flow, alternatives, objects, and outcome tell one causally connected story. A trigger naming one business need followed by an unconstrained flow over unrelated records is a defect.

- **Goal states a business result.** "Fulfil all or part of an approved staffing demand", not "Create a project assignment". Record creation and status changes belong in the result.
- **Find the missing driving object.** When a trigger, rule, step, quantity, or outcome refers to something with identity, state, history, quantities, or lifecycle (a demand, request, application, case, order, claim, reservation), check whether the entity model is missing it. Do not force it into a result entity because that one is convenient to persist.
- **One trigger per use case.** Different triggers needing a different driving object, decision, goal, or outcome are separate use cases. Alternate flows vary the same transaction; they do not add a later lifecycle goal.
- **Quantified fulfilment.** Where a need is measured (staffing, orders, payments, capacity, inventory, budget, quotas), define the requested amount and unit, fulfilled and remaining amounts, whether fulfilment is partial or additive, whether several results may fulfil one need or one result several needs, the over-fulfilment policy, and reconciliation after cancellation or reversal.
- **Situations become test conditions.** State the important situations (completion, partial fulfilment, exceptions, cancellation, insufficient capacity, unauthorized participation) as conditions with one expected business result each: "the candidate has only 40% available against a 60% demand" → "a 40% assignment is created and the demand stays open for 20%". Concrete values, state tables, and API or UI mechanics belong to the use-case realization in Design.

#### Driving-object discovery

`Business Objects Involved` is not a flat noun list. Each object is classified as one or more of:

| Role | Meaning |
|---|---|
| Driving | Carries the business need and anchors the transaction |
| Result | Created or changed to achieve the goal |
| Supporting | Selected, consulted, or validated |
| Impacted | Materially changed as a consequence |

When a trigger, rule, flow step, quantity, or outcome refers to a durable concept with identity,
state, history, independent quantities, or lifecycle, determine whether the entity model is
missing a business object. Examples include demand, request, application, approval, case, order,
claim, reservation, or allocation need. Do not force such concepts into an existing result entity
merely because that entity is convenient to persist.

#### Business-goal test

A use-case goal states the business result, not merely the storage or lifecycle operation.

Weak:

- Create a project assignment.
- Update a client.
- Change the review status.

Stronger:

- Fulfil all or part of an approved project staffing demand.
- Correct the client's current commercial profile.
- Complete and acknowledge the employee's performance review.

Record creation or status change belongs in the transaction result and state-change analysis.

#### Trigger and use-case separation

A use case has one primary triggering business condition. Different triggers that require a
different driving object, starting decision, actor goal, or outcome normally become separate use
cases. Alternate flows vary the same transaction; they do not introduce a later lifecycle goal or
a materially different business transaction.

#### Quantified fulfilment

Where a need is measured, define:

- requested amount and unit;
- fulfilled amount;
- remaining amount;
- whether fulfilment is partial or additive;
- whether several result records may fulfil one need;
- whether one result may fulfil several needs;
- over-fulfilment policy;
- reconciliation after cancellation, reversal, or completion.

This applies to staffing demand, orders, payments, capacity, inventory, budget, claims, quotas,
and similar transactions.

#### Situations become test conditions

Complex or quantified transactions surface their important situations as **test conditions** on
the use case (situation + one expected result) — successful completion, partial fulfilment,
exception handling, cancellation, insufficient capacity, unauthorized participation. These
capture the business meaning in a form testing can prove; concrete before/change/after values and
executable examples are added in the design realization, not here.

For example, *"the candidate has only 40% available against a 60% demand"* becomes a test
condition whose expected result is *"a 40% assignment is created and the demand remains open for
20%"* — a business outcome, stated without API/table mechanics.

### Impact on api-design

Use the analyzed transaction outcomes and actor authority to design operation contracts, preserving business meaning and error outcomes.

### Impact on ui-design

Choose interactions that realize the transaction and expose its required decisions and outcomes; do not invent business policy to suit a layout.
