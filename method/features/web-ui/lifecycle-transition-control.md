---
type: feature
kind: build
id: lifecycle-transition-control
title: State Transition subpanel (governed lifecycle change)
origin: mde
impacts:
  - web-ui
default: n/a
---

# State Transition subpanel (governed lifecycle change)

## Purpose

Present lifecycle decisions deliberately and safely without prescribing one universal control
shape. A state change belongs to a panel-owned action and exact target. It exposes the current
state, valid new state or decision, impact, rules, and confirmation before committing.

A lifecycle outcome may be committed with a record Save when state is one editable part of a
larger change. It may instead be a named terminal action such as Submit, Approve, Reject, Cancel,
Acknowledge, or Reopen when that action completes a scoped business review or decision. The Page
Spec declares which model applies; the method does not force every transition through a generic
Save.

## Applicability

Applies to relevant pages and UI interactions. Respect the selected UI architecture/profile; presentation guidance is advisory unless explicitly adopted as a requirement.

## What counts as a lifecycle transition

An entity operation whose `kind` is `lifecycle`, with valid transitions, guards, consequences,
roles, and scope defined by the entity lifecycle and operation specifications. Use-case operations
that do not transition lifecycle remain ordinary `Operate` actions.

## Impact on web-ui

A lifecycle change (an operation of kind `lifecycle`) appears through a `StateTransition` subpanel owned by the action that proposes or commits it, showing the current state, only the valid reachable new states or decisions, the impact, and the rules (guards, permissions, validation, blocking conditions), drawn from the entity's lifecycle and operations.

- **Edit with state**: when state is one field of a broader record edit, the panel's Save commits it with the other edits.
- **Terminal decision**: Submit, Approve, Reject, Cancel, Acknowledge, Reopen, and similar decisions may commit as a named action after the required review or confirmation, ending only their panel context.

The UI conventions say which model applies (or, for one page, its line in the page set); never both. Abandoning the context discards the proposed change. Use-case operations that are not lifecycle changes stay ordinary `Operate` actions.

## Audit

- Does every lifecycle change go through a `StateTransition` subpanel showing current state, valid outcomes, impact, and rules, committed by the one declared model?
