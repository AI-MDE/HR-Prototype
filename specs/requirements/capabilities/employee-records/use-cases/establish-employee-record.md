---
type: use-case
title: Establish employee record
---

# Establish employee record

## Goal

The new employee has one identifiable record; duplicate creation is avoided.

## Actors

- [HR Administrator](../../../roles/hr-administrator.md) — primary actor.

## Trigger

A new employee is joining and HR needs a record before staffing or reviews.

## Preconditions

The actor acts in the named business responsibility; referenced records must exist before an operation uses them.

## Flow

1. HR supplies the employee number and employment details.
2. System reads employees to detect an existing record.
3. If no record exists, HR confirms the details and the system creates Employee.
4. HR sees the employee ready for reviews and assignments.

## Alternatives / Conditions

An existing employee number returns the existing record without duplicate creation. Invalid employment dates are refused; HR corrects and retries. Cancellation before confirmation makes no change.

## Outcome

The new employee has one identifiable record; duplicate creation is avoided.

## Invoked Entity Operations

- [Employee](../employee/employee.md) — Read, Create

## Behavior

[Behavior diagram](../../../diagrams/use-cases/establish-employee-record.md)
