---
type: concept-type
title: API Contract
description: A design contract defining a system operation exposed to consumers.
icon: 🔌
---

# API Contract

An API Contract defines an exposed semantic operation and its interaction contract, for an operation an outside consumer depends on. Its rules and checks are in the [api-design](../../targets/design/api-design.md) Target.

## Location

One file per contract: `specs/design/api/<contract>.md`.

## Structure

- Purpose
- Consumers
- Endpoint / operation
- Request
- Response
- Validation
- Errors
- Authorization
- Related Use Cases / Entity Operations
