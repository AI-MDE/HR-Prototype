---
type: feature
kind: build
id: governed-values-from-specs
title: Governed values from specs
origin: mde
impacts:
  - web-ui
  - business-requirements
default: n/a
---

# Governed values from specs

## Purpose

Any categorical/governed value a page shows or seeds — roles, statuses, enums, departments —
uses the vocabularies defined in business specs, not invented alternatives.

## Applicability

Applies to relevant pages and UI interactions. Respect the selected UI architecture/profile; presentation guidance is advisory unless explicitly adopted as a requirement.

## Impact on web-ui

- Every categorical value a page shows or seeds (roles, statuses, enumerations, departments) resolves to a value defined in the requirements; free text, names, and dates may be fictional.

## Impact on business-requirements

Every categorical value (roles, statuses, enumerations, departments) is defined once in the requirements (entity attributes and states, roles, rules) and used from there by design, pages, and sample data; none is invented downstream.

## Audit

- **Governed values:** Does every categorical value used downstream resolve to one defined in the requirements?
