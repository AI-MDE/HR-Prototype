---
type: feature
kind: build
id: architecture-diagrams
title: Diagrams
origin: mde
impacts:
  - architecture
---

# Diagrams

## Purpose

The "Diagrams" rules of the architecture Target that no other Feature supplies.

## Impact on architecture

- Create the architecture diagram with the first specification that introduces a component or layer, and the interaction diagram with it: how the layers communicate on the main request path, and in each key scenario that crosses another boundary (an integration, an event). Create the other diagrams the work relies on (use-case, logical and physical data model, state-transition, navigation) with the first specifications they depict. Update each whenever a change alters what it shows.
- **These two are required, in every Strategy,** with the architecture's overview: the [architecture diagram](../../metamodel/architecture/architecture-diagram.md) (`specs/architecture/diagrams/architecture.md`) and the [interaction diagram](../../metamodel/architecture/interaction-diagram.md) (`specs/architecture/diagrams/interactions.md`). `mde verify` counts them with the other required diagrams, and a missing one keeps the Evidence from passing.
- Each diagram lives with the section whose knowledge it shows, in that section's `diagrams/` folder ([Diagram](../../metamodel/diagram.md)): requirements, architecture, or design.
- When a diagram disagrees with the specifications or the code, resolve it in the owning concept rather than only editing the diagram.

## Verify

- `architecture-interaction-diagrams` Are the architecture and interaction diagrams delivered with the architecture, in `specs/architecture/diagrams/` (`mde verify`, Architecture diagrams row)?

## Audit

- Does the architecture diagram show every layer and component the architecture decides, and only those?
- Does the interaction diagram show every layer of the architecture diagram, communicating as the architecture decides (the calls, requests, events, and order), including the paths that change the outcome? Whether the code does the same is judged on the server and the web UI ([conformance](conformance.md)).
- Does each diagram live in the `diagrams/` folder of the section it depicts, and agree with the Specs it shows?
