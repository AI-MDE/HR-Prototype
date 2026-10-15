---
type: feature
kind: optional
id: aggregate-transaction
name: Aggregate Transaction
description: "An operation happens completely or not at all: if any check fails, nothing is changed."
scope: [operation]
appliedIn: [design]
aliases: [transaction.aggregate]
---

# Aggregate Transaction

An operation happens completely or not at all: if any check fails, nothing is changed.

## Meaning

One transaction locks the aggregate and its collaborating rows in a stable order, re-reads what it depends on, checks authorization, lifecycle and rules, writes, and appends history before commit.

## Constraints

- Atomic: every write of the operation commits or none does.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:aggregate-transaction/<promise>`.

- `all-or-nothing` When any check fails, nothing of the operation is stored.
- `consistent-reads` Checks see the rows as they are written, not a stale read.
