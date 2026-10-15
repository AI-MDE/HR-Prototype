---
type: entity
title: Project
---

# Project

## Purpose

A defined body of work for one client; owns its employee assignments.

## Attributes

| Attribute | Type | Required | Description |
|---|---|---|---|
| id | uuid | Yes | Project identity. |
| projectCode | string | Yes | Unique project reference. |
| name | string | Yes | Project name. |
| description | text | Yes | Purpose and scope of client work. |
| startDate | date | Yes | First planned day. |
| endDate | date | Yes | Last planned day, inclusive. |

**Display label:** projectCode name

## Relationships

| Related | Role | Cardinality | Kind | Cascade | Description |
|---|---|---|---|---|---|
| [Client](../client/client.md) | delivers work for | 1 | reference | delete: restrict; update: none | Project delivers work for Client. |
| [ProjectAssignment](project-assignment.md) | has assignments | 0..* | composition | delete: restrict; update: none | Project has assignments ProjectAssignment. |

## Operations

- **Read** — List or view projects and their assignments.
- **Create** — Establish a client project and its planned period.

## Rules

- **Project code uniqueness** — Refuse creation if the project code is already in use.
- **Project interval** — End date must be on or after start date; refuse invalid dates.
- [Assignment commitment](../../../rules/assignment-commitment.md)

## Notes

Deletion is outside this prototype slice.

## Levels

Simple: Project and ProjectAssignment, included because employee assignment is central to this prototype.
