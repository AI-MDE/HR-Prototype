---
type: feature
kind: build
id: stable-selectors
title: Stable selectors
origin: mde
impacts:
  - web-ui
default: n/a
---

# Stable selectors

## Purpose

Important elements carry stable selectors or accessible labels — enabling both E2E test
targeting and annotation targeting.

## Applicability

Applies to relevant pages and UI interactions. Respect the selected UI architecture/profile; presentation guidance is advisory unless explicitly adopted as a requirement.

## Impact on web-ui

- Important elements carry stable selectors or accessible labels (`id` or `data-testid` first), which UI tests and annotations both rely on.
- Each section of a page (a panel, a card, a tab, a wizard step, a list) is a named region: a `section` or `role="region"` whose accessible name is its visible heading (`aria-labelledby`) or an `aria-label`, so a test finds it by the name a person sees ("the Contacts section"), never by a CSS path or its position among `div`s.
- In a section showing many records (a table, a list, cards), each row is identified by its record's data: its accessible name carries the record's display label, a table has column headings, and each row's controls are named for what they do ("Remove", not an icon alone), so a test finds "the Contacts row for Dana Reyes" and presses "Remove" in it, never "the third row".

## Audit

- Do important elements carry stable selectors or accessible labels?
- Is every section of a page a named region, with the accessible name a person sees?
- In a section showing many records, is each row identified by its record's display label, under column headings, with named controls?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on testing

E2E/UI tests drive the running UI through these selectors; without them, scenarios are brittle.
