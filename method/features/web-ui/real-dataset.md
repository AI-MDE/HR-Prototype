---
type: feature
kind: build
id: real-dataset
title: Connected data presentation
origin: mde
impacts:
  - web-ui
default: n/a
---

# Connected data presentation

## Purpose

Render the scoped actual dataset and operation results rather than decorative placeholders.

## Applicability

Applies to relevant pages and UI interactions. Respect the selected UI architecture/profile; presentation guidance is advisory unless explicitly adopted as a requirement.

## Impact on web-ui

- Pages read records through the selected data source and render the actual dataset with meaningful labels and relationships; a substitute data source is used only by explicit choice, with its limits visible, and never proves the real backend works.

## Audit

- Do pages render the actual dataset through the selected data source, with any substitute explicit and its limits visible?
