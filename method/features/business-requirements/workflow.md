---
type: feature
kind: build
id: business-requirements-workflow
title: Workflow
origin: mde
impacts:
  - business-requirements
---

# Workflow

## Purpose

The "Workflow" rules of the business-requirements Target that no other Feature supplies.

## Impact on business-requirements

Create a workflow only when a meaningful process spans several use cases, actors, or states over time.

- A workflow belongs to the capability whose goal it serves, in that capability's `workflows/` folder, and the capability's overview links it.
- Its Steps are a table, `Step | Role | Does | Reaches`, one row per step in order: the role links its Role, Does links the use case (or the entity operation, when no more is involved) the step runs, and Reaches is the state it leaves the main record in. The Workbench draws the workflow from this table; it is also what a later BPMN realization is generated from. Decisions and other paths stay prose.
- A workflow describes; it does not execute.

## Audit

- **Workflow:** Is it in its capability's `workflows/` folder and linked from the overview? Is every step a row of the Steps table, with a role and what it does linked to specs that exist? Do consecutive steps' states follow the main record's lifecycle?
