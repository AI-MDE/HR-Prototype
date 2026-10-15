---
type: business-rule
title: Assignment commitment
---

# Assignment commitment

## Statement

An assignment commits one employee to one project during an inclusive date interval within both the employment interval and project interval. For every calendar day, the sum of that employee's allocation percentages across all projects must not exceed 100%. Every recorded assignment contributes during its dates; this slice has no cancellation state.

## Applies To

[Employee](../capabilities/employee-records/employee/employee.md), [Project](../capabilities/project-assignments/project/project.md), and [ProjectAssignment](../capabilities/project-assignments/project/project-assignment.md).

## Constraint / Result

End must not precede start; allocation must be greater than zero and at most 100. Refuse assignment creation if any condition is violated. Employee updates must not invalidate existing assignments. An absent employment end is unbounded. This is a direct commitment, not fulfilment of staffing demand or proof that a project is fully staffed.

## Exceptions

No override in this slice.

## Scenarios

- Concurrent 40% and 60% assignments on valid dates are accepted.
- Adding 1% on a day already allocated 100% is refused.
- Two 60% assignments sharing only their boundary day are refused: dates are inclusive.
- Assignment outside employment or project dates is refused.
- Shortening employment so an assignment falls outside it is refused.
- Zero allocation and an end before start are refused; 100% on one valid day is accepted.
