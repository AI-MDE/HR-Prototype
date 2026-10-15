---
type: feature
kind: build
id: guided-workflows
title: Guided workflows
origin: mde
impacts:
  - web-ui
default: on
---

# Guided workflows

## Purpose

End-user task flows that step a user through the **existing live pages** in a defined order,
with instructions and progress — they do **not** duplicate the app's screens. The unit is the
**capability workflow**: a capability's `workflow.md` ordered stages are the tour; each stage
maps to a use case → its live route.

## Applicability

Applies to a preview or prototype requested for the scope. Use connected sample data from the selected source: the MDE runtime by default for a prototype (the [Prototyping Strategy](../../strategy/prototype.md)), the application's own backend otherwise; any other substitute requires an explicit project decision.

## Impact on web-ui

- When the UI renders a workflow (a guide, rail, wizard, or stepper), it has one step per stage of the capability's workflow, in order and with matching labels; a stage with no page yet is reported as a gap, never dropped, merged, or renamed.

- **Guided workflows**: for each capability whose workflow defines stages, a guided tour stepping the user through the existing live pages in order, with instructions and progress, deriving from the workflow and its use cases and routing into the live pages, never re-implementing them. Built from a workflow catalog, with a `/workflows` library and an active-step rail on the live pages.

## Audit

- Do guided workflows, behind the development flag, follow the workflow's stages in order and route into the live pages, with missing stages reported as gaps?
