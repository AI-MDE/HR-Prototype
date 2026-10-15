---
type: concept-type
title: Integration
description: A design concept defining interaction with an external system.
icon: 🔗
---

# Integration

An Integration defines interaction with an external system. Its rules and checks are in the [integration](../../targets/app/integration.md) Target.

## Location

One file per external system: `specs/design/integrations/<integration>.md`.

## Structure

- Purpose
- External system
- Direction and protocol
- Data exchanged
- Trigger / timing
- Failure behavior
- Security / credentials
- Observability
