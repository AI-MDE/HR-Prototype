---
type: feature
kind: build
id: row-selection-affordance
title: Row selection affordance (advisory)
origin: mde
impacts:
  - web-ui
default: on
---

# Row selection affordance (advisory)

## Purpose

Soft guidance on how a list row is selected. This is **advice, not a rule** — its review questions are advisory,
and do not independently block acceptance. It exists to nudge generation away from redundant controls.

## Applicability

Applies to relevant pages and UI interactions. Respect the selected UI architecture/profile; presentation guidance is advisory unless explicitly adopted as a requirement.

## Impact on web-ui

- Advice, not a rule: where clicking a row selects it, with a visible hover and selected state, a per-row Select button is redundant chrome; add one only when selecting and opening are genuinely different, and keep the distinction keyboard-accessible.

## Audit

- Where a row click selects, is a per-row Select button present only when selecting and opening genuinely differ?
