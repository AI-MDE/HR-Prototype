---
type: use-case
title: Correct employee details
---

# Correct employee details

## Goal

The accepted correction is recorded without breaking existing assignments.

## Actors

- [HR Administrator](../../../roles/hr-administrator.md) — primary actor.

## Trigger

HR receives a correction or change to an existing employee's details.

## Preconditions

The actor acts in the named business responsibility; referenced records must exist before an operation uses them.

## Flow

1. HR identifies Employee and reads the current record.
2. HR supplies corrected identity, contact, job or employment information.
3. System validates and updates Employee against its rules and existing commitments.
4. HR sees the corrected record.

## Alternatives / Conditions

No matching employee means no update. Duplicate numbers, invalid dates and changes invalidating assignments are refused. HR corrects the proposal or cancels with the record unchanged.

## Outcome

The accepted correction is recorded without breaking existing assignments.

## Invoked Entity Operations

- [Employee](../employee/employee.md) — Read, Update

## Behavior

[Behavior diagram](../../../diagrams/use-cases/correct-employee-details.md)
