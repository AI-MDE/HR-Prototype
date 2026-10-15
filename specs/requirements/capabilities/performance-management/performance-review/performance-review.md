---
type: entity
title: PerformanceReview
---

# PerformanceReview

## Purpose

A recorded assessment of one employee over a period, with strengths and development actions.

## Attributes

| Attribute | Type | Required | Description |
|---|---|---|---|
| id | uuid | Yes | Review identity. |
| periodStart | date | Yes | First day assessed. |
| periodEnd | date | Yes | Last day assessed, inclusive. |
| reviewDate | date | Yes | Date of the completed discussion. |
| summary | text | Yes | Narrative assessment. |
| strengths | text | Yes | Observed strengths and examples. |
| developmentActions | text | Yes | Narrative follow-up actions. |

**Display label:** periodStart periodEnd

## Relationships

| Related | Role | Cardinality | Kind | Cascade | Description |
|---|---|---|---|---|---|
| [Employee](../../employee-records/employee/employee.md) | assesses | 1 | reference | delete: restrict; update: none | PerformanceReview assesses Employee. |
| [Employee](../../employee-records/employee/employee.md) | reviewed by | 1 | reference | delete: restrict; update: none | PerformanceReview reviewed by Employee. |

## Operations

- **Read** — List or view reviews.
- **Create** — Record a completed performance discussion for an employee, identifying its reviewer.

## Rules

- **Review interval** — Period end must be on or after period start, and review date on or after period end. Refuse invalid dates.

## Notes

Deletion is outside this prototype slice. Review correction and approval lifecycles are outside this slice.

## Levels

Simple: PerformanceReview. No supporting entities at this level.
