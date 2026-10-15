---
type: entity
title: Employee
---

# Employee

## Purpose

A person employed by the organization; the primary entity of employee records.

## Attributes

| Attribute | Type | Required | Description |
|---|---|---|---|
| id | uuid | Yes | Record identity. |
| employeeNumber | string | Yes | Unique identifier assigned by HR. |
| fullName | string | Yes | Name used at work. |
| email | string | Yes | Work contact address. |
| jobTitle | string | Yes | Current job title, as free text. |
| startDate | date | Yes | First day of employment. |
| endDate | date | No | Last day of employment, inclusive; absent while ongoing. |

**Display label:** employeeNumber fullName

## Relationships

| Related | Role | Cardinality | Kind | Cascade | Description |
|---|---|---|---|---|---|
| [PerformanceReview](../../performance-management/performance-review/performance-review.md) | is assessed in | 0..* | association | delete: restrict; update: none | Employee is assessed in PerformanceReview. |
| [ProjectAssignment](../../project-assignments/project/project-assignment.md) | participates through | 0..* | association | delete: restrict; update: none | Employee participates through ProjectAssignment. |

## Operations

- **Read** — List or view employees.
- **Create** — Establish a new employee record from HR-supplied employment information.
- **Update** — Correct identity or employment information, preserving existing commitments.

## Rules

- **Employee number uniqueness** — Refuse Create or Update when another employee already has the supplied employee number.
- **Employment interval** — End date, when present, must not precede start date; refuse a change violating this rule.
- [Assignment commitment](../../../rules/assignment-commitment.md)

## Notes

Deletion is outside this prototype slice.

## Levels

Simple: Employee. No supporting entities at this level.
