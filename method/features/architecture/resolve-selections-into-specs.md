---
type: feature
kind: build
id: architecture-resolve-selections-into-specs
title: Resolve selections into Specs
origin: mde
impacts:
  - architecture
---

# Resolve selections into Specs

## Purpose

The "Resolve selections into Specs" rules of the architecture Target that no other Feature supplies.

## Impact on architecture

A preset name records a selection, not a complete architecture. During architecture work, read the selected architecture (`architecture/overview.md` and its relevant topic documents) and the selected stack preset, through the manifest's Method path. Record in the application's Specs the applicable layers, dependency direction, constraints, concrete technology choices, the Targets in scope, and intentional exceptions, with enough meaning to design, build, and verify the affected scope without reopening the preset. Recording a default does not imply the user confirmed it; the Strategy decides when confirmation is needed.

- Entries `mde init` writes, such as `Selected architecture: mdex-application` and `Selected stack: nest-carbon`, are inputs to this resolution. Expand them before treating the decisions as resolved. For a small scope, extend the existing overview; do not create documents just to record a selection.
- Record the adopted meaning once, in its owning topic, adapted to the application rather than copying the catalog. A source reference says where a decision came from; it does not import unstated rules. Approval, alternatives, and open questions stay in Work.
- During ordinary work, use the resolved Specs. Later changes to the Method's architecture or stacks do not change the application's decisions; consult them again only to resolve a missing decision or a requested change.
- Language, runtime, frameworks, database products, UI frameworks, build tools, hosting, and protocols are application decisions, recorded with the architecture or in a technology topic. `mde.json` only locates areas; it never holds these decisions.

## Verify

- `overview-resolved` Does the overview name a stack of the Method and Targets the Method has, with no placeholder (TBD, TODO, "not yet decided") left in the architecture (`mde verify`, Architecture overview row)?

## Audit

- Are the selections from `mde init` resolved into decisions, and are the Targets in scope recorded?
- Does the architecture diagram show the components and dependencies the specifications decide, and agree with them?
