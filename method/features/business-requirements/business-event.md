---
type: feature
kind: build
id: business-requirements-business-event
title: Business Event
origin: mde
impacts:
  - business-requirements
---

# Business Event

## Purpose

The "Business Event" rules of the business-requirements Target that no other Feature supplies.

## Impact on business-requirements

A state change may produce a business event; it is not an event by itself. Select events deliberately: an occurrence qualifies only when it hands work to another actor or transaction, creates an obligation or authorization, materially affects another entity, must reach an external party, carries contractual, regulatory, or reporting weight, marks a business milestone, or flags an exception needing separate handling. Do not derive events mechanically from entity transitions, saves, or endpoint calls. Recording events at runtime is an architecture concern ([Business Event Recording](../../architecture/business-events.md)).

## Audit

- **Business Event:** Does each event meet one of the selection criteria, rather than mirroring a state change?
