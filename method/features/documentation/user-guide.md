---
type: feature
kind: build
id: user-guide
title: User guide (whole-system, end-user)
origin: mde
impacts:
  - documentation
default: n/a
---

# User guide (whole-system, end-user)

## Purpose

A UI-bearing app ships one consolidated, whole-system manual an end user reads to operate the
application — distinct from the per-use-case walkthroughs, which each trace a single actor path.

## Applicability

Applies to documentation and evidence relevant to the requested scope. Durable application meaning belongs in Specs; execution findings and evidence belong in Work or configured reports.

## Impact on documentation

- User guide screenshots are taken from the running application, preferably captured by the UI test that proves the use case, so they are refreshed whenever it runs.

## Audit

- When there is a user interface, does the user guide explain how to perform every implemented use case, step by step with a screenshot per step, including its result and what can go wrong? A missing use case, a step without a screenshot, or a screenshot that no longer matches the interface fails.
- Does the user guide start with what the application is for, its roles, sign-in, and navigation?
