---
type: use-case
title: Assign employee to project
---

# Assign employee to project

## Goal

The specified commitment exists, or no new commitment exists after refusal or cancellation; project staffing completeness is not asserted.

## Actors

- [Project Coordinator](../../../roles/project-coordinator.md) — primary actor.

## Trigger

A coordinator decides to commit a named employee to a project responsibility and period.

## Preconditions

The actor acts in the named business responsibility; referenced records must exist before an operation uses them.

## Flow

1. Coordinator selects Project and reads scope and dates.
2. Coordinator selects Employee and reads employment dates and existing ProjectAssignments.
3. Coordinator supplies responsibility, assignment dates and allocation percentage.
4. System validates the commitment and creates ProjectAssignment if all constraints hold.
5. Coordinator sees the employee commitment against the project.

## Alternatives / Conditions

Missing employee or project prevents assignment. Invalid dates or insufficient capacity are refused with no assignment; the coordinator may revise the proposal or cancel. Partial allocation is never automatic.

## Outcome

The specified commitment exists, or no new commitment exists after refusal or cancellation; project staffing completeness is not asserted.

## Invoked Entity Operations

- [Project](../project/project.md) — Read
- [Employee](../../employee-records/employee/employee.md) — Read
- [ProjectAssignment](../project/project-assignment.md) — Read, Create

## Behavior

[Behavior diagram](../../../diagrams/use-cases/assign-employee-to-project.md)
