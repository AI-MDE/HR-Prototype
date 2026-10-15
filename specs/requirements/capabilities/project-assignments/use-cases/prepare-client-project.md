---
type: use-case
title: Prepare client project
---

# Prepare client project

## Goal

Client work has an identifiable project and staffing period; no assignment is implied.

## Actors

- [Project Coordinator](../../../roles/project-coordinator.md) — primary actor.

## Trigger

Client work agreed outside the system must become available for staffing.

## Preconditions

The actor acts in the named business responsibility; referenced records must exist before an operation uses them.

## Flow

1. Coordinator reads Clients and selects one; if absent, creates Client.
2. Coordinator reads Projects to check whether this project exists.
3. Coordinator supplies project code, name, scope and planned dates.
4. System validates and creates Project linked to the selected Client.
5. Coordinator sees the project ready for staffing.

## Alternatives / Conditions

An existing project is shown without duplicate creation. Invalid dates or duplicate codes are refused. Cancellation creates no project; a client registered earlier remains available.

## Outcome

Client work has an identifiable project and staffing period; no assignment is implied.

## Invoked Entity Operations

- [Client](../client/client.md) — Read, Create
- [Project](../project/project.md) — Read, Create

## Behavior

[Behavior diagram](../../../diagrams/use-cases/prepare-client-project.md)
