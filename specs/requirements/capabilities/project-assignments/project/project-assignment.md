---
type: entity
title: ProjectAssignment
---

# ProjectAssignment

## Purpose

One employee's responsibility and capacity commitment to one project for a period.

## Attributes

| Attribute | Type | Required | Description |
|---|---|---|---|
| id | uuid | Yes | Assignment identity. |
| responsibility | string | Yes | Work assigned to the employee. |
| startDate | date | Yes | First assigned day. |
| endDate | date | Yes | Last assigned day, inclusive. |
| allocationPercent | decimal | Yes | Share of nominal working capacity, greater than zero and at most 100. |

**Display label:** responsibility startDate

## Relationships

| Related | Role | Cardinality | Kind | Cascade | Description |
|---|---|---|---|---|---|
| [Project](project.md) | belongs to | 1 | reference | delete: restrict; update: none | ProjectAssignment belongs to Project. |
| [Employee](../../employee-records/employee/employee.md) | assigns | 1 | reference | delete: restrict; update: none | ProjectAssignment assigns Employee. |

## Operations

- **Read** — List or view assignments.
- **Create** — Commit one employee to a project for the stated period and allocation.

## Rules


- [Assignment commitment](../../../rules/assignment-commitment.md)

## Notes

Deletion is outside this prototype slice.
