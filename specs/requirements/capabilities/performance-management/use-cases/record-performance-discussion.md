---
type: use-case
title: Record performance discussion
---

# Record performance discussion

## Goal

The discussion is recorded against the correct employee with narrative follow-up; no approval or acknowledgement is implied.

## Actors

- [People Manager](../../../roles/people-manager.md) — primary actor.

## Trigger

A manager has completed a performance discussion for an employee and an assessment period.

## Preconditions

The actor acts in the named business responsibility; referenced records must exist before an operation uses them.

## Flow

1. Manager identifies the assessed Employee and the reviewing Employee.
2. Manager reads previous PerformanceReview records for context.
3. Manager enters discussion date, assessment period, summary, strengths and development actions.
4. System validates and creates PerformanceReview linked to employee and reviewer.
5. Manager sees the recorded discussion and follow-up actions.

## Alternatives / Conditions

Missing employee or reviewer prevents recording. Invalid dates are refused for correction. Cancellation before confirmation creates no review.

## Outcome

The discussion is recorded against the correct employee with narrative follow-up; no approval or acknowledgement is implied.

## Invoked Entity Operations

- [Employee](../../employee-records/employee/employee.md) — Read
- [PerformanceReview](../performance-review/performance-review.md) — Read, Create

## Behavior

[Behavior diagram](../../../diagrams/use-cases/record-performance-discussion.md)
