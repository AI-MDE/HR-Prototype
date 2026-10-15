---
type: entity
title: Client
---

# Client

## Purpose

The organization receiving work through one or more projects.

## Attributes

| Attribute | Type | Required | Description |
|---|---|---|---|
| id | uuid | Yes | Client identity. |
| clientCode | string | Yes | Unique business reference. |
| name | string | Yes | Client organization name. |

**Display label:** clientCode name

## Relationships

| Related | Role | Cardinality | Kind | Cascade | Description |
|---|---|---|---|---|---|
| [Project](../project/project.md) | receives work through | 0..* | association | delete: restrict; update: none | Client receives work through Project. |

## Operations

- **Read** — List or view clients.
- **Create** — Register a client when preparing its first project.

## Rules

- **Client code uniqueness** — Refuse creation if the client code is already in use; select the existing client instead.

## Notes

Deletion is outside this prototype slice.

## Levels

Simple: Client. No supporting entities at this level.
