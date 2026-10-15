---
type: feature
kind: build
id: constraints-and-keys
title: Constraints and keys
origin: mde
impacts:
  - persistence
default: n/a
---

# Constraints and keys

## Purpose

Foreign keys, constraints, and audit/history fields are deliberate and aligned with design —
not accidental.

## Applicability

Applies to persisted concepts and selected persistence concerns in scope. Object-specific selections belong to their owning concepts; Design chooses the realization within Architecture.

## Impact on persistence

- The schema follows the confirmed entity model and each entity's Storage View. Foreign keys and constraints are deliberate and aligned with the design; behavior specific to the database technology is documented when used.

## Audit

- Are keys and constraints deliberate and aligned with the design, with technology-specific behavior documented?
