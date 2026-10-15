---
type: feature
kind: build
id: ui-states
title: UI states (empty/loading/error/success)
origin: mde
impacts:
  - web-ui
default: n/a
---

# UI states (empty/loading/error/success)

## Purpose

Pages represent the states a real user hits — not just the happy populated view.

## Applicability

Applies to relevant pages and UI interactions. Respect the selected UI architecture/profile; presentation guidance is advisory unless explicitly adopted as a requirement.

## Impact on web-ui

- Empty, loading, error, success, and access-denied states are represented where relevant, each reachable and rendered.

## Audit

- Are empty, loading, error, success, and access-denied states represented where relevant?
